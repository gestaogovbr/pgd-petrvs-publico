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
- Valido para alterações na pasta `back-end/`	
- Para criar um novo repository deve usar o comando `php artisan make:repository <Model>Repository` dentro do container `petrvs_php`.

### Assinaturas de Contract vs Abstract
- Ao adicionar método a um Contract que herda de `AbstractEloquentReadRepository` ou `AbstractEloquentWriteRepository`, a assinatura DEVE ser compatível com o Abstract
- Exemplo: se o Abstract tem `findById(string|int $id): ?Model`, o Contract deve usar `findById(string|int $id): ?Model` + PHPDoc `@return ConcreteModel|null`
- NÃO declarar `findById(string $id): ?ConcreteModel` — causa PHP Fatal Error por incompatibilidade
- O Repository Facade pode ter o tipo concreto no return type, pois não herda do Abstract
