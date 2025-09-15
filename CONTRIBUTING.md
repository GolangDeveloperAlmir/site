# Contributing

## Setup
- Node 22, Yarn (Corepack enabled).
- `corepack enable`
- `yarn install --immutable`

## Commands
- `yarn lint` / `yarn test` / `yarn build`

## Branches
- Feature: `codex/<feature>` → авто-промоушен в `features/<feature>` и PR в `deployments` (см. CI).
- Прямые пуши в `main` запрещены (защита веток).

## Commits / PR
- Заголовки PR по Conventional Commits (проверяется Semantic PR).
- Перед мержем: зелёные `lint`, `test`, `build`.
