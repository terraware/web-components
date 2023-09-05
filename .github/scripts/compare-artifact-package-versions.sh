#!/bin/bash

set -euo pipefail

echo "Artifact Registry Provider = $ARTIFACT_REGISTRY_PROVIDER"

# TODO: add support for AWS Code artifact
if [[ $ARTIFACT_REGISTRY_PROVIDER == 'npm' ]]; then

  echo "Checking local version in git package.json"
  PACKAGE_JSON_VERSION=`node -e "process.stdout.write(require(__dirname + '../../dist/package.json').version)"`
  echo "Got package json version $PACKAGE_JSON_VERSION"

  NOT_FOUND=false
  echo "Checking if version exists in npm repository"
  npm show @terraware/web-components@${PACKAGE_JSON_VERSION} maintainer > /dev/null 2>&1 || NOT_FOUND=true

  # check status code of command to see if it succeeded
  # if version exists, npm returns with status code 0 (standard status code semantics of 0=success, non-0=error)
  # if version doesn't exist, npm returns a 404 not found and exits with status code 1
  # for false errors (such as when npm is down) the build will break anyways

  if [[ $NOT_FOUND == false ]]; then
    echo "Package is up to date"
  else
    echo "Package needs update"
    echo "UPDATE_NPM_PACKAGE=true" >> $GITHUB_ENV
  fi

else

  echo "Nothing to do"

fi
