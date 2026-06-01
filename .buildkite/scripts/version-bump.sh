#!/usr/bin/env bash
#
# After a PR is merged to main, look up its version label (major/minor/patch),
# bump package.json accordingly, and push the tagged commit back to main.
# Replaces auto-version.yml from GHA. The pushed commit triggers a new
# Buildkite build that publishes the bumped version to npm.
#

set -euo pipefail

.buildkite/scripts/install-deps.sh --node --tools

if [[ -z "${MERGED_PR_NUMBER:-}" ]]; then
    echo "No merged PR detected; skipping version bump."
    exit 0
fi

REPO_SLUG="terraware/web-components"

echo "--- :github: Fetch labels for PR #${MERGED_PR_NUMBER}"
LABELS=$(curl -fsS \
    -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/${REPO_SLUG}/issues/${MERGED_PR_NUMBER}/labels" \
    | jq -r '.[].name')

echo "Labels: $LABELS"

if   echo "$LABELS" | grep -qx 'major'; then BUMP=major
elif echo "$LABELS" | grep -qx 'minor'; then BUMP=minor
elif echo "$LABELS" | grep -qx 'patch'; then BUMP=patch
else
    echo "No major/minor/patch label found; skipping bump."
    exit 0
fi

echo "--- :github: Fetch PR title"
PR_TITLE=$(curl -fsS \
    -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/${REPO_SLUG}/pulls/${MERGED_PR_NUMBER}" \
    | jq -r '.title')

git config user.email "${GH_DEPLOY_EMAIL}"
git config user.name  "${GH_DEPLOY_USER}"

echo "--- :git: Deepen clone and sync to origin/main"
git fetch --tags --depth=50 origin main
git checkout main
git reset --hard origin/main

echo "--- :npm: Bump $BUMP version"
npm version "$BUMP" -m "%s - $PR_TITLE"

echo "--- :git: Push bump and tag"
REPO_URL=${BUILDKITE_REPO/github.com/${GH_DEPLOY_USER}:${GH_DEPLOY_REPO_TOKEN}@github.com}
git push "$REPO_URL" main --follow-tags
