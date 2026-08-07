#!/bin/bash
#
# Deploy a Storybook preview to Vercel for pull request builds.
# Replaces the Vercel GitHub integration, which deployed a preview on every push.

set -euo pipefail

.buildkite/scripts/install-deps.sh --node --tools

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
