# Deployment Guide

The project comes with a straightforward Docker setup for running the site in
production. The root `Dockerfile` builds the app and the `deployments/`
directory holds Docker Compose and Nginx configuration.

## Prerequisites
- Docker and Docker Compose
- OpenSSL for generating certificates

## Build and Run
```bash
docker build -t personal-site .
docker compose -f deployments/docker-compose.yml up
```
The site will be served behind an Nginx reverse proxy on ports 80 and 443.

## HTTPS
Generate self‑signed certificates:
```bash
./scripts/setup-https.sh
```
Place real certificates in the `certs/` directory to enable HTTPS in production.

To generate an application secret, run:
```bash
make generate-secret
```
Secrets are stored in the `secrets/` directory (ignored by git).
