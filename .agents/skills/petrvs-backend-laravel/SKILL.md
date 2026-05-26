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

## Portão De Qualidade Backend

- Mudança só em documentação: não rode Pest/PHPStan, salvo se a documentação incluir comandos ou exemplos que precisam ser conferidos.
- Mudança só em teste: rode o teste alterado e amplie apenas se tocar fixture/helper compartilhado.
- Mudança em Service, Job, Command ou regra de negócio: rode teste focado do comportamento e PHPStan nos paths alterados.
- Mudança em SIAPE, tenancy ou lotação: rode teste IntegrationTenant relacionado, teste unitário de colaborador afetado quando existir e PHPStan focado.
- Mudança em Repository: rode teste de integração/repository relacionado, PHPStan no repository e no service consumidor; confirme contracts/bindings quando houver alteração estrutural.
- Mudança em migration tenant: avalie se `database/schema/test-tenant-schema.sql` precisa ser regenerado e rode teste tenant afetado.
- Mudança em código compartilhado: amplie de teste focado para suites relacionadas conforme o alcance.
- Se um teste de regressão reproduz falha real, corrija com o menor impacto e repita o teste que falhou antes de ampliar validação.

## Cuidados Backend

- Rode todos os comandos backend via `petrvs_php`; nunca rode ferramentas backend no host.
- Testes Unit não podem tocar no banco.
- Comportamento tenant-aware pertence a `tests/IntegrationTenant`.
- Mudanças em repository devem seguir a referência de repository e atualizar bindings.
- Áreas sensíveis de segurança: autorização, isolamento tenant, CPF/dados pessoais, payloads SIAPE, downloads, SQL bruto, mass assignment e logs.
- Métodos de Service com 2+ escritas devem usar `DB::transaction`. Validações e leituras ficam fora da transação, apenas escritas dentro. Ver `back-end/AGENTS.md` seção "Regras de Transação".
