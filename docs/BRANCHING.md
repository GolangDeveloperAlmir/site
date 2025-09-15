# Branching & Promotion

Chain: `codex/* → features/* → deployments → stage → release → main`

- Push to `codex/<feature>` is automatically mirrored to `features/<feature>` and opens a PR into `deployments`.
- Promotion then proceeds via `deployments → stage → release → main` using an idempotent promote job.
- Required checks: `lint`, `test`, `build`.
- A container image is published to GHCR on every push.

## Purpose of branches

- `codex/<feature>`: Source branch for day-to-day development. Safe to rebase.
- `features/<feature>`: CI-visible mirror for the same feature. Treated as immutable once PRs are open.
- `deployments`: Integration branch used to validate deploy manifests and image rollout logic.
- `stage`: Staging environment. Auto-promoted from `deployments` after checks pass.
- `release`: Pre-release stabilization. Cherry-picks from `stage` or direct promotions.
- `main`: Production. Only promoted via release flow or hotfixes.

## Naming conventions

- Feature: `codex/<ticket-or-scope>` (e.g., `codex/FE-123-user-profile`)
- Hotfix: `hotfix/<ticket-or-scope>` (e.g., `hotfix/SEV1-db-timeout`)
- Release: `release/vX.Y.Z`
- Tags: `vX.Y.Z` (SemVer)

Keep names lowercase, hyphen-separated. Avoid slashes beyond the top-level prefix.

## Merge strategy

- Prefer “Squash and merge” for feature PRs to keep a clean, linear history.
- Do not rebase or force-push shared branches (`features/*`, `deployments`, `stage`, `release`, `main`).
- Hotfixes may be merged as regular merges if necessary to preserve context.

## Pull Requests

- Open PRs from `features/<feature>` to `deployments`.
- PRs must include:
    - Linked issue/ticket
    - Scope and testing notes
    - Backward-compatibility notes and migration steps (if any)
- Required labels: `feature`, `bug`, `chore`, or `hotfix` (pick one)
- Reviews: At least 1 approval from a code owner
- Status checks must be green: `lint`, `test`, `build` (plus environment-specific checks where applicable)

## CI/CD & promotion

- Every push builds, lints, tests, and publishes an image to GHCR.
- Promotion is performed by an idempotent job:
    1. `deployments` → `stage`
    2. `stage` → `release`
    3. `release` → `main`
- Promotions require green checks on the source branch and successful deploy health checks.
- Rollback is performed by promoting the previous known-good tag (no direct push to `main`).

## Releases and versioning

- Semantic Versioning:
    - MAJOR: breaking changes
    - MINOR: new functionality, backward-compatible
    - PATCH: bugfixes, no API changes
- Tag production releases with `vX.Y.Z` on `main`.
- After release, back-merge `main` → `release` → `stage` if needed to keep branches aligned.

## Hotfix workflow

- Branch from `main`: `hotfix/<scope>`
- Open PR to `release` and/or directly promote to `main` after passing checks.
- Backport to `stage` and `deployments` as needed to avoid regressions and drift.
- Tag a patch release if the hotfix reaches production.

## Dependency updates

- Treat automated dependency PRs like feature PRs:
    - Ensure tests cover the change
    - Note breaking updates and migration steps
    - Promote through environments like any other change

## Access & protections

- Protected: `features/*`, `deployments`, `stage`, `release`, `main`
    - Require PR, approvals, and checks
    - Disallow force pushes
- Unprotected: `codex/*` (local iteration allowed; CI will mirror as needed)

## Local development quickstart

1. Create a feature branch: `git checkout -b codex/FE-123-user-profile`
2. Commit and push: `git push -u origin codex/FE-123-user-profile`
3. CI mirrors to `features/FE-123-user-profile` and opens a PR to `deployments`
4. After approvals and green checks, use the promote job to move through `stage → release → main`

## FAQ / edge cases

- Multiple features in flight:
    - Keep features small; rebase `codex/*` on the latest `main` for freshness
    - Avoid long-lived branches; prefer incremental PRs
- Flaky checks:
    - Flakes must be deflaked or quarantined before promotion
- Breaking changes:
    - Announce in PR and release notes; provide migration steps and feature flags if possible
