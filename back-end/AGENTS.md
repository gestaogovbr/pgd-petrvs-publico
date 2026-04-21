# Petrvs Backend Codex Guide

## Project Truth

- This directory is a Laravel 10 application on PHP 8.2.
- The app uses MariaDB/MySQL, `stancl/tenancy`, Sanctum, Horizon, Telescope, SIAPE integrations, repositories, DTOs, Pest, and PHPStan/Larastan.
- Run every command through `petrvs_php`:
  `docker exec petrvs_php sh -lc "cd /var/www && <command>"`
- Do not run backend commands directly on the host.

## Required References

- Testing: `docs/pest.md` and `docs/pest-bd.md`.
- Repositories: `docs/repository-pattern.md`.
- PHPStan: `docs/phpstan.md` and `phpstan.neon.dist`.
- SIAPE and integration flows: `docs/integracao_gestor_logica.md`, `docs/refactor-integracao-service.md`, and `docs/siape-unidade-relatorio-routes.md`.

## Architecture Rules

- Controllers should stay thin: validate/request handling, authorization entry points, delegation, and response shaping only.
- Business logic belongs in Services, domain-specific collaborators, validators, repositories, DTOs, policies, resources, jobs, or commands.
- Prefer constructor injection and contracts where repositories or external integrations are involved.
- Keep methods small, prefer early returns over nested conditionals, avoid magic numbers, and remove unused imports.
- Preserve tenancy boundaries explicitly. Be careful with central vs tenant connections, tenant initialization, and data isolation.
- Preserve audit/log behavior, especially `SiapeLog`, Laravel logs, auditing, and integration process logs.

## Repository Rules

- Follow `docs/repository-pattern.md`.
- Use `php artisan make:repository <Model>Repository` through the PHP container for new repositories.
- Put read/write contracts under `App\Repository\<Modulo>\Contracts`.
- Put Eloquent implementations under `App\Repository\<Modulo>\Eloquent`.
- Prefer `AbstractEloquentReadRepository` and `AbstractEloquentWriteRepository` for generic operations.
- Return DTOs for composed data. Avoid loose associative arrays for multi-field domain returns.
- Register interface bindings in `App\Providers\RepositoryServiceProvider`.
- Services should consume contracts or domain repository facades, not raw query details.

## Testing Rules

- Unit tests live in `tests/Unit` and use Pest + Mockery.
- Unit tests must not use `Schema::create`, `DB::table(...)->insert`, `RefreshDatabase`, tenant setup, or real model persistence.
- Central database integration tests live in `tests/Integration` and use `Tests\DatabaseTestCase`.
- Tenant integration tests live in `tests/IntegrationTenant` and use `Tests\DatabaseTenantTestCase`; tenant context is initialized automatically.
- Use `IntegrationTenant` for tenant business rules, repositories over tenant data, SIAPE tenant flows, and model behavior that needs tenant schema.
- If a tenant migration changes schema, evaluate whether `database/schema/tenant-schema.sql` must be regenerated.

## Quality Commands

- Full Pest:
  `docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --ci"`
- Focused Pest:
  `docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest tests/Unit/Services/ExampleTest.php"`
- Tenant integration suite:
  `docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --testsuite=IntegrationTenant"`
- PHPStan focused path:
  `docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app/Services/ExampleService.php --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"`
- PHPStan full app:
  `docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"`

## Security And Performance

- Validate inputs, enforce authorization, and protect tenant scope before data access.
- Avoid exposing CPF, tokens, logs, or integration payloads unless the endpoint requires it.
- Avoid N+1 queries; use eager loading, repository-specific query methods, and indexes where appropriate.
- Prefer transactions for multi-write business operations.
- Treat SQL strings, dynamic filters, file downloads, and external SIAPE responses as security-sensitive surfaces.
