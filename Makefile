# Simple Makefile for local development and container workflows
.RECIPEPREFIX = >

install:
> yarn install

dev:
> yarn dev

build:
> yarn build

start:
> yarn start

docker-build:
> docker build -t personal-site .

up:
> docker compose -f deployments/docker-compose.yml up

down:
> docker compose -f deployments/docker-compose.yml down

ci:
> yarn test && yarn build

generate-secret:
> ./scripts/generate-secret.sh

