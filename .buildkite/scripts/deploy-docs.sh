#!/usr/bin/env bash
#
# Build the docs (license report + coverage) and deploy them to the gh-pages branch.
# Replaces docs.yml from GHA.
#

set -euo pipefail

.buildkite/scripts/install-deps.sh --node --tools

echo "--- :yarn: Install dependencies"
yarn install --frozen-lockfile --prefer-offline --network-timeout 100000

echo "--- :scroll: License report"
yarn license-report

echo "--- :jest: Run unit tests with coverage"
yarn test-coverage

# Allow generated docs to be committed to gh-pages branch
rm -f docs/.gitignore

echo "--- :github: Prepare files for deployment"

DEPLOY_DIR="docs"
DEPLOY_BRANCH="gh-pages"
DEPLOY_USER="${GH_DEPLOY_USER}"

REPO_URL=${BUILDKITE_REPO/github.com/$DEPLOY_USER:$GITHUB_TOKEN@github.com}

TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

git clone --branch "$DEPLOY_BRANCH" --single-branch --depth 1 \
    "$REPO_URL" \
    "$TEMP_DIR" || {
        git init "$TEMP_DIR"
        cd "$TEMP_DIR"
        git checkout --orphan "$DEPLOY_BRANCH"
        git remote add origin "$REPO_URL"
        cd -
    }

rsync -a --exclude=.git --delete "$DEPLOY_DIR/" "$TEMP_DIR/"

cd "$TEMP_DIR"
git add -A

if git diff --cached --quiet; then
    echo "No docs changes to deploy."
    exit 0
fi

echo "--- :github: Deploy to GitHub Pages"

git config user.name  "$DEPLOY_USER"
git config user.email "${GH_DEPLOY_EMAIL}"
git commit -m "Deploy docs from ${BUILDKITE_COMMIT:0:12}"
git push origin "$DEPLOY_BRANCH"

echo "Docs deployed to GitHub Pages."
