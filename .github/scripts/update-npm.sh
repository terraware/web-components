#!/bin/bash

set -euo pipefail

echo "Artifact Registry Provider = $ARTIFACT_REGISTRY_PROVIDER"

# TODO: add support for AWS Code artifact
if [ $ARTIFACT_REGISTRY_PROVIDER == 'npm' ]; then
  cp .npmrc.github .npmrc
  echo "Checking npm registry \"$ARTIFACT_REGISTRY\" for current version"
  NPM_PACKAGE_VERSION=`npm show @terraware/web-components version`
  echo "Got npm package version $NPM_PACKAGE_VERSION"
  echo "Checking version in git package.json"
  PACKAGE_JSON_VERSION=`node -e "process.stdout.write(require(__dirname + '../../dist/package.json').version)"`
  echo "Got package json version $PACKAGE_JSON_VERSION"
  if [ $PACKAGE_JSON_VERSION == $NPM_PACKAGE_VERSION ]; then
    echo "Package is up to date"
  else
    echo "Updating package in npm"
    cd dist && echo `pwd` && npm publish --userconfig=../.npmrc
    echo "Done updating package in npm"
  fi
else
  echo "Nothing to do"
  exit
fi
