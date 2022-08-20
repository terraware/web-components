#!/bin/bash

set -euo pipefail

# Define tier based on branch ref
# For production, we will tag the commit similar to how we release BE/FE
if [[ "$GITHUB_REF" =~ refs/tags/(v[0-9]+\.[0-9.]+) ]]; then
  ARTIFACT_REGISTRY_PROVIDER=npm
elif [[ "$GITHUB_REF" == refs/heads/main ]]; then
  # TODO: use AWS code artifact repository for staging
  # For now, staging takes care of prod npm update.
  ARTIFACT_REGISTRY_PROVIDER=npm
else
  echo "Nothing to do"
  ARTIFACT_REGISTRY_PROVIDER=npm
fi

# Set registry envars
echo "ARTIFACT_REGISTRY_PROVIDER=$ARTIFACT_REGISTRY_PROVIDER" >> $GITHUB_ENV
