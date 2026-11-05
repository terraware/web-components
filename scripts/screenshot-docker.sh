#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
version=$(node -p "require('./node_modules/@playwright/test/package.json').version")
docker run --rm --ipc=host --init --user "$(id -u):$(id -g)" \
  -v "$PWD:/work" -w /work -e CI=true \
  "mcr.microsoft.com/playwright:v${version}-jammy" \
  node_modules/.bin/playwright test "$@"
