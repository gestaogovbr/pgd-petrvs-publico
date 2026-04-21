---
name: petrvs-pest-testing
description: Use when writing, migrating, debugging, or reviewing Petrvs-PGD backend tests with Pest, Mockery, Unit tests without database access, Integration tests, or IntegrationTenant tests.
---

# Petrvs Pest Testing

## References

- Read `back-end/AGENTS.md`.
- Load `../petrvs-backend-laravel/references/testing.md`.
- Load `../petrvs-backend-laravel/references/commands.md` before running tests.

## Workflow

1. Classify the behavior: pure logic, central database, or tenant database.
2. Use `tests/Unit` for pure logic and mock every database boundary.
3. Use `tests/Integration` for central database behavior.
4. Use `tests/IntegrationTenant` for tenant rules and tenant repositories.
5. Prefer focused Pest expectations and small test cases.
6. Keep fixtures minimal and domain-relevant.
7. Run the focused test file first, then suite-level tests if risk warrants it.

## Unit Test Rules

- No `Schema::create`.
- No `DB::table(...)->insert`.
- No `RefreshDatabase`.
- No real model persistence.
- Use Mockery for models, repositories, services, facades, and partial legacy seams.

## Integration Rules

- `Tests\DatabaseTestCase` is for central DB integration.
- `Tests\DatabaseTenantTestCase` initializes tenant context automatically for `IntegrationTenant`.
- Tenant migrations require checking `database/schema/tenant-schema.sql`.
