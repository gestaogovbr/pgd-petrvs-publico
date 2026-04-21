---
name: petrvs-code-review
description: Use when reviewing Petrvs-PGD Laravel or Angular changes for security, performance, tenancy, SIAPE impact, repository patterns, tests, PHPStan, and maintainability before merge.
---

# Petrvs Code Review

## Review Posture

- Lead with findings ordered by severity.
- Ground every finding in file and line references.
- Prioritize bugs, security risks, data leaks, tenant boundary issues, authorization gaps, N+1 queries, fragile SIAPE behavior, and missing tests.
- Keep summary secondary and brief.

## Backend Checklist

- Authorization, validation, tenant scope, mass assignment, SQL injection, CPF/personal data exposure.
- Services and repositories follow Petrvs boundaries.
- DTOs are used for composed return shapes.
- Queries avoid N+1 and unnecessary broad loading.
- SIAPE changes preserve logs, lotacao, gestor, unidade, servidor, and tenant behavior.
- Pest coverage matches risk; Unit tests do not touch DB.
- PHPStan/Larastan likely passes for changed paths.

## Frontend Checklist

- Angular 21 patterns, strict typing, no unnecessary `any`.
- Safe rendering and sanitization for server data.
- Subscriptions are managed; RxJS flows are typed.
- Module boundaries and shared components are respected.

## References

- Use `../petrvs-backend-laravel/references/testing.md` for test expectations.
- Use `../petrvs-backend-laravel/references/repository-pattern.md` for repository changes.
- Use `../petrvs-backend-laravel/references/siape.md` for SIAPE changes.
