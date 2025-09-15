#!/usr/bin/env bash
set -euo pipefail

TOKEN_DIR="$(dirname "$0")/../secrets"
mkdir -p "$TOKEN_DIR"

openssl rand -hex 20 > "$TOKEN_DIR/gh_token"
chmod 600 "$TOKEN_DIR/gh_token"
echo "Token stored in $TOKEN_DIR/gh_token"
