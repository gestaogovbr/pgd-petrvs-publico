---
name: "petrvs-tech-docs"
description: "Creates technical documentation for Petrvs systems. Invoke when users ask for architecture, APIs, runbooks, or ADRs."
---

# Petrvs Technical Documentation (ADR + Markdown)

## Objetivo

Produzir documentação técnica completa para o ecossistema Petrvs, cobrindo **arquitetura**, **APIs/contratos**, **operação/runbooks** e **ADRs** quando houver decisões técnicas relevantes.

## Quando usar

- Quando o usuário pedir documentação técnica.
- Após mudanças relevantes de arquitetura, integrações, fluxos críticos ou contratos de API.
- Antes de release/merge quando for necessário registrar decisões e impactos.

## Formato padrão

### 1) Documentação em Markdown

- **Visão geral**: contexto do domínio, objetivos e principais fluxos.
- **Arquitetura**: módulos, camadas, serviços, integrações e dependências.
- **Fluxos críticos**: autenticação, permissões, regras de negócio.
- **APIs e contratos**: endpoints, payloads, exemplos, erros.
- **Operação**: setup, deploy, troubleshooting, métricas e alertas.
- **Testes e qualidade**: comandos, cobertura, padrões do time.

### 2) ADRs (Architecture Decision Records)

Criar ADRs quando houver:
- mudança estrutural relevante
- trade-offs significativos
- dependências novas ou impactantes

Formato sugerido:

- **Título**: decisão resumida
- **Status**: proposta | aceita | depreciada
- **Contexto**: problema e motivação
- **Decisão**: o que foi escolhido
- **Consequências**: impactos e riscos

## Checklist de qualidade

- Linguagem clara e objetiva
- Consistência com padrões Petrvs
- Segurança e performance documentadas
- Exemplos completos e atualizados

## Como executar

1. Identificar escopo e arquivos impactados.
2. Levantar fluxos e contratos envolvidos.
3. Redigir Markdown principal.
4. Criar ADRs quando necessário.
