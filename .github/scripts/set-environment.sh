#!/bin/bash

set -euo pipefail

# Define tier based on branch ref
# For production, we will tag the commit similar to how we release BE/FE
if [[ "$GITHUB_REF" =~ refs/tags/(v[0-9]+\.[0-9.]+) ]]; then
  ARTIFACT_REGISTRY=registry.npmjs.org
  ARTIFACT_REGISTRY_PROVIDER=npm
  ARTIFACT_REGISTRY_AUTH_TOKEN=$NPM_REGISTRY_AUTH_TOKEN
elif [[ "$GITHUB_REF" == refs/heads/main ]]; then
  # TODO: use AWS code artifact repository for staging
  # For now, staging takes care of prod npm update.
  ARTIFACT_REGISTRY=registry.npmjs.org
  ARTIFACT_REGISTRY_PROVIDER=npm
  ARTIFACT_REGISTRY_AUTH_TOKEN=$NPM_REGISTRY_AUTH_TOKEN
else
  echo "Nothing to do"
#  exit
  ARTIFACT_REGISTRY=registry.npmjs.org
  ARTIFACT_REGISTRY_PROVIDER=npm
  ARTIFACT_REGISTRY_AUTH_TOKEN=$NPM_REGISTRY_AUTH_TOKEN
fi

echo "ARTIFACT_REGISTRY=$ARTIFACT_REGISTRY
ARTIFACT_REGISTRY_PROVIDER=$ARTIFACT_REGISTRY_PROVIDER
ARTIFACT_REGISTRY_AUTH_TOKEN=$ARTIFACT_REGISTRY_AUTH_TOKEN"

# Set registry envars
echo "ARTIFACT_REGISTRY=$ARTIFACT_REGISTRY
ARTIFACT_REGISTRY_PROVIDER=$ARTIFACT_REGISTRY_PROVIDER
ARTIFACT_REGISTRY_AUTH_TOKEN=$ARTIFACT_REGISTRY_AUTH_TOKEN" >> $GITHUB_ENV
