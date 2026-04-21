---
name: petrvs-code-review
description: Use ao revisar mudanças Laravel ou Angular do Petrvs-PGD antes de merge, com foco em segurança, performance, tenancy, impacto SIAPE, padrões de repository, testes, PHPStan e manutenibilidade.
---

# Code Review Petrvs

## Postura De Review

- Comece pelos achados, ordenados por severidade.
- Fundamente cada achado com referência de arquivo e linha.
- Priorize bugs, riscos de segurança, vazamento de dados, problemas de limite tenant, falhas de autorização, queries N+1, comportamento SIAPE frágil e testes ausentes.
- Mantenha o resumo como informação secundária e breve.

## Checklist Backend

- Autorização, validação, escopo tenant, mass assignment, SQL injection e exposição de CPF/dados pessoais.
- Services e repositories seguem os limites do Petrvs.
- DTOs são usados para retornos compostos.
- Queries evitam N+1 e carregamentos amplos desnecessários.
- Mudanças SIAPE preservam logs, lotacao, gestor, unidade, servidor e comportamento tenant.
- Cobertura Pest acompanha o risco; testes Unit não tocam no banco.
- PHPStan/Larastan provavelmente passa nos paths alterados.

## Checklist Frontend

- Padrões Angular 21, tipagem estrita e nenhum `any` desnecessário.
- Renderização segura e sanitização para dados do servidor.
- Subscriptions são gerenciadas; fluxos RxJS são tipados.
- Limites de modules e components compartilhados são respeitados.

## Referências

- Use `../petrvs-backend-laravel/references/testing.md` para expectativas de testes.
- Use `../petrvs-backend-laravel/references/repository-pattern.md` para mudanças em repository.
- Use `../petrvs-backend-laravel/references/siape.md` para mudanças SIAPE.
