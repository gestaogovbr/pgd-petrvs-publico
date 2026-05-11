---
name: petrvs-pest-testing
description: Use ao escrever, migrar, depurar ou revisar testes backend do Petrvs-PGD com Pest, Mockery, testes Unit sem acesso a banco, Integration ou IntegrationTenant.
---

# Testes Pest Petrvs

## Referências

- Leia `back-end/AGENTS.md`.
- Carregue `../petrvs-backend-laravel/references/testing.md`.
- Carregue `../petrvs-backend-laravel/references/commands.md` antes de rodar testes.

## Fluxo

1. Classifique o comportamento: lógica pura, banco central ou banco tenant.
2. Use `tests/Unit` para lógica pura e faça mock de todo limite com banco.
3. Use `tests/Integration` para comportamento de banco central.
4. Use `tests/IntegrationTenant` para regras tenant e repositories tenant.
5. Prefira expectations Pest focadas e casos de teste pequenos.
6. Mantenha fixtures mínimas e relevantes para o domínio.
7. Rode primeiro o arquivo de teste focado e depois suites se o risco justificar.

## Regras De Teste Unit

- Nada de `Schema::create`.
- Nada de `DB::table(...)->insert`.
- Nada de `RefreshDatabase`.
- Nada de persistência real de model.
- Use Mockery para models, repositories, services, facades e seams legados parciais.

## Regras De Integration

- `Tests\DatabaseTestCase` é para integração com banco central.
- `Tests\DatabaseTenantTestCase` inicializa contexto tenant automaticamente para `IntegrationTenant`.
- Migrations tenant exigem verificar `database/schema/test-tenant-schema.sql`.
