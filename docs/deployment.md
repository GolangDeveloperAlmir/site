# Deployment Guide

This project ships with a Docker-based setup for production. The root `Dockerfile` builds the app, while additional deployment files (Compose and Nginx config) live in the `deployments/` directory.

## Prerequisites
- Docker and Docker Compose
- OpenSSL for generating certificates

## Build and Run
```
docker build -t personal-site .
docker compose -f deployments/docker-compose.yml up
```
The application will be available behind an Nginx reverse proxy on ports 80 and 443.

## HTTPS
Generate self-signed certificates:
```
./scripts/setup-https.sh
```
Place real certificates in the `certs/` directory to enable HTTPS in production.

To generate an application secret, run:
```
make generate-secret
```
Secrets are stored in the `secrets/` directory (ignored by git).
