# Simple Makefile for local development and container workflows
.RECIPEPREFIX = >

install:
> npm install

dev:
> npm run dev

build:
> npm run build

start:
> npm start

docker-build:
> docker build -t personal-site .

up:
> docker compose up

down:
> docker compose down

ci:
> npm test && npm run build
