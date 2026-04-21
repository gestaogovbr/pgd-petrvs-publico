---
name: petrvs-tech-docs
description: Use when creating or updating Petrvs-PGD technical documentation, ADRs, API contracts, architecture notes, runbooks, SIAPE flow docs, testing docs, or release/PR technical notes.
---

# Petrvs Technical Docs

## Workflow

1. Identify the target audience: developer, reviewer, operator, or product stakeholder.
2. Inspect the implementation and existing docs before writing.
3. Keep Markdown concise, factual, and aligned with current repo behavior.
4. For architectural decisions, use ADR shape: title, status, context, decision, consequences.
5. For APIs, document route, request, success response, error response, status codes, and compatibility notes.
6. For operations, document command, environment, failure symptoms, diagnosis, and rollback or recovery path.

## Petrvs Focus Areas

- Laravel backend architecture, repositories, DTOs, tenancy, queues, jobs, SIAPE, logs, Pest, and PHPStan.
- Angular 21 module/service/component behavior when documenting UI changes.
- Security and performance impacts, especially tenant scope and personal data.

## References

- Use `../petrvs-backend-laravel/references/commands.md` for commands.
- Use `../petrvs-backend-laravel/references/testing.md` for test documentation.
- Use `../petrvs-backend-laravel/references/siape.md` for SIAPE docs.
