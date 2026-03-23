---
name: "petrvs-code-review"
description: "Reviews Laravel and Angular code for security, performance, and Petrvs standards. Invoke when the user requests a code review or before merging Petrvs changes."
---

# Petrvs Code Review (Laravel + Angular)

## Objetivo

Realizar revisão técnica de código em projetos Petrvs com foco em **segurança** e **performance**, cobrindo **back-end Laravel** e **front-end Angular**.

## Quando usar

- Quando o usuário pedir revisão de código.
- Antes de abrir ou mesclar PRs com mudanças relevantes em Laravel ou Angular.
- Após alterações sensíveis de autenticação, permissões, queries, serviços, ou módulos críticos.

## Escopo da revisão

### Laravel (Back-end)

- Segurança: validações, autorização, exposição de dados, mass assignment, consultas inseguras.
- Performance: N+1, índices, eager loading, queries complexas, uso de cache.
- Arquitetura Petrvs: Services, Repositories, Eloquent Resources, SOLID.
- Padrões: tipagem, DTOs, políticas, relações, migrations, testes (Pest).

### Angular (Front-end)

- Segurança: sanitização, exposição de dados sensíveis, uso correto de guards.
- Performance: change detection, async pipes, memórias, subscriptions, lazy loading.
- Qualidade: RxJS, tipagem estrita, evitar any, organização de módulos/serviços.
- Padrões Petrvs: estrutura de pastas, convenções de componentes e serviços.

## Checklist base

- O código respeita padrões Petrvs?
- Há riscos de segurança (auth, validação, acesso a dados)?
- Há problemas de performance (queries, loops, renderização, subscriptions)?
- Há testes adequados para mudanças críticas?

## Formato da resposta

- Resumo com achados principais.
- Lista de riscos por severidade (Alta, Média, Baixa).
- Recomendações objetivas com referências ao arquivo/linha.

## Como executar a revisão

1. Identificar escopo da mudança (arquivos e módulos afetados).
2. Revisar diffs e contexto do domínio.
3. Validar segurança e performance.
4. Sugerir melhorias e pontos de atenção.
