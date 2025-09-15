# Deployment Guide

This project ships with a Docker-based setup for production. Deployment files live in the `deployments/` directory.

## Prerequisites
- Docker and Docker Compose
- OpenSSL for generating certificates

## Build and Run
```
make docker-build
make up
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
