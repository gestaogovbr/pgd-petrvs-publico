---
name: petrvs-code-review
description: Use ao revisar mudanças recentes Laravel ou Angular do Petrvs-PGD antes de merge, especialmente back-end, com postura Tech Lead, validação obrigatória de Repository Pattern, segurança, performance, tenancy, SIAPE, testes, PHPStan e manutenibilidade.
---

# Revisão de Código Petrvs

## Objetivo

Revisar as últimas alterações do código, ou o diff/arquivos indicados pelo usuário, com foco em qualidade, segurança, arquitetura e manutenibilidade. A revisão deve ser técnica, objetiva, acionável e focada nas mudanças recentes, não no sistema inteiro.

## Preparação no Codex

1. Leia `AGENTS.md` e o `AGENTS.md` do diretório afetado.
2. Se o escopo for back-end, leia também as referências necessárias:
   - `../petrvs-backend-laravel/references/repository-pattern.md`
   - `../petrvs-backend-laravel/references/testing.md`
   - `../petrvs-backend-laravel/references/phpstan.md`
   - `../petrvs-backend-laravel/references/siape.md`, quando houver SIAPE, unidades, gestores, lotação, servidores ou integrações.
3. Se o usuário não fornecer diff/arquivos, inspecione as mudanças recentes com `git status --short`, `git diff --stat`, `git diff` e, se houver staged changes, `git diff --cached`.
4. Use referências de arquivo e linha nos achados. Abra os arquivos alterados com numeração de linha quando necessário.

## Regra Arquitetural Absoluta de Back-End

O back-end usa Repository Pattern de forma obrigatória. Toda operação de banco deve passar por Repository, com separação entre leitura e escrita:

- RepositoryRead para leitura.
- RepositoryWrite para escrita.

É proibido flexibilizar esse padrão em código de produção alterado. Não relativize com frases como "dentro do padrão atual está OK" ou "pode ser aceitável".

## Validação Obrigatória de Transações

Para cada método de Service alterado:

1. Conte as operações de escrita (create, update, delete, insert, save, destroy, `atualizaStatus`).
2. Se houver 2 ou mais escritas sem `DB::transaction`, classifique como `MAJOR`.
3. Verifique que validações e leituras ficam FORA da transação.
4. Verifique que a transação está no Service, não no Controller nem no Repository.

## Validação Obrigatória de Repository

Para cada alteração de back-end analisada:

1. Identifique onde Repository foi usado corretamente.
2. Identifique onde Repository não foi usado.
3. Identifique acessos diretos a Model/Eloquent/DB.

Se houver acesso direto a banco fora de Repository, classifique como `BLOCKER`, explique qual Repository deveria ser usado e sugira a correção.

Execute a detecção automática nos arquivos PHP alterados:

```bash
rg -n -- '->where\(|::query\(|::create\(|::update\(|DB::table\(' <arquivos-php-alterados>
```

Qualquer ocorrência desses padrões fora de Repository deve ser marcada automaticamente como `BLOCKER`.

## Pipeline de Review

Execute a revisão nesta ordem:

1. Correctness e bugs: erros reais ou potenciais, null pointer, edge cases não tratados, exceções silenciosas e problemas de fluxo lógico.
2. Arquitetura e padrões: SOLID, Service Layer, DTOs quando necessários, Repository Pattern e acesso a dados.
3. Segurança: dados sensíveis, validação, autorização, SQL injection, mass assignment, sanitização e limites tenant.
4. Performance: N+1, loops desnecessários, queries sem índice provável e processamento evitável.
5. Testabilidade: cobertura ausente, acoplamento que dificulta mocks e falta de testes para regras críticas.
6. Code smells e clean code: ifs aninhados, `else` desnecessário, métodos longos, baixa legibilidade e múltiplas responsabilidades.
7. Boas práticas específicas: números mágicos, falta de enum/constante, duplicação e tipagem fraca.
8. Ferramentas simuladas: simule PHPStan/Larastan e testes, apontando inconsistências de tipo, código morto, testes que provavelmente quebrariam e testes faltantes.

## Severidades

- `BLOCKER`: impede merge por bug, segurança ou quebra arquitetural crítica.
- `CRITICAL`: alto risco de impacto em produção ou performance grave.
- `MAJOR`: problema relevante, mas sem bloqueio imediato.
- `MINOR`: melhoria de qualidade.
- `NITPICK`: ajuste cosmético.

## Scoring

Calcule nota geral de 0 a 100:

- Arquitetura: 25 pontos.
- Qualidade de código: 20 pontos.
- Segurança: 20 pontos.
- Performance: 15 pontos.
- Testabilidade: 10 pontos.
- Boas práticas: 10 pontos.

Explique rapidamente a nota. Se houver qualquer `BLOCKER`, o veredito final deve ser `REJECTED`.

## Formato da Resposta

Use português brasileiro. Seja direto, técnico e priorize impacto real.

### Resumo Executivo

- O que foi analisado.
- Principais riscos.

### Problemas Encontrados

Para cada problema:

- Título.
- Severidade.
- Arquivo e linha.
- Explicação técnica.
- Impacto.
- Sugestão de correção.

Se não houver problemas, diga claramente que não encontrou achados bloqueantes/relevantes e informe os riscos residuais ou lacunas de teste.

### Validação de Repository

- Onde Repository foi usado corretamente.
- Onde houve violação ou confirmação de ausência de violação.
- Resultado da busca obrigatória por padrões proibidos.

### Simulação de Ferramentas

- PHPStan/Larastan: riscos prováveis.
- Testes: testes que deveriam existir, testes que poderiam quebrar e comandos recomendados.

### Score Final

- Nota: `X/100`.
- Justificativa curta.

### Veredito

- `REJECTED`: possui `BLOCKER`.
- `APPROVED WITH CHANGES`: sem `BLOCKER`, mas com `CRITICAL` ou `MAJOR`.
- `APPROVED`: seguro para merge.

### Sugestões Extras

- Melhorias não obrigatórias, sem reescrever todo o código.

## Checklist Front-End

Quando o diff for front-end puro, mantenha a mesma postura de review e avalie:

- Angular 21, NgModules existentes, tipagem estrita e ausência de `any` desnecessário.
- Renderização segura para dados do servidor, sanitização e ausência de DOM perigoso.
- Subscriptions gerenciadas e fluxos RxJS tipados.
- Limites de modules, components compartilhados, services e models.
- Testes Jasmine/Karma relevantes para mudança de comportamento.
