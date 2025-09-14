#!/usr/bin/env bash
set -euo pipefail

CERT_DIR="$(dirname "$0")/../certs"
mkdir -p "$CERT_DIR"

openssl req -x509 -nodes -newkey rsa:2048 \
  -keyout "$CERT_DIR/cert.key" \
  -out "$CERT_DIR/cert.crt" \
  -days 365 \
  -subj "/CN=localhost"

echo "Self-signed certificate generated in $CERT_DIR"
