---
name: petrvs-siape-integracao
description: Use for Petrvs-PGD SIAPE integration work involving unidades, servidores, gestores, chefia, lotacao, matricula, SIAPE local/API sources, SiapeLog, process summaries, or tenant-aware integration flows.
---

# Petrvs SIAPE Integracao

## References

- Read `back-end/AGENTS.md`.
- Load `../petrvs-backend-laravel/references/siape.md`.
- Load `../petrvs-backend-laravel/references/testing.md` for validation choices.
- Load `../petrvs-backend-laravel/references/repository-pattern.md` when moving persistence behind repositories.

## Workflow

1. Identify whether the change affects unidade, servidor, gestor, lotacao, matricula, logs, routes, jobs, or tenant state.
2. Inspect existing SIAPE services and tests before editing.
3. Preserve public method compatibility in legacy integration services unless the user asks for a breaking refactor.
4. Keep logging/audit behavior visible through `SiapeLog` or the existing logging path.
5. Protect CPF and personal data in logs, tests, and responses.
6. Add Unit tests for pure normalization/routing logic and IntegrationTenant tests for tenant persistence.
7. Run focused Pest and PHPStan on changed SIAPE paths.

## Guardrails

- Do not drop fallback behavior between local files and API sources without explicit scope.
- Do not assume CPF alone identifies the correct servidor when matricula or unidade exercise code is part of the rule.
- Do not bypass tenant context for tenant business data.
