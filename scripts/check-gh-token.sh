#!/usr/bin/env bash
set -euo pipefail

TOKEN_FILE="$(dirname "$0")/../secrets/gh_token"

if [[ ! -f "$TOKEN_FILE" ]]; then
  echo "Token file $TOKEN_FILE not found. Run scripts/generate-gh-token.sh first." >&2
  exit 1
fi

TOKEN=$(cat "$TOKEN_FILE")
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: token $TOKEN" https://api.github.com/user)
if [[ "$STATUS" != "200" ]]; then
  echo "Token invalid or lacks permissions (HTTP $STATUS)" >&2
  exit 1
fi

echo "Token is valid."
