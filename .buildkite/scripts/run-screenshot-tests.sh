#!/usr/bin/env bash
set -euo pipefail
.buildkite/scripts/install-deps.sh --node
echo '--- :yarn: Install dependencies and build Storybook'
yarn install --frozen-lockfile --prefer-offline
yarn build
echo '--- :camera_with_flash: Compare Storybook screenshots'
status=0
yarn screenshots:docker || status=$?
.buildkite/scripts/upload-playwright-results.sh
if [[ $status -ne 0 && -f playwright/results.json ]]; then
  annotation=$(node .buildkite/scripts/screenshot-failures-annotation.mjs playwright/results.json)
  if [[ -n "$annotation" ]]; then
    buildkite-agent annotate --style error --context screenshot-failures <<< "$annotation"
  fi
fi
exit "$status"
