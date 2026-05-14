#!/usr/bin/env bash
set -euo pipefail

.buildkite/scripts/install-deps.sh --node --tools

echo "--- :yarn: Install dependencies"
yarn install --frozen-lockfile --prefer-offline --network-timeout 100000
git checkout -- package.json

echo "--- :prettier: Check formatting"
yarn prettier --check .

echo "--- :eslint: Run linter"
yarn lint

echo "--- :jest: Run unit tests"
yarn test

echo "--- :package: Build dist"
yarn build-dist

echo "--- :scroll: License report"
yarn license-report-dist

echo "--- :package: Prune package.json"
cd dist
npm pkg delete scripts
npm pkg delete devDependencies
npm pkg delete eslintConfig
npm pkg delete resolutions
npm pkg delete browserslist
cat package.json
