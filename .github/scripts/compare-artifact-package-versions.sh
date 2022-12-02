#!/bin/bash

set -euo pipefail

echo "Artifact Registry Provider = $ARTIFACT_REGISTRY_PROVIDER"

# TODO: add support for AWS Code artifact
if [[ $ARTIFACT_REGISTRY_PROVIDER == 'npm' ]]; then

  echo "Checking version in git package.json"
  PACKAGE_JSON_VERSION=`node -e "process.stdout.write(require(__dirname + '../../dist/package.json').version)"`
  echo "Got package json version $PACKAGE_JSON_VERSION"

  echo "Checking if version exists in npm repository"
  npm show @terraware/web-components versions --json > /tmp/npm-versions
  VERSION_EXISTS=false
  while read line; do
    if ( echo $line | grep ${PACKAGE_JSON_VERSION} ) then
      VERSION_EXISTS=true
    fi
  done < /tmp/npm-versions

  if ( $VERSION_EXISTS ); then
    echo "Package is up to date"
  else
    echo "Package needs update"
    echo "UPDATE_NPM_PACKAGE=true" >> $GITHUB_ENV
  fi

else

  echo "Nothing to do"

fi
