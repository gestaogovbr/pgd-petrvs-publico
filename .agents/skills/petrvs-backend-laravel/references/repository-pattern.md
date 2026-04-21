# Petrvs Repository Pattern Reference

Primary doc: `back-end/docs/repository-pattern.md`.

## Goals

- Isolate Eloquent access from Services and domain logic.
- Standardize read/write data access.
- Keep query optimization localized.
- Make tests easier through contracts and DTOs.

## Structure

- Base read repository: `App\Repository\Eloquent\AbstractEloquentReadRepository`.
- Base write repository: `App\Repository\Eloquent\AbstractEloquentWriteRepository`.
- Contracts: `App\Repository\<Modulo>\Contracts`.
- Eloquent implementations: `App\Repository\<Modulo>\Eloquent`.
- Optional domain facade: `App\Repository\<Modulo>Repository`.
- Bindings: `App\Providers\RepositoryServiceProvider`.

## Creation

Use the generator through the PHP container:

```bash
docker exec petrvs_php sh -lc "cd /var/www && php artisan make:repository <Model>Repository"
```

Use `--read=false` or `--write=false` only when the module genuinely needs one side.

## Rules

- Services consume contracts or a domain repository facade, not raw query details.
- Extend `AbstractEloquentReadRepository` or `AbstractEloquentWriteRepository` for generic operations.
- Add expressive methods for domain-specific queries, such as `findByCpfAndMatricula`.
- Return DTOs for composed multi-field data.
- Avoid loose associative arrays when the return shape is meaningful.
- Register every new contract binding in `RepositoryServiceProvider`.
- Add focused tests. Tenant data repositories usually need `tests/IntegrationTenant/Repository`.

## Review Checklist

- Contracts expose only methods consumers need.
- Implementations honor contract signatures and return types.
- Query methods avoid N+1 and load only required relations.
- DTOs are typed and placed under `App\DTOs\<Modulo>`.
- Provider bindings resolve interfaces to Eloquent implementations.
- PHPStan passes for the changed repository paths.
