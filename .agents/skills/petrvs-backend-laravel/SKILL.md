---
name: petrvs-backend-laravel
description: Use ao implementar, refatorar, depurar ou revisar backend Laravel do Petrvs-PGD, especialmente Services, Controllers, Jobs, Commands, Models, DTOs, tenancy, integrações SIAPE, testes Pest e validação PHPStan.
---

# Backend Laravel Petrvs

## Comece Por Aqui

1. Leia `AGENTS.md` e `back-end/AGENTS.md`.
2. Inspecione o código afetado antes de decidir. Use `rg` e leituras focadas de arquivos.
3. Carregue somente a referência que combina com a tarefa:
   - Comandos: `references/commands.md`
   - Testes: `references/testing.md`
   - Repositories: `references/repository-pattern.md`
   - PHPStan: `references/phpstan.md`
   - SIAPE: `references/siape.md`

## Fluxo

- Mantenha mudanças pequenas e alinhadas aos padrões Laravel existentes.
- Deixe tratamento de request/response em controllers e regras de negócio em Services ou colaboradores focados.
- Prefira contracts, DTOs, repositories, validators, policies, resources e jobs quando o código existente já usar esses padrões.
- Preserve contexto tenant e comportamento de logs/auditoria.
- Adicione ou ajuste testes para comportamento alterado, salvo mudança puramente de delegação em controller.
- Valide com o comando Pest mais estreito relevante e PHPStan no path alterado.

## Cuidados Backend

- Rode todos os comandos backend via `petrvs_php`; nunca rode ferramentas backend no host.
- Testes Unit não podem tocar no banco.
- Comportamento tenant-aware pertence a `tests/IntegrationTenant`.
- Mudanças em repository devem seguir a referência de repository e atualizar bindings.
- Áreas sensíveis de segurança: autorização, isolamento tenant, CPF/dados pessoais, payloads SIAPE, downloads, SQL bruto, mass assignment e logs.
- Métodos de Service com 2+ escritas devem usar `DB::transaction`. Validações e leituras ficam fora da transação, apenas escritas dentro. Ver `back-end/AGENTS.md` seção "Regras de Transação".
