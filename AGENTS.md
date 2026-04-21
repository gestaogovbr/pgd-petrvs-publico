# Petrvs-PGD Codex Guide

## Project Truth

- Monorepo with `back-end/` Laravel 10/PHP 8.2 and `front-end/` Angular 21.
- The back end uses MariaDB/MySQL, `stancl/tenancy`, Sanctum, Horizon, Telescope, repositories, DTOs, Pest, PHPStan/Larastan, and SIAPE integrations.
- Detailed backend guidance lives in `back-end/docs`. Read the relevant document before changing repositories, tests, PHPStan-sensitive code, SIAPE flows, or tenant behavior.
- Codex skill sources for this repo live under `.agents/skills`. Keep them versioned there and sync to `~/.codex/skills` when they should be available globally.
- The root `.codex` path is currently an empty file. Do not treat it as a directory unless a change explicitly converts it.

## Commands

- Run backend commands only inside the PHP container:
  `docker exec petrvs_php sh -lc "cd /var/www && <command>"`
- Before backend commands, if `petrvs_php` or `petrvs_db` exist but are stopped, start them with `docker start petrvs_php` and `docker start petrvs_db`.
- If `petrvs_php` or `petrvs_db` do not exist, create/start the dev stack from `resources/docker/dev/docker-compose.yml` with:
  `docker compose -f resources/docker/dev/docker-compose.yml up -d petrvs_db petrvs_php`
- Run frontend commands only inside the Node container:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && <command>"`
- Do not run `artisan`, Pest, PHPStan, Composer, `npm`, `ng`, builds, or test commands directly on the host.
- Backend install:
  `docker exec petrvs_php sh -lc "cd /var/www && composer install --no-interaction --prefer-dist"`
- Backend tests:
  `docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --ci"`
- Focused backend test:
  `docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest tests/path/ExampleTest.php"`
- PHPStan focused scope:
  `docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse <path> --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"`
- Frontend install/start/build/lint/test use the same Node container wrapper with `npm install`, `npm start`, `npm run build`, `npm run lint`, or `npm test`.

## Backend Rules

- Controllers receive requests and delegate; business logic belongs in Services, use cases, repositories, DTOs, validators, policies, and resources.
- Prefer explicit dependency injection, contracts, small methods, early returns, constants instead of magic numbers, and clear domain names.
- Repositories follow `back-end/docs/repository-pattern.md`: contracts in `Contracts`, Eloquent implementations in `Eloquent`, DTOs for composed returns, and bindings in `RepositoryServiceProvider`.
- Protect authorization, validation, tenancy boundaries, mass assignment, SQL injection, sensitive data exposure, and N+1 queries.
- For SIAPE and integration work, preserve `SiapeLog`/audit behavior and validate tenant context, lotacao, gestor, unidade, servidor, and fallback flows.

## Frontend Rules

- Treat the front end as Angular 21 with strict TypeScript expectations.
- Use established module boundaries under `front-end/src/app/modules`, shared components under `front-end/src/app/components`, services under `front-end/src/app/services`, and models under `front-end/src/app/models`.
- Prefer typed RxJS flows and Angular patterns already present in the module. Avoid `any` unless there is a documented boundary reason.

## Style And PRs

- Use spaces for indentation. Backend PHP follows PSR-4 naming: classes in `StudlyCase`, methods/properties in `camelCase`.
- Angular component folders stay in kebab-case and preserve `*.component.ts|html|scss|spec.ts` naming.
- Prefer commits shaped like `type(scope): imperative summary`, for example `feat(relatorios): add export filter`.
- PR notes should describe the problem, summarize the solution, link the issue or ticket, include screenshots for UI changes, and call out migrations or deployment impact.

## Testing Rules

- Unit tests in `back-end/tests/Unit` use Pest + Mockery and do not touch the database.
- Integration tests for the central database use `back-end/tests/Integration` with `Tests\DatabaseTestCase`.
- Tenant-aware integration tests use `back-end/tests/IntegrationTenant` with `Tests\DatabaseTenantTestCase`.
- Backend behavior changes need focused tests, except controller-only changes that just route/delegate without business logic.
- Tenant migrations require checking whether `back-end/database/schema/tenant-schema.sql` must be regenerated.

## Quality Gate

- For code changes, run the narrowest relevant test first, then broader tests when risk or blast radius warrants it.
- Run PHPStan on the changed backend path, not only `app/Models`.
- Do not commit secrets, generated certificates, `.env` values, local dumps, or unrelated generated artifacts.
- Preserve user changes in the working tree. Do not revert unrelated edits.

## Codex Profiles

- Use `petrvs-backend-laravel` for normal Laravel backend implementation.
- Use `petrvs-repository-pattern` when creating or refactoring repositories, contracts, DTOs, or provider bindings.
- Use `petrvs-pest-testing` for Pest tests and Unit-vs-Integration decisions.
- Use `petrvs-phpstan-quality` for Larastan/PHPStan type and PHPDoc cleanup.
- Use `petrvs-siape-integracao` for SIAPE, gestores, servidores, unidades, lotacao, and integration logs.
- Use `petrvs-code-review` for security/performance/pattern review.
- Use `petrvs-tech-docs` for ADRs, API docs, runbooks, and architecture notes.
- Use `petrvs-angular-ui` for Angular 21 UI and service work.
