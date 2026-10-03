# CLAUDE.md

Guidance for AI agents (and humans) working in the **template-ts-package** repo.

## What template-ts-package is

TypeScript package template with CI, releases and docs. A TypeScript package (ESM, Node 24+) with a library entry (`src/index.ts`) and a CLI (`src/cli.ts`), built with tsdown, tested with vitest, linted and formatted with Biome.

## Commands

`mise trust && mise install` once per clone, then `mise run install`. **pnpm is the package manager**; never use npm or yarn to install, and never commit another lockfile. `mise` puts `node_modules/.bin` on PATH and loads `.env`, so run tools bare (`vitest`, `biome`, `tsdown`, `tsc`), not through `pnpm exec`.

- `mise run check`: `biome ci .` + `tsc --noEmit`. **Must be clean before committing.** `pnpm format` (= `biome check --write .`) fixes what it can.
- `mise run test`: `vitest run`. **Must be green before committing.**
- `mise run build`: `tsdown` to `dist/`.

CI runs the same mise tasks.

## Architecture

- `src/index.ts`: public API. Everything exported here is semver surface.
- `src/cli.ts`: thin CLI over the API; no logic of its own.
- `test/`: vitest specs, `*.test.ts`, importing from `../src/*.js` (NodeNext needs the `.js` suffix).
- `tsdown.config.ts`: entries and dts. `package.json` `exports`/`bin`/`files` decide what ships.

## Conventions that bite

- Relative imports need the `.js` extension (NodeNext).
- Biome is the only linter/formatter; there is no ESLint or Prettier. Hooks run `biome check --write` on staged files.
- pnpm does not run dependency build scripts by default: allow new ones in `pnpm-workspace.yaml` (`allowBuilds`), not in `package.json`.
- Pin exact versions of dev tools; Dependabot groups the bumps.

## Releasing

Bump `version` in `package.json`, update CHANGELOG, merge, then `git tag vX.Y.Z && git push origin vX.Y.Z`. `release.yml` verifies tag == version, re-runs the gates and publishes with npm trusted publishing and provenance (OIDC; setup notes at the top of the workflow). Don't tag or publish unless asked.

## Changelog

`CHANGELOG.md` follows [Keep a Changelog](https://keepachangelog.com). Every user-facing change adds a bullet under `## [Unreleased]` in the same change as the code.

## Git workflow

- Branch off `main`. Conventional commits (commitlint via lefthook). PRs are draft by default.
- **Worktrees go in `.claude/worktrees/<branch-with-dashes>` inside this repo.** Never under `/tmp` or a scratchpad, and never run installs or builds there. Remove after merge.
- Dependabot patch/minor PRs auto-merge on green; major bumps need a human.

## Docs site

`docs/` is a VitePress site and its own pnpm root (`cd docs && pnpm install && pnpm dev`; build with `pnpm build`). `.github/workflows/docs.yml` deploys it to GitHub Pages on pushes to `main` that touch `docs/`. The base path is `/template-ts-package/`; set `DOCS_BASE=/` when it moves to a custom domain. A dead link fails the build, so link repo files via github.com URLs.
