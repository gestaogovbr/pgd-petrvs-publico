# Referência Repository Pattern Petrvs

Doc principal: `back-end/docs/repository-pattern.md`.

## Objetivos

- Isolar acesso Eloquent de Services e lógica de domínio.
- Padronizar acesso a dados de leitura/escrita.
- Manter otimização de queries localizada.
- Facilitar testes por meio de contracts e DTOs.

## Estrutura

- Repository base de leitura: `App\Repository\Eloquent\AbstractEloquentReadRepository`.
- Repository base de escrita: `App\Repository\Eloquent\AbstractEloquentWriteRepository`.
- Contracts: `App\Repository\<Modulo>\Contracts`.
- Implementações Eloquent: `App\Repository\<Modulo>\Eloquent`.
- Facade de domínio opcional: `App\Repository\<Modulo>Repository`.
- Bindings: `App\Providers\RepositoryServiceProvider`.

## Criação

Use o gerador pelo container PHP:

```bash
docker exec petrvs_php sh -lc "cd /var/www && php artisan make:repository <Model>Repository"
```

Use `--read=false` ou `--write=false` somente quando o módulo realmente precisar de apenas um lado.

## Regras

- Services consomem contracts ou uma facade de repository de domínio, não detalhes crus de query.
- Estenda `AbstractEloquentReadRepository` ou `AbstractEloquentWriteRepository` para operações genéricas.
- Adicione métodos expressivos para queries específicas de domínio, como `findByCpfAndMatricula`.
- Retorne DTOs para dados compostos com múltiplos campos.
- Evite arrays associativos soltos quando o shape de retorno for significativo.
- Registre todo novo binding de contract no `RepositoryServiceProvider`.
- Adicione testes focados. Repositories com dados tenant normalmente precisam de `tests/IntegrationTenant/Repository`.

## Checklist De Review

- Contracts expõem apenas os métodos necessários aos consumidores.
- Implementações honram assinaturas e tipos de retorno dos contracts.
- Métodos de query evitam N+1 e carregam apenas relations necessárias.
- DTOs são tipados e ficam em `App\DTOs\<Modulo>`.
- Provider bindings resolvem interfaces para implementações Eloquent.
- PHPStan passa nos paths de repository alterados.
