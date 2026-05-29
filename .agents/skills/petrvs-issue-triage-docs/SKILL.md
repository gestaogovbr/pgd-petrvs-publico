---
name: petrvs-issue-triage-docs
description: Use ao transformar issues do Petrvs-PGD em documentação em docs/issues, organizando contexto, hipóteses confirmadas, hipóteses secundárias e cenários ainda não resolvidos antes de partir para testes ou correções.
---

# Petrvs Issue Triage Docs

## Objetivo

Criar ou atualizar documentação em `docs/issues/issue-XXXX-*.md` para registrar entendimento do problema antes de implementar testes ou correções.

Esta skill não cria testes e não altera código de produção. Ao final, pergunte ao usuário se deseja seguir para a etapa de testes/regressão com `petrvs-issue-regression-tests`.

## Fluxo

1. Identifique os números das issues e confirme ambiguidades relevantes.
2. Inspecione o padrão atual de `docs/issues`.
3. Leia contexto disponível: descrição da issue, comentários informados pelo usuário, código relacionado e testes existentes quando necessário para entender hipóteses.
4. Crie ou atualize o arquivo `docs/issues/issue-XXXX-slug-curto.md`.
5. Separe claramente:
   - Problema relatado.
   - Entendimento atual.
   - Hipótese confirmada.
   - Hipótese secundária.
   - Cenário não resolvido ou conflitante.
   - Critérios de aceite sugeridos.
   - Próximos testes propostos.
6. Ao final, diga o que foi documentado e pergunte se o usuário quer avançar para testes E2E backend tenant.

## Padrão De Escrita

- Português do Brasil.
- Markdown conciso e factual.
- Não exponha dados pessoais reais; use dados sintéticos ou mascarados.
- Diferencie fato observado de inferência.
- Não marque hipótese como confirmada sem evidência de código, teste, log ou reprodução.
- Quando uma regra atual conflitar com um cenário real, registre como pendência explícita, não como bug já corrigido.

## Limites

- Não publique comentários em GitHub; use `petrvs-issue-commenter` para isso.
- Não implemente testes; use `petrvs-issue-regression-tests` depois da confirmação do usuário.
- Não altere código de produção nesta etapa.
