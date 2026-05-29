---
name: petrvs-issue-regression-tests
description: Use após a triagem/documentação de uma issue do Petrvs-PGD quando o usuário autorizar criar testes de regressão, especialmente E2E backend tenant em IntegrationTenant, sem alterar produção até um teste reproduzir a falha.
---

# Petrvs Issue Regression Tests

## Entrada

Use esta skill depois que a issue já tiver contexto documentado ou hipóteses claras. Se a etapa de documentação ainda não foi feita, sugira começar com `petrvs-issue-triage-docs`.

## Regra Central

Não altere código de produção até que um teste reproduza a falha ou até que o usuário autorize explicitamente uma correção sem reprodução.

## Fluxo

1. Leia `AGENTS.md`, `back-end/AGENTS.md` e a documentação da issue em `docs/issues`.
2. Inspecione testes existentes antes de criar arquivo novo.
3. Para comportamento tenant, use `back-end/tests/IntegrationTenant` com `Tests\DatabaseTenantTestCase`.
4. Prefira E2E de backend tenant: services reais, banco tenant real e dependências externas simuladas por fixtures/arrays/XML controlados.
5. Nomeie testes com `issue XXXX - descricao do cenario`.
6. Crie fixtures mínimas, sintéticas e determinísticas.
7. Execute primeiro o teste focado.
8. Se o teste falhar reproduzindo o problema, apresente o resultado ao usuário e proponha a menor correção.
9. Se o teste passar, registre que o cenário parece coberto ou já resolvido.
10. Se um cenário real conflitar com regra atual, remova/evite teste quebrado permanente e registre TODO/FIXME explicando o conflito.

## Qualidade

- Rode comandos de backend somente via `petrvs_php`.
- Para SIAPE local indisponível, simule dados externos com fixtures determinísticas.
- Depois de alteração de produção autorizada, rode:
  - Teste focado da issue.
  - Testes relacionados.
  - PHPStan focado nos paths alterados.
- Não regenere `database/schema/test-tenant-schema.sql` sem migration tenant.
- Não modifique testes unitários existentes salvo incompatibilidade real e analisada.

## Relato Ao Usuário

Ao finalizar a etapa de testes, informe:

- Cenários criados.
- Quais passaram.
- Quais falharam.
- Se houve evidência suficiente para corrigir.
- Próximo passo recomendado.
