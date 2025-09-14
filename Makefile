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
> docker compose up

down:
> docker compose down

ci:
> yarn test && yarn build
