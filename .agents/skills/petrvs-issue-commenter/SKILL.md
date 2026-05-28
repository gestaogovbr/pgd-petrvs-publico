---
name: petrvs-issue-commenter
description: Use ao redigir ou publicar comentários em issues GitHub do Petrvs-PGD, especialmente comentários de status, investigação, correção, testes adicionados, pendências ou explicações para público não técnico. Sempre exige aprovação explícita do usuário antes de publicar.
---

# Petrvs Issue Commenter

## Regra Central

Nunca publique comentário em issue sem aprovação explícita do usuário.

Primeiro entregue um rascunho e aguarde uma resposta clara como "aprovado", "pode publicar", "publique" ou equivalente. Se houver dúvida, não publique.

## Fluxo

1. Identifique issue, público e objetivo do comentário.
2. Se necessário, consulte o contexto local, docs em `docs/issues`, testes, diff e comentários anteriores da issue.
3. Escreva um rascunho em português do Brasil, objetivo e pouco técnico.
4. Explique o impacto em linguagem de equipe/produto/suporte.
5. Peça validação do usuário antes de chamar qualquer ferramenta do GitHub.
6. Após aprovação, publique exatamente o texto aprovado ou avise antes se precisar alterar algo.

## Estilo

- Use tom claro, direto e colaborativo.
- Evite nomes internos de classes, métodos, tabelas e comandos quando o público não for técnico.
- Prefira frases curtas.
- Quando explicar bug/correção, use estrutura simples:
  - O que foi identificado.
  - Quando acontecia.
  - Exemplo simplificado.
  - O que foi corrigido.
  - Quais testes foram adicionados.
- Não exponha CPF, matrícula real, dados pessoais ou payload sensível.
- Se houver pendência futura, diga de forma honesta e sem prometer prazo.

## Publicação

- Use GitHub apenas depois da aprovação.
- Para PRs, comente como issue quando for comentário geral.
- Não envie review comments de código salvo se o usuário pedir isso explicitamente.
