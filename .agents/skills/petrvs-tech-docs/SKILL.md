---
name: petrvs-tech-docs
description: Use ao criar ou atualizar documentação técnica do Petrvs-PGD, ADRs, contratos de API, notas de arquitetura, runbooks, docs de fluxos SIAPE, docs de testes ou notas técnicas de release/PR.
---

# Documentação Técnica Petrvs

## Fluxo

1. Identifique o público-alvo: developer, reviewer, operador ou stakeholder de produto.
2. Inspecione a implementação e docs existentes antes de escrever.
3. Mantenha Markdown conciso, factual e alinhado ao comportamento atual do repo.
4. Para decisões arquiteturais, use formato ADR: título, status, contexto, decisão e consequências.
5. Para APIs, documente route, request, response de sucesso, response de erro, status codes e notas de compatibilidade.
6. Para operação, documente comando, ambiente, sintomas de falha, diagnóstico e caminho de rollback ou recuperação.

## Áreas De Foco Petrvs

- Arquitetura backend Laravel, repositories, DTOs, tenancy, queues, jobs, SIAPE, logs, Pest e PHPStan.
- Comportamento de module/service/component Angular 21 ao documentar mudanças UI.
- Impactos de segurança e performance, especialmente escopo tenant e dados pessoais.

## Referências

- Use `../petrvs-backend-laravel/references/commands.md` para comandos.
- Use `../petrvs-backend-laravel/references/testing.md` para documentação de testes.
- Use `../petrvs-backend-laravel/references/siape.md` para docs SIAPE.
