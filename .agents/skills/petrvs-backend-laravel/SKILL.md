---
name: petrvs-backend-laravel
description: Use for implementing, refactoring, debugging, or reviewing Petrvs-PGD Laravel backend code, especially Services, Controllers, Jobs, Commands, Models, DTOs, tenancy, SIAPE integrations, Pest tests, and PHPStan validation.
---

# Petrvs Backend Laravel

## Start Here

1. Read `AGENTS.md` and `back-end/AGENTS.md`.
2. Inspect the affected code before deciding. Use `rg` and focused file reads.
3. Load only the reference that matches the task:
   - Commands: `references/commands.md`
   - Tests: `references/testing.md`
   - Repositories: `references/repository-pattern.md`
   - PHPStan: `references/phpstan.md`
   - SIAPE: `references/siape.md`

## Workflow

- Keep changes narrow and aligned with existing Laravel patterns.
- Put request/response handling in controllers and business rules in Services or focused collaborators.
- Prefer contracts, DTOs, repositories, validators, policies, resources, and jobs where the existing codebase already uses them.
- Preserve tenant context and logging/audit behavior.
- Add or adjust tests for changed behavior unless the change is purely controller delegation.
- Validate with the narrowest relevant Pest command and PHPStan on the changed path.

## Backend Guardrails

- Run all backend commands through `petrvs_php`; never run backend tooling on the host.
- Unit tests must not touch the database.
- Tenant-aware behavior belongs in `tests/IntegrationTenant`.
- Repository changes must follow the repository reference and update bindings.
- Security-sensitive areas: authorization, tenant isolation, CPF/personal data, SIAPE payloads, file downloads, raw SQL, mass assignment, and logs.
