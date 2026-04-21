---
name: petrvs-repository-pattern
description: Use when creating, refactoring, reviewing, or testing Petrvs-PGD backend repositories, repository contracts, Eloquent repository implementations, DTO returns, or RepositoryServiceProvider bindings.
---

# Petrvs Repository Pattern

## References

- Read `back-end/AGENTS.md`.
- Load `../petrvs-backend-laravel/references/repository-pattern.md`.
- Load `../petrvs-backend-laravel/references/testing.md` when adding or adjusting tests.
- Load `../petrvs-backend-laravel/references/commands.md` before running commands.

## Workflow

1. Inspect the model, existing repositories for nearby modules, consumers, and provider bindings.
2. For a new repository, use:
   `docker exec petrvs_php sh -lc "cd /var/www && php artisan make:repository <Model>Repository"`
3. Keep contracts narrow and expressive.
4. Put generic read/write behavior in Eloquent read/write repositories.
5. Use a domain repository facade only when it simplifies service consumption.
6. Use DTOs for composed return data.
7. Register bindings in `RepositoryServiceProvider`.
8. Add focused tests, usually under `tests/IntegrationTenant/Repository` for tenant data.
9. Run focused Pest and PHPStan on changed repository/provider paths.

## Guardrails

- Do not inject repositories directly into controllers unless the surrounding module already does so for a narrow read-only case.
- Do not return large associative arrays for stable domain shapes.
- Do not duplicate query logic in Services when a repository method is the clearer boundary.
