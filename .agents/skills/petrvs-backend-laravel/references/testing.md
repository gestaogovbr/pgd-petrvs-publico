# Referência De Testes Petrvs

Docs principais: `back-end/docs/pest.md` e `back-end/docs/pest-bd.md`.

## Testes Unit

- Diretório: `back-end/tests/Unit`.
- Framework: Pest com Mockery.
- Objetivo: lógica isolada de service/domínio.
- Sem interação com banco.
- Não use `Schema::create`, `DB::table(...)->insert`, `RefreshDatabase`, setup tenant ou persistência real de model.
- Faça mock de models, services, facades e repositories. Use partial mocks somente quando necessário para isolar seams legados.
- Limpe Mockery com `afterEach` ou `afterAll` quando o padrão local do arquivo exigir.

## Testes Integration

- Diretório: `back-end/tests/Integration`.
- Classe base: `Tests\DatabaseTestCase`.
- Objetivo: comportamento de banco central, gestão de tenants, lógica global/admin.
- O banco de testes é forçado para `petrvs_test` via `phpunit.xml`.

## Testes IntegrationTenant

- Diretório: `back-end/tests/IntegrationTenant`.
- Classe base: `Tests\DatabaseTenantTestCase`.
- Objetivo: regras de negócio tenant, repositories tenant, fluxos SIAPE tenant e comportamento de model contra schema tenant.
- Contexto tenant é inicializado automaticamente.
- Schema tenant carrega de `database/schema/tenant-schema.sql` quando disponível.
- Se uma migration tenant alterar schema, avalie se `tenant-schema.sql` deve ser regenerado.

## Escolhendo A Suite

- Lógica pura com dependências mockadas: `tests/Unit`.
- Comportamento SaaS/admin/banco central: `tests/Integration`.
- Comportamento de domínio tenant ou repositories tenant: `tests/IntegrationTenant`.
- Mudanças apenas de delegação em controller normalmente não exigem novos testes, salvo alteração de comportamento.

## Comandos

```bash
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --ci"
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest tests/Unit/Services/ExampleTest.php"
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --testsuite=IntegrationTenant"
```

## Alvos De Limpeza Legada

`back-end/docs/refactoring_tasks.md` lista testes que ainda precisam migrar de Unit tests que tocam no banco ou estilo PHPUnit. Ao tocar nesses arquivos, aproxime-os de Pest + Mockery + zero interação com banco.
