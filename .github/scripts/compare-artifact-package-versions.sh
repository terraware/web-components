#!/bin/bash

set -euo pipefail

echo "Artifact Registry Provider = $ARTIFACT_REGISTRY_PROVIDER"

# TODO: add support for AWS Code artifact
if [[ $ARTIFACT_REGISTRY_PROVIDER == 'npm' ]]; then

  echo "Checking version in git package.json"
  PACKAGE_JSON_VERSION=`node -e "process.stdout.write(require(__dirname + '../../dist/package.json').version)"`
  echo "Got package json version $PACKAGE_JSON_VERSION"

  echo "Checking if version exists in npm repository"
  npm show @terraware/web-components versions --json | grep ${PACKAGE_JSON_VERSION} > /tmp/npm-output
  cat /tmp/npm-output

  if [ -s /tmp/npm-output ]; then
    echo "Package is up to date"
  else
    echo "Package needs update"
    echo "UPDATE_NPM_PACKAGE=true" >> $GITHUB_ENV
  fi

else

  echo "Nothing to do"

fi
