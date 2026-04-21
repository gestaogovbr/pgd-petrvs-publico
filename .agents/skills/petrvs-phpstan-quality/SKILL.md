---
name: petrvs-phpstan-quality
description: Use ao corrigir ou revisar achados PHPStan/Larastan do Petrvs-PGD, tipos PHPDoc, avisos de relações Eloquent, variáveis indefinidas, chaves duplicadas de validação, generics de repository ou qualidade de análise estática.
---

# Qualidade PHPStan Petrvs

## Referências

- Leia `back-end/AGENTS.md`.
- Carregue `../petrvs-backend-laravel/references/phpstan.md`.
- Carregue `../petrvs-backend-laravel/references/commands.md`.

## Fluxo

1. Rode ou inspecione a saída PHPStan para o menor path alterado.
2. Confirme se cada achado é bug real, type hint ausente, problema de PHPDoc ou limitação de inferência do Larastan.
3. Prefira correções que preservem comportamento.
4. Adicione tipos nativos e PHPDocs válidos quando eles esclarecerem contratos reais.
5. Para avisos de relation, inspecione a relação no model e a cadeia da query antes de editar.
6. Rode PHPStan de novo no mesmo path; amplie o escopo somente quando código compartilhado mudar.

## Cuidados

- Não adicione suppressions antes de tentar uma correção real.
- Não mude comportamento de domínio apenas para silenciar análise.
- Não afrouxe tipos para `mixed` salvo quando o limite for realmente dinâmico.
- Mantenha arrays de validação sem chaves duplicadas e variáveis indefinidas.
