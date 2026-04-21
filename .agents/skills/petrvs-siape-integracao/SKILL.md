---
name: petrvs-siape-integracao
description: Use para trabalho de integração SIAPE no Petrvs-PGD envolvendo unidades, servidores, gestores, chefia, lotacao, matricula, fontes SIAPE local/API, SiapeLog, resumo de processamento ou fluxos tenant-aware.
---

# Petrvs SIAPE Integracao

## Referências

- Leia `back-end/AGENTS.md`.
- Carregue `../petrvs-backend-laravel/references/siape.md`.
- Carregue `../petrvs-backend-laravel/references/testing.md` para escolhas de validação.
- Carregue `../petrvs-backend-laravel/references/repository-pattern.md` ao mover persistência para trás de repositories.

## Fluxo

1. Identifique se a mudança afeta unidade, servidor, gestor, lotacao, matricula, logs, routes, jobs ou estado tenant.
2. Inspecione services e testes SIAPE existentes antes de editar.
3. Preserve compatibilidade de métodos públicos em services legados de integração, salvo pedido explícito de refactor com quebra.
4. Mantenha comportamento de logging/auditoria visível via `SiapeLog` ou pelo caminho de log existente.
5. Proteja CPF e dados pessoais em logs, testes e responses.
6. Adicione testes Unit para lógica pura de normalização/roteamento e testes IntegrationTenant para persistência tenant.
7. Rode Pest focado e PHPStan nos paths SIAPE alterados.

## Cuidados

- Não remova comportamento de fallback entre arquivos locais e fontes API sem escopo explícito.
- Não assuma que CPF sozinho identifica o servidor correto quando matricula ou código da unidade de exercício fizer parte da regra.
- Não contorne o contexto tenant para dados de negócio tenant.
