---
alwaysApply: false
description: Sempre que um repository for criado ou modificado
---
## Regras para Repositórios (Back-end)

- Seguir o padrão descrito em `back-end/docs/repository-pattern.md`.
- Usar contratos em `App\Repository\<Modulo>\Contracts` e Eloquent em `App\Repository\<Modulo>\Eloquent`.
- Preferir `AbstractEloquentReadRepository`/`AbstractEloquentWriteRepository` quando aplicável.
- Utilizar DTOs para retornos complexos (evitar arrays soltos).
- Após criar/refatorar repositórios, criar/atualizar testes conforme `back-end/docs/pest-bd.md`.
