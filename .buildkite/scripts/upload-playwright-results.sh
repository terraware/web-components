#!/usr/bin/env bash
set -euo pipefail
mkdir -p playwright/public
if [[ -d playwright/test-results ]]; then
  mv playwright/test-results playwright/public/
fi
if [[ -d playwright-report ]]; then
  mv playwright-report playwright/public/report
fi
if [[ -f playwright/results.json ]]; then
  cp playwright/results.json playwright/public/
fi
BUILDKITE_S3_SSE_ENABLED=true buildkite-agent artifact upload 'playwright/public/**/*'
