#!/bin/bash
#
# On tag builds, generate a changelog from the commits since the previous
# version tag, post it to Slack, and transition the referenced Jira issues
# to "Released to Production from Done". Replaces the (previously nonexistent)
# release-notes flow; mirrors terraware-server.
#

set -euo pipefail

.buildkite/scripts/install-deps.sh --tools

echo "--- :git: Generate release notes"

git fetch --tags --depth=1
THIS_VERSION=$(git tag --list --sort=creatordate 'v[0-9]*' | tail -n1)
LAST_VERSION=$(git tag --list --sort=creatordate 'v[0-9]*' | tail -n2 | head -n1)

if [[ -z "$THIS_VERSION" || -z "$LAST_VERSION" || "$THIS_VERSION" == "$LAST_VERSION" ]]; then
    echo "Could not determine a tag range to summarize; skipping."
    exit 0
fi

.buildkite/scripts/lib/fetch-tag.sh "$LAST_VERSION"
.buildkite/scripts/lib/fetch-tag.sh "$THIS_VERSION"

CHANGELOG=$(git log "$LAST_VERSION".."$THIS_VERSION" --pretty=format:"%s")
echo "Changelog from $LAST_VERSION to $THIS_VERSION:"
echo "$CHANGELOG"

echo "--- :slack: Post release notes to Slack"

if [[ -n "${SLACK_WEBHOOK_URL:-}" ]]; then
    CHANGELOG_JSON=$(echo "$CHANGELOG" | jq -Rs .)

    curl -s -X POST "$SLACK_WEBHOOK_URL" \
        -H 'Content-Type: application/json' \
        -d "{
            \"release_notes\": $CHANGELOG_JSON,
            \"release_repository\": \"${BUILDKITE_REPO:-terraware/web-components}\",
            \"release_version\": \"$THIS_VERSION\"
        }"
    echo "Posted release notes to Slack."
else
    echo "SLACK_WEBHOOK_URL not set, skipping Slack notification."
fi

echo "--- :atlassian-jira: Transition Jira issues"

if [[ -n "${JIRA_BASE_URL:-}" && -n "${JIRA_USER_EMAIL:-}" && -n "${JIRA_API_TOKEN:-}" ]]; then
    JIRA_ISSUES=$(echo "$CHANGELOG" |
        (grep -Eo 'SW-[0-9]+' || true) |
        sort -u)

    if [[ -z "$JIRA_ISSUES" ]]; then
        echo "No Jira issue keys found in changelog; nothing to transition."
        exit 0
    fi

    JIRA_AUTH=$(echo -n "${JIRA_USER_EMAIL}:${JIRA_API_TOKEN}" | base64)

    for issue in $JIRA_ISSUES; do
        echo "Transitioning $issue..."
        TRANSITIONS=$(curl -s \
            -H "Authorization: Basic $JIRA_AUTH" \
            -H "Content-Type: application/json" \
            "${JIRA_BASE_URL}/rest/api/3/issue/${issue}/transitions")

        TRANSITION_ID=$(echo "$TRANSITIONS" | jq -r '.transitions[] | select(.name == "Released to Production from Done") | .id')

        if [[ -n "$TRANSITION_ID" ]]; then
            curl -s -X POST \
                -H "Authorization: Basic $JIRA_AUTH" \
                -H "Content-Type: application/json" \
                -d "{\"transition\": {\"id\": \"$TRANSITION_ID\"}}" \
                "${JIRA_BASE_URL}/rest/api/3/issue/${issue}/transitions"
            echo "Transitioned $issue"
        else
            echo "No matching transition found for $issue, skipping."
        fi
    done
else
    echo "Jira credentials not configured, skipping Jira transitions."
fi
