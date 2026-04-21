---
name: petrvs-repository-pattern
description: Use ao criar, refatorar, revisar ou testar repositories backend do Petrvs-PGD, contracts de repository, implementações Eloquent, retornos DTO ou bindings no RepositoryServiceProvider.
---

# Repository Pattern Petrvs

## Referências

- Leia `back-end/AGENTS.md`.
- Carregue `../petrvs-backend-laravel/references/repository-pattern.md`.
- Carregue `../petrvs-backend-laravel/references/testing.md` ao adicionar ou ajustar testes.
- Carregue `../petrvs-backend-laravel/references/commands.md` antes de rodar comandos.

## Fluxo

1. Inspecione o model, repositories existentes de módulos próximos, consumidores e provider bindings.
2. Para um novo repository, use:
   `docker exec petrvs_php sh -lc "cd /var/www && php artisan make:repository <Model>Repository"`
3. Mantenha contracts estreitos e expressivos.
4. Coloque comportamento genérico de read/write nos repositories Eloquent de read/write.
5. Use uma facade de repository de domínio somente quando isso simplificar o consumo por services.
6. Use DTOs para dados compostos de retorno.
7. Registre bindings no `RepositoryServiceProvider`.
8. Adicione testes focados, normalmente em `tests/IntegrationTenant/Repository` para dados tenant.
9. Rode Pest focado e PHPStan nos paths alterados de repository/provider.

## Cuidados

- Não injete repositories diretamente em controllers, salvo se o módulo ao redor já fizer isso em um caso read-only estreito.
- Não retorne arrays associativos grandes para shapes de domínio estáveis.
- Não duplique lógica de query em Services quando um método de repository for o limite mais claro.
