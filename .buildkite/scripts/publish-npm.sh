#!/usr/bin/env bash
#
# Publish the built dist/ to npm if its version isn't already published.
# Replaces the publish-related steps in the old develop.yml GHA workflow.
#

set -euo pipefail

.buildkite/scripts/install-deps.sh --node --tools

if [[ "${ARTIFACT_REGISTRY_PROVIDER:-}" != "npm" ]]; then
    echo "ARTIFACT_REGISTRY_PROVIDER is not 'npm'; nothing to publish."
    exit 0
fi

echo "--- :npm: Compare artifact package version"
PACKAGE_JSON_VERSION=$(node -e "process.stdout.write(require('./dist/package.json').version)")
echo "Local dist version: $PACKAGE_JSON_VERSION"

NOT_FOUND=false
npm show @terraware/web-components@"${PACKAGE_JSON_VERSION}" maintainer > /dev/null 2>&1 || NOT_FOUND=true

if [[ $NOT_FOUND == false ]]; then
    echo "Package $PACKAGE_JSON_VERSION already published; nothing to do."
    exit 0
fi

echo "--- :npm: Publish @terraware/web-components@${PACKAGE_JSON_VERSION}"
echo "//registry.npmjs.org/:_authToken=${NPM_REGISTRY_AUTH_TOKEN}" > ~/.npmrc

cd dist
npm publish --scope @terraware
