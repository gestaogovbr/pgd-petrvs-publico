---
name: petrvs-phpstan-quality
description: Use when fixing or reviewing Petrvs-PGD PHPStan/Larastan findings, PHPDoc types, Eloquent relation warnings, undefined variables, duplicate validation keys, repository generics, or static-analysis quality.
---

# Petrvs PHPStan Quality

## References

- Read `back-end/AGENTS.md`.
- Load `../petrvs-backend-laravel/references/phpstan.md`.
- Load `../petrvs-backend-laravel/references/commands.md`.

## Workflow

1. Run or inspect PHPStan output for the narrow changed path.
2. Confirm whether each finding is a real bug, a missing type hint, a PHPDoc issue, or a Larastan inference limitation.
3. Prefer behavior-preserving fixes.
4. Add native types and valid PHPDocs where they clarify real contracts.
5. For relation warnings, inspect the model relation and query chain before editing.
6. Run PHPStan again on the same path; broaden scope only when shared code changed.

## Guardrails

- Do not add suppressions before trying a real fix.
- Do not change domain behavior merely to quiet analysis.
- Do not loosen types to `mixed` unless the boundary truly is dynamic.
- Keep validation arrays free of duplicate keys and undefined variables.
