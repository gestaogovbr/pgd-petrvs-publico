# Checklist de Refatoração da Modalidade PGD

## Objetivo

Simplificar a modalidade PGD para um campo textual nullable, removendo a dependência das tabelas `tipos_modalidades` e `tipos_modalidades_siape`.

## Decisões

- [x] A coluna final de usuário é `usuarios.modalidade_pgd`.
- [x] `usuarios.modalidade_pgd`, `planos_trabalhos.modalidade_pgd` e `entidades.modalidade_pgd_padrao` são `string(50)` nullable.
- [x] `usuarios.modalidade_pgd` reflete diretamente `integracao_servidores.modalidade_pgd`.
- [x] `null` representa ausência real de informação SIAPE.
- [x] Não há fallback obrigatório para "Sem dados do SIAPE".
- [x] Migrations históricas permanecem no repositório.
- [x] A nova migration tenant leva o schema ao estado final e remove as tabelas auxiliares.

## Migração Tenant

- [x] Adicionar `usuarios.modalidade_pgd`.
- [x] Adicionar `planos_trabalhos.modalidade_pgd`.
- [x] Adicionar `entidades.modalidade_pgd_padrao`.
- [x] Backfill de usuários por `integracao_servidores` preferindo matrícula e depois CPF.
- [x] Backfill de usuários pelo mapeamento antigo quando não houver dado de integração.
- [x] Backfill de planos de trabalho e entidades pelo nome SIAPE quando houver mapeamento.
- [x] Remover FKs antigas de usuários, planos, entidades e mapeamento SIAPE.
- [x] Dropar `tipo_modalidade_id` de usuários, planos e entidades.
- [x] Dropar `tipos_modalidades_siape` antes de `tipos_modalidades`.
- [x] Atualizar `database/schema/test-tenant-schema.sql`.

## Back-end Laravel

- [x] Remover model, service, controller, repository, route, enum, factory e seeder de TipoModalidade.
- [x] Criar helper de domínio `App\Support\ModalidadePgd`.
- [x] Normalizar labels conhecidos: `presencial`, `parcial`, `integral`, `no exterior`, `no exterior substituicao`.
- [x] Manter valores desconhecidos como texto bruto.
- [x] Exibir `null` como "Não definida".
- [x] Atualizar `UsuarioService`, SIAPE e processamento de atualização para `modalidade_pgd`.
- [x] Atualizar `PlanoTrabalho`, `Entidade`, `PlanoTrabalhoService` e datasets.
- [x] Atualizar relatórios para filtrar por `modalidade_pgd`.
- [x] Manter aliases de compatibilidade de relatório `tipo_modalidade_id` e `tipoModalidadeNome` quando consumidos pelo front.
- [x] API PGD mapeia modalidade textual para códigos: presencial = 1, parcial = 2, integral = 3, no exterior substituicao = 4, no exterior = 5.
- [x] Valor inválido continua gerando erro de exportação.

## Front-end Angular

- [x] Remover `TipoModalidadeDaoService`, models e módulo de cadastro `cadastros/tipo-modalidade`.
- [x] Remover rota/menu/EntityService do cadastro de tipo de modalidade.
- [x] Atualizar models `Usuario`, `PlanoTrabalho` e `Entidade`.
- [x] Criar `ModalidadePgdService` com labels/regras equivalentes ao back-end.
- [x] Formulário de plano de trabalho usa `modalidade_pgd` textual e permite null.
- [x] Seleção de usuário preenche modalidade textual do usuário.
- [x] Regra de pedágio força `presencial` quando aplicável.
- [x] Listagens, filtros, relatórios, TCR, atividade e logs deixam de usar busca por TipoModalidade.

## Relatórios e Interfaces

- [x] `Usuario` expõe `modalidade_pgd` e `modalidade_pgd_label`.
- [x] `PlanoTrabalho` expõe `modalidade_pgd` e `modalidade_pgd_label`.
- [x] `Entidade` usa `modalidade_pgd_padrao`.
- [x] Relatório de agente filtra por `modalidade_pgd`.
- [x] Relatório de plano de trabalho filtra por `modalidade_pgd`.
- [x] Exports continuam exibindo coluna "Modalidade" por label calculado.

## Testes

- [x] Teste de helper/API PGD para mapeamento textual e erro de modalidade inválida.
- [x] Teste de schema tenant final sem tabelas/colunas antigas.
- [x] Testes SIAPE e usuário ajustados para `modalidade_pgd` nullable/textual.
- [x] Testes de serviço ajustados para não criar `tipos_modalidades`.
- [x] Executar Pest focado:
  `docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest tests/IntegrationTenant/Migrations tests/IntegrationTenant/Services tests/Unit/Services"`
- [x] Executar PHPStan:
  `docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"`
- [x] Executar lint do front:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && npm run lint"`
- [x] Executar build do front:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && npm run build"`

## Observações de Deploy

- [ ] Validar backup antes da migration em ambientes com dados reais.
- [ ] Validar amostragem de usuários com `modalidade_pgd` preenchida por matrícula, por CPF e por fallback antigo.
- [ ] Validar exports de agente e plano de trabalho após migration.
- [ ] Validar envio API PGD em plano presencial, parcial, integral e exterior.
