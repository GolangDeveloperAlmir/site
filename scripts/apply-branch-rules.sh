#!/usr/bin/env bash
set -euo pipefail

: "${GH_TOKEN:?GH_TOKEN environment variable required}"
: "${REPO:?REPO environment variable required (owner/repo)}"

apply_rule() {
  local branch="$1"
  curl -s -X PUT \
    -H "Authorization: token $GH_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/${REPO}/branches/${branch}/protection" \
    -d '{
      "required_status_checks": null,
      "enforce_admins": true,
      "required_pull_request_reviews": {
        "required_approving_review_count": 1
      },
      "restrictions": null
    }' >/dev/null
  echo "Applied protection rules to ${branch}"
}

for branch in deployments stage release main; do
  apply_rule "$branch"
done
