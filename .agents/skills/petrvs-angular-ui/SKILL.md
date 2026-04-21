---
name: petrvs-angular-ui
description: Use when implementing, refactoring, debugging, or reviewing Petrvs-PGD Angular 21 frontend modules, components, services, routes, forms, RxJS flows, templates, tests, lint, or build behavior.
---

# Petrvs Angular UI

## Start Here

1. Read `AGENTS.md`.
2. Inspect the affected module under `front-end/src/app/modules` and shared pieces under `components`, `services`, and `models`.
3. Load `../petrvs-backend-laravel/references/commands.md` before running frontend commands.

## Workflow

- Treat the app as Angular 21.
- Preserve module boundaries and existing component/service naming.
- Prefer strict TypeScript, typed models, and typed RxJS flows.
- Avoid `any` unless the boundary is genuinely dynamic and the reason is clear.
- Keep templates safe for server-provided data.
- Use established UI components and patterns already present in the feature.
- Run focused lint/test/build commands through `petrvs_node` when applicable.

## Commands

```bash
docker exec petrvs_node sh -lc "cd /usr/src/app && npm run lint"
docker exec petrvs_node sh -lc "cd /usr/src/app && npm test"
docker exec petrvs_node sh -lc "cd /usr/src/app && npm run build"
```
