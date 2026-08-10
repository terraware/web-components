#!/bin/bash
#
# Deploy a Storybook preview to Vercel for pull request builds.
# Replaces the Vercel GitHub integration, which deployed a preview on every push.

set -euo pipefail

# jq is needed for the label check below. Node is only needed if we actually deploy,
# so it's installed after the check rather than before it.
.buildkite/scripts/install-deps.sh --tools

echo "--- :github: Check for the \"Vercel preview\" label"

# Previews are opt-in. Look the pull request up by branch instead of reading
# BUILDKITE_PULL_REQUEST: branch builds and builds started from the Buildkite UI carry
# no pull request metadata at all, and the labels Buildkite does expose are a snapshot
# taken when the build was created, so a label added afterwards wouldn't be seen.
pr_json=$(curl -sf \
    -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/terraware/web-components/pulls?head=terraware:${BUILDKITE_BRANCH}&state=open")

pr_number=$(jq -r '.[0].number // empty' <<< "$pr_json")

if [ -z "$pr_number" ]; then
    echo "No open pull request for ${BUILDKITE_BRANCH}; skipping the Vercel preview."
    exit 0
fi

if ! jq -e '.[0].labels | any(.name == "Vercel preview")' <<< "$pr_json" > /dev/null; then
    echo "PR #${pr_number} isn't labeled \"Vercel preview\"; skipping the Vercel preview."
    echo "Add the label and re-run this step to get a preview."
    exit 0
fi

echo "PR #${pr_number} is labeled \"Vercel preview\"."

.buildkite/scripts/install-deps.sh --node

echo "--- :vercel: Configure Vercel project"
mkdir -p .vercel
echo "{\"projectId\":\"${VERCEL_PROJECT_ID}\",\"orgId\":\"${VERCEL_ORG_ID}\"}" > .vercel/project.json

echo "--- :vercel: Pull Vercel project settings"
npx vercel pull --yes --environment=preview --token="$VERCEL_TOKEN"

# The build and install commands come from the project settings pulled above, so
# this runs the same Storybook build the GitHub integration used to run.
echo "--- :vercel: Build project"
npx vercel build --token="$VERCEL_TOKEN"

echo "--- :vercel: Deploy to Vercel"
preview_url=$(npx vercel deploy --prebuilt --archive=tgz --token="$VERCEL_TOKEN" --meta githubCommitRef="$BUILDKITE_BRANCH")

echo "Preview deployed to: ${preview_url}"

echo "--- :vercel: Alias deployment to branch URL"
branch_slug=$(echo "$BUILDKITE_BRANCH" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g')

# DNS labels are limited to 63 characters. The "web-components-" prefix is
# 15 characters, leaving 48 for the slug. For longer branch names, truncate
# and append a hash of the original branch so the alias stays unique.
max_slug_length=48
if [ ${#branch_slug} -gt $max_slug_length ]; then
  hash=$(echo -n "$BUILDKITE_BRANCH" | shasum | cut -c1-8)
  truncated="${branch_slug:0:$((max_slug_length - ${#hash} - 1))}"
  truncated="${truncated%-}"
  branch_slug="${truncated}-${hash}"
fi

branch_url="web-components-${branch_slug}.vercel.app"
npx vercel alias set "$preview_url" "$branch_url" --token="$VERCEL_TOKEN" --scope="$VERCEL_ORG_ID"

echo "Branch URL: https://${branch_url}"

echo "--- :github: Post preview URL as build annotation"
buildkite-agent annotate \
    --style info \
    --context vercel-preview \
    "Vercel preview: [https://${branch_url}](https://${branch_url})"
