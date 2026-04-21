# Petrvs Testing Reference

Primary docs: `back-end/docs/pest.md` and `back-end/docs/pest-bd.md`.

## Unit Tests

- Directory: `back-end/tests/Unit`.
- Framework: Pest with Mockery.
- Purpose: isolated service/domain logic.
- No database interaction.
- Do not use `Schema::create`, `DB::table(...)->insert`, `RefreshDatabase`, tenant setup, or real model persistence.
- Mock models, services, facades, and repositories. Use partial mocks only when needed to isolate legacy seams.
- Clean Mockery with `afterEach` or `afterAll` when the local test file pattern requires it.

## Integration Tests

- Directory: `back-end/tests/Integration`.
- Base class: `Tests\DatabaseTestCase`.
- Purpose: central database behavior, tenant management, global/admin logic.
- The test database is forced to `petrvs_test` through `phpunit.xml`.

## Tenant Integration Tests

- Directory: `back-end/tests/IntegrationTenant`.
- Base class: `Tests\DatabaseTenantTestCase`.
- Purpose: tenant business rules, tenant repositories, SIAPE tenant flows, model behavior against tenant schema.
- Tenant context is initialized automatically.
- Tenant schema loads from `database/schema/tenant-schema.sql` when available.
- If a tenant migration changes schema, evaluate whether `tenant-schema.sql` must be regenerated.

## Choosing The Suite

- Pure logic with mocked dependencies: `tests/Unit`.
- Central SaaS/admin/database behavior: `tests/Integration`.
- Tenant domain behavior or tenant repositories: `tests/IntegrationTenant`.
- Controller-only delegation changes usually do not require new tests unless behavior changes.

## Commands

```bash
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --ci"
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest tests/Unit/Services/ExampleTest.php"
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --testsuite=IntegrationTenant"
```

## Legacy Cleanup Targets

`back-end/docs/refactoring_tasks.md` lists tests that still need migration away from DB-touching Unit tests or PHPUnit style. When touching those files, bring them toward Pest + Mockery + zero DB interaction.
