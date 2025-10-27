# Simple Makefile for local development and container workflows

install:
	yarn install

lint:
	yarn lint

lint-fix:
	yarn lint:fix

format:
	yarn format

format-check:
	yarn format:check

test:
	yarn test

coverage:
	yarn coverage

dev:
	yarn dev

build:
	yarn build

start:
	yarn start

e2e:
	yarn e2e

e2e-headed:
	yarn e2e:headed

audit:
	yarn audit

docker-build:
	docker build -t personal-site .

up:
	docker compose -f deployments/docker-compose.yml up

down:
	docker compose -f deployments/docker-compose.yml down

verify:
	yarn lint && yarn test && yarn coverage

ci:
	yarn verify && yarn e2e

generate-secret:
	./scripts/generate-secret.sh

