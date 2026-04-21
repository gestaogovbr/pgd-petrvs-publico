# Petrvs PHPStan Reference

Primary doc: `back-end/docs/phpstan.md`.

## Current Config

- Config file: `back-end/phpstan.neon.dist`.
- Extension: `vendor/larastan/larastan/extension.neon`.
- Paths default to `app`.
- Level: `3`.
- Temporary directory: `storage/framework/phpstan`.
- `treatPhpDocTypesAsCertain: false`.
- Parallelism is intentionally conservative.

## Commands

```bash
docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app/Services/ExampleService.php --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app/Repository --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
```

## Fixing Guidance

- Prefer real type fixes over suppressions.
- Add native param and return types when compatible.
- Use valid PHPDoc syntax with types in tags and descriptions in prose.
- Initialize variables before conditional use.
- Remove unused imports and unused closure captures.
- Avoid duplicate array keys in validation rules.
- For Eloquent relation existence warnings, first confirm the relation exists on the model. Then consider relation return types/PHPDocs or simplifying query expressions.
- Do not change behavior just to satisfy PHPStan unless the reported issue is a real bug.

## Verification

- Run PHPStan on the changed path.
- If a shared type, model relation, base repository, or provider changes, run a broader related scope.
- For Services work, use `app/Services` or the specific service file depending on risk.
