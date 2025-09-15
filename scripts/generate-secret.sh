#!/usr/bin/env bash
set -euo pipefail

SECRET_DIR="$(dirname "$0")/../secrets"
mkdir -p "$SECRET_DIR"

openssl rand -base64 32 > "$SECRET_DIR/app.secret"
echo "Secret stored in $SECRET_DIR/app.secret"
