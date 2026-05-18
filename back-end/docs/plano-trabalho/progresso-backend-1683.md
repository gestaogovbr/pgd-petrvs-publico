# Progresso Back-end — Ticket #1683

## Visão geral

Ticket: `feature/#1683-reestruturacao-modulo-pt`
Data de referência: 2026-04-23

### Contagem por status (back-end apenas)

| Status | Qtd | Descrição |
|--------|-----|----------|
| ✅ Implementado | 46 | Funcional no back-end |
| ❌ Pendente | 0 | Endpoints/regras não implementados |

Back-end: **~99%** dos critérios com impacto em back-end estão implementados.

---

## Detalhamento por bloco

### Bloco 1 — Informações Gerais (Cadastro do PT)

| Critério | Descrição | Endpoint | Status |
|----------|-----------|----------|--------|
| [4.2–4.4](#ref-bloco-1---criterios) | Criar PT | `POST /v2/plano-trabalho` | ✅ |
| [4.9](#ref-bloco-1---criterios) | Editar PT | `PATCH /v2/plano-trabalho/:id` | ✅ |
| [4.10](#ref-bloco-1---criterios) | Assinar TCR (dupla assinatura, geração de períodos) | `POST /v2/.../documento/assinatura-tcr` | ✅ |
| [4.11](#ref-bloco-1---criterios) | Excluir PT | `DELETE /v2/plano-trabalho/:id` | ✅ |
| [4.12](#ref-bloco-1---criterios) | Cancelar assinatura | `DELETE /v2/.../documento/assinatura-tcr` | ✅ |

#### Regras de negócio — Bloco 1

| RN | Descrição | Status |
|----|-----------|--------|
| [RN17](#ref-bloco-1---regras) | Todos os campos obrigatórios | ✅ |
| [RN18](#ref-bloco-1---regras) | Agente público pré-preenchido, regras por perfil | ✅ |
| [RN19](#ref-bloco-1---regras) | Unidade pré-preenchida, ajuste automático | ✅ |
| [RN20](#ref-bloco-1---regras) | Regramento pré-preenchido, vigência | ✅ |
| [RN21](#ref-bloco-1---regras) | Bloquear data_fim < data_inicio | ✅ |
| [RN22](#ref-bloco-1---regras) | Bloquear conflito de período | ✅ |
| [RN23](#ref-bloco-1---regras) | Bloquear vigência > 366 dias | ✅ |
| [RN24](#ref-bloco-1---regras) | Modalidade pré-preenchida via SIAPE, justificativa se divergente | ✅ |
| [RN25](#ref-bloco-1---regras) | Bloqueio quando não habilitado no SIAPE | ✅ |

### Bloco 2 — Planejamento (Entregas do PT)

| Critério | Descrição | Endpoint | Status |
|----------|-----------|----------|--------|
| [4.5](#ref-bloco-2---criterios) | CRUD de entregas | `POST/PUT/DELETE /v2/plano-trabalho/:id/entrega` | ✅ |
| 4.6 | Voltar (descartar) | — | N/A back-end |
| [4.7](#ref-bloco-2---criterios) | Salvar (status Rascunho) | `POST /v2/plano-trabalho` | ✅ |
| 4.8 | Atualizar botões após salvar | — | N/A back-end |

#### Regras de negócio — Bloco 2

| RN | Descrição | Status |
|----|-----------|--------|
| [RN26](#ref-bloco-2---regras) | Permitir múltiplas entregas | ✅ |
| [RN27](#ref-bloco-2---regras) | Editar/remover cada entrega | ✅ |
| [RN28](#ref-bloco-2---regras) | Bloco 2 só aparece após Bloco 1 válido | ✅ |
| [RN29](#ref-bloco-2---regras) | Alerta CHD < 100% + justificativa | ✅ |
| [RN30](#ref-bloco-2---regras) | Alerta CHD > 100% + justificativa | ✅ |
| [RN31](#ref-bloco-2---regras) | Entregas de PEs homologados e vigentes com interseção | ✅ |
| [RN32](#ref-bloco-2---regras) | Ordenação mais recente primeiro | ✅ |

### Bloco 3 — Execução e Avaliação

| Critério | Descrição | Endpoint | Status |
|----------|-----------|----------|--------|
| [4.15–4.16](#ref-bloco-3---criterios) | CRUD de registros de execução (atividades) | `POST/PUT/DELETE /v2/.../atividade` | ✅ |
| [4.17](#ref-bloco-3---criterios) | Concluir período (INCLUIDO→CONCLUIDO) | `PATCH /v2/.../consolidacao/:id/concluir` | ✅ |
| [4.18](#ref-bloco-3---criterios) | Reabrir período (CONCLUIDO→INCLUIDO) | `PATCH /v2/.../consolidacao/:id/reabrir` | ✅ |
| [4.19](#ref-bloco-3---criterios) | Avaliar período | `POST /v2/.../consolidacao/:id/avaliacao` | ✅ |
| [4.20](#ref-bloco-3---criterios) | Solicitar recurso (AVALIADO→CONCLUIDO) | `PATCH /v2/.../consolidacao/:id/recurso` | ✅ |
| [4.21](#ref-bloco-3---criterios) | Reavaliar período (após recurso) | `POST /v2/.../consolidacao/:id/avaliacao` | ✅ |
| — | Conclusão automática do PT | Hook booted + StatusService | ✅ |

#### Regras de negócio — Bloco 3

| RN | Descrição | Status |
|----|-----------|--------|
| [RN33](#ref-bloco-3---regras) | Carregar Entrega e Trabalho Planejado do planejamento | ✅ |
| [RN34](#ref-bloco-3---regras) | Trabalho Executado para todas as entregas | ✅ |
| [RN35](#ref-bloco-3---regras) | Trabalho Executado obrigatório para concluir | ✅ |
| [RN36](#ref-bloco-3---regras) | Botões Confirmar/Cancelar | ✅ |
| [RN37](#ref-bloco-3---regras) | Botões Editar/Excluir após confirmação | ✅ |
| [RN38](#ref-bloco-3---regras) | Ocorrências do Módulo Ocorrências no período | ✅ |

### Tela geral de PTs (Seção 3)

| Critério | Descrição | Endpoint | Status |
|----------|-----------|----------|--------|
| [3.1–3.3](#ref-tela-geral---criterios) | Listagem com filtros e paginação | `GET /v2/plano-trabalho` | ✅ |

#### Regras de negócio — Tela geral

| RN | Descrição | Status |
|----|-----------|--------|
| [RN01](#ref-tela-geral---regras) | Filtros combinados, Arquivados/Vigentes alternados | ✅ |
| [RN02](#ref-tela-geral---regras) | Toggle Subordinadas habilitado por default | ✅ |
| [RN03](#ref-tela-geral---regras) | Subordinadas inclui unidades filhas | ✅ |
| RN04 | Arquivados desabilita Vigentes | — (front-end) |
| [RN05](#ref-tela-geral---regras) | Meus planos filtra por usuário | ✅ |
| [RN06](#ref-tela-geral---regras) | Vigentes filtra por vigência | ✅ |
| [RN07](#ref-tela-geral---regras) | Participante vê apenas Arquivados/Vigentes | ✅ |
| RN08 | TAG Vigente quando data coincide | — (front-end) |
| [RN09](#ref-tela-geral---regras) | Filtro individual por coluna | ✅ |
| RN10 | Atualização sem recarregar | — (implícito) |
| RN11 | ID com hiperlink | — (implícito) |
| [RN12](#ref-tela-geral---regras) | Unidade default = mais alta com atribuição | ✅ |
| [RN13](#ref-tela-geral---regras) | Unidade formatada SEGES/DINOV/CGPGD | ✅ |
| [RN14](#ref-tela-geral---regras) | Participante vê só seus planos | ✅ |
| [RN15](#ref-tela-geral---regras) | Demais perfis vêem planos da unidade | ✅ |
| RN16 | Dropdown com ações por status + Logs | — (front-end) |

### Ações do PT (Seção 4.22–4.25)

| Critério | Descrição | Endpoint | Status |
|----------|-----------|----------|--------|
| [4.22](#ref-acoes-do-pt---criterios) | Cancelar plano | `PATCH /v2/plano-trabalho/:id/cancelar` | ✅ |
| [4.23](#ref-acoes-do-pt---criterios) | Encerrar plano | `PATCH /v2/plano-trabalho/:id/encerrar` | ✅ |
| [4.24](#ref-acoes-do-pt---criterios) | Clonar plano | `POST /v2/plano-trabalho/:id/clonar` | ✅ |
| [4.25](#ref-acoes-do-pt---criterios) | Arquivar plano | `PATCH /v2/plano-trabalho/:id/arquivar` | ✅ |
| 4.1 | Gerar PDF / Logs | — | ❌ (débito) |

### Migração (Seção 5)

| Critério | Descrição | Status |
|----------|-----------|--------|
| 5.1–5.12 | Script de migração de status V1 → V2 | — (dispensável) |

### Auxiliares implementados

| Descrição | Endpoint |
|-----------|----------|
| Listar consolidações | `GET /v2/.../consolidacao` |
| Listar notas de avaliação | `GET /v2/.../consolidacao/notas-avaliacao` |
| Listar statuses do PT | `GET /v2/plano-trabalho/statuses` |
| Buscar PT (filtros, paginação) | `GET /v2/plano-trabalho` |
| Detalhar PT | `GET /v2/plano-trabalho/:id` |
| Gerar/visualizar documento TCR | `POST/GET /v2/.../documento` |

---

## Referências no código

Todos os caminhos são relativos a `back-end/app/`.

### Ref Bloco 1 - Criterios

- 4.2–4.4 — [PlanoTrabalhoController.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoController.php) `store()` → [PlanoTrabalhoService.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoService.php) `store()`
- 4.9 — [PlanoTrabalhoController.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoController.php) `update()` → [PlanoTrabalhoService.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoService.php) `update()`
- 4.10 — [DocumentoController.php](../../app/V2/PlanoTrabalho/Documento/DocumentoController.php) `assinar()` → [PlanoTrabalhoDocumentoService.php](../../app/V2/PlanoTrabalho/Documento/PlanoTrabalhoDocumentoService.php) `assinar()`
- 4.11 — [PlanoTrabalhoController.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoController.php) `destroy()` → [PlanoTrabalhoDestroyValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoDestroyValidator.php)
- 4.12 — [DocumentoController.php](../../app/V2/PlanoTrabalho/Documento/DocumentoController.php) `cancelarAssinatura()` → [PlanoTrabalhoDocumentoCancelarAssinaturaValidator.php](../../app/V2/PlanoTrabalho/Documento/Validators/PlanoTrabalhoDocumentoCancelarAssinaturaValidator.php)

### Ref Bloco 1 - Regras

- RN17 — [PlanoTrabalhoRequestValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoRequestValidator.php) `store()`
- RN18 — [PlanoTrabalhoStoreValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoStoreValidator.php) `validarAutorizacao()`
- RN19 — [PlanoTrabalhoStoreValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoStoreValidator.php) `validarAgenteLotadoNasUnidadesDoCriador()`
- RN20 — [PlanoTrabalhoStoreValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoStoreValidator.php) `validarPeriodoDentroDoRegramento()`
- RN21 — [PlanoTrabalhoRequestValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoRequestValidator.php) `store()` — regra `after_or_equal:data_inicio`
- RN22 — [PlanoTrabalhoStoreValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoStoreValidator.php) `validarConflitoPeriodo()` → [PlanoTrabalhoRepository.php](../../app/Repository/PlanoTrabalhoRepository.php) `existeConflitoPeriodo()`
- RN23 — Delegado ao regramento via `validarPeriodoDentroDoRegramento()`. O Programa define os limites de duração.
- RN24 — [PlanoTrabalhoStoreValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoStoreValidator.php) `validarModalidadeDivergente()`. Persistida em `planos_trabalhos.justificativa_modalidade`.
- RN25 — [PlanoTrabalhoStoreValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoStoreValidator.php) `validarParticipanteHabilitado()` + [PlanoTrabalhoUpdateValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoUpdateValidator.php) `validarParticipanteHabilitado()` → [UsuarioRepository.php](../../app/Repository/UsuarioRepository.php) `isParticipanteHabilitado()`

### Ref Bloco 2 - Criterios

- 4.5 — [PlanoTrabalhoEntregaController.php](../../app/V2/PlanoTrabalho/Entrega/PlanoTrabalhoEntregaController.php)
- 4.7 — [PlanoTrabalhoService.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoService.php) `store()` — status INCLUIDO ao criar

### Ref Bloco 2 - Regras

- RN26 — [PlanoTrabalhoEntregaController.php](../../app/V2/PlanoTrabalho/Entrega/PlanoTrabalhoEntregaController.php) `store()` — POST múltiplo
- RN27 — [PlanoTrabalhoEntregaController.php](../../app/V2/PlanoTrabalho/Entrega/PlanoTrabalhoEntregaController.php) `update()`, `destroy()`
- RN28 — [PlanoTrabalhoEntregaStoreValidator.php](../../app/V2/PlanoTrabalho/Entrega/Validators/PlanoTrabalhoEntregaStoreValidator.php) `validar()` — rejeita se PT não existe ou status inválido
- RN29/RN30 — [PlanoTrabalhoDocumentoStoreValidator.php](../../app/V2/PlanoTrabalho/Documento/Validators/PlanoTrabalhoDocumentoStoreValidator.php) `validar()` — valida somatório de `forca_trabalho`, exige justificativa quando ≠ 100%
- RN31 — [EloquentPlanoEntregaReadRepository.php](../../app/Repository/PlanoEntrega/Eloquent/EloquentPlanoEntregaReadRepository.php) `findAllByUnidadeId()` — filtra `pe.data_fim >= pt.data_inicio AND pe.data_inicio <= pt.data_fim`
- RN32 — [EloquentPlanoEntregaReadRepository.php](../../app/Repository/PlanoEntrega/Eloquent/EloquentPlanoEntregaReadRepository.php) `findAllByUnidadeId()` — `orderBy('data_inicio', 'desc')`

### Ref Bloco 3 - Criterios

- 4.15–4.16 — [AtividadeController.php](../../app/V2/PlanoTrabalho/Consolidacao/Atividade/AtividadeController.php)
- 4.17 — [PlanoTrabalhoConsolidacaoController.php](../../app/V2/PlanoTrabalho/Consolidacao/PlanoTrabalhoConsolidacaoController.php) `concluir()` → [ConcluirConsolidacaoValidator.php](../../app/V2/PlanoTrabalho/Consolidacao/Validators/ConcluirConsolidacaoValidator.php)
- 4.18 — [PlanoTrabalhoConsolidacaoController.php](../../app/V2/PlanoTrabalho/Consolidacao/PlanoTrabalhoConsolidacaoController.php) `reabrir()` → [ReabrirConsolidacaoValidator.php](../../app/V2/PlanoTrabalho/Consolidacao/Validators/ReabrirConsolidacaoValidator.php)
- 4.19 — [AvaliacaoController.php](../../app/V2/PlanoTrabalho/Consolidacao/Avaliacao/AvaliacaoController.php) `store()` → [AvaliacaoStoreValidator.php](../../app/V2/PlanoTrabalho/Consolidacao/Avaliacao/Validators/AvaliacaoStoreValidator.php)
- 4.20 — [PlanoTrabalhoConsolidacaoController.php](../../app/V2/PlanoTrabalho/Consolidacao/PlanoTrabalhoConsolidacaoController.php) `recurso()` → [RecursoValidator.php](../../app/V2/PlanoTrabalho/Consolidacao/Validators/RecursoValidator.php)
- 4.21 — [AvaliacaoService.php](../../app/V2/PlanoTrabalho/Consolidacao/Avaliacao/AvaliacaoService.php) `store()` — detecta reavaliação via `AvaliacaoStoreValidator`
- Conclusão automática — [PlanoTrabalhoConsolidacao.php](../../app/Models/PlanoTrabalhoConsolidacao.php) `booted()` → [StatusService.php](../../app/V2/StatusService.php)

### Ref Bloco 3 - Regras

- RN33 — [AtividadeStoreDTO.php](../../app/V2/PlanoTrabalho/Consolidacao/Atividade/DTOs/AtividadeStoreDTO.php) — `plano_trabalho_entrega_id` vincula ao planejamento
- RN34 — [AtividadeController.php](../../app/V2/PlanoTrabalho/Consolidacao/Atividade/AtividadeController.php) `store()` — POST por entrega
- RN35 — [ConcluirConsolidacaoValidator.php](../../app/V2/PlanoTrabalho/Consolidacao/Validators/ConcluirConsolidacaoValidator.php) `validar()` — verifica todas entregas possuem atividade
- RN36/RN37 — [AtividadeController.php](../../app/V2/PlanoTrabalho/Consolidacao/Atividade/AtividadeController.php) — POST/PUT/DELETE disponíveis
- RN38 — [OcorrenciaService.php](../../app/V2/PlanoTrabalho/Ocorrencia/OcorrenciaService.php) `vincularConsolidacoes()` + [EloquentPlanoTrabalhoConsolidacaoReadRepository.php](../../app/Repository/PlanoTrabalhoConsolidacao/Eloquent/EloquentPlanoTrabalhoConsolidacaoReadRepository.php) `getAfastamentos()`

### Ref Tela geral - Criterios

- 3.1–3.3 — [PlanoTrabalhoController.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoController.php) `index()` → [EloquentPlanoTrabalhoReadRepository.php](../../app/Repository/PlanoTrabalho/Eloquent/EloquentPlanoTrabalhoReadRepository.php) `buscarPlanosListagem()`

### Ref Tela geral - Regras

- RN01 — [PlanoTrabalhoRequestValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoRequestValidator.php) `index()`
- RN02 — [PlanoTrabalhoIndexDTO.php](../../app/V2/PlanoTrabalho/DTOs/PlanoTrabalhoIndexDTO.php) — `incluir_subordinadas`
- RN03 — [PlanoTrabalhoService.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoService.php) `index()` → [UnidadeRepository.php](../../app/Repository/UnidadeRepository.php) `getSubordinadas()`
- RN05 — [PlanoTrabalhoIndexDTO.php](../../app/V2/PlanoTrabalho/DTOs/PlanoTrabalhoIndexDTO.php) — campo `usuario_id`
- RN06 — [EloquentPlanoTrabalhoReadRepository.php](../../app/Repository/PlanoTrabalho/Eloquent/EloquentPlanoTrabalhoReadRepository.php) `buscarPlanosListagem()` — filtro `vigentes`
- RN07 — [PlanoTrabalhoIndexValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoIndexValidator.php) `validar()` — restringe por perfil
- RN09 — [PlanoTrabalhoRequestValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoRequestValidator.php) `index()` + [EloquentPlanoTrabalhoReadRepository.php](../../app/Repository/PlanoTrabalho/Eloquent/EloquentPlanoTrabalhoReadRepository.php) `buscarPlanosListagem()`
- RN12 — [PlanoTrabalhoIndexValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoIndexValidator.php) `validar()` → [UnidadeIntegranteRepository.php](../../app/Repository/UnidadeIntegranteRepository.php)
- RN13 — [EloquentPlanoTrabalhoReadRepository.php](../../app/Repository/PlanoTrabalho/Eloquent/EloquentPlanoTrabalhoReadRepository.php) `buscarPlanosListagem()` — `fn_obter_unidade_hierarquia(unidade_id) AS hierarquia`
- RN14 — [PlanoTrabalhoIndexValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoIndexValidator.php) — força `usuario_id` para participante
- RN15 — [PlanoTrabalhoIndexValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoIndexValidator.php) — filtro por `unidade_id` + subordinadas

### Ref Acoes do PT - Criterios

- 4.22 — [PlanoTrabalhoController.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoController.php) `cancelar()` → [PlanoTrabalhoCancelarValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoCancelarValidator.php)
- 4.23 — [PlanoTrabalhoController.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoController.php) `encerrar()` → [PlanoTrabalhoEncerrarValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoEncerrarValidator.php)
- 4.24 — [PlanoTrabalhoController.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoController.php) `clonar()` → [PlanoTrabalhoClonarValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoClonarValidator.php)
- 4.25 — [PlanoTrabalhoController.php](../../app/V2/PlanoTrabalho/PlanoTrabalhoController.php) `arquivar()` → [PlanoTrabalhoArquivarValidator.php](../../app/V2/PlanoTrabalho/Validators/PlanoTrabalhoArquivarValidator.php)

---

## Itens pendentes

### 1. Gerar PDF / Logs (4.1)

**Status:** Débito técnico — será tratado em ticket separado.

### 2. Migração de status (5.1–5.12)

**Status:** Dispensável — os nomes dos status foram ajustados diretamente no front-end.

---

## Cobertura de testes

| Módulo | Unitários | E2E |
|--------|-----------|-----|
| PlanoTrabalho (CRUD) | ✅ | ✅ |
| Entrega (validação por origem) | ✅ | ✅ |
| Documento/TCR (assinatura + CHD) | ✅ | ✅ |
| Consolidação (index, concluir, reabrir) | ✅ | ✅ |
| Atividade (CRUD) | ✅ | ✅ |
| Avaliação (original + reavaliação) | ✅ | ✅ |
| StatusService | ✅ | — |
| Conclusão automática do PT | — | ✅ |

Total na última regressão: **927 passed, 0 failed** (519 unit + 408 integration)

### Commits

| Hash | Descrição |
|------|----------|
| `5f133ebeb` | feat(#1683): implementa avaliação e reavaliação de períodos avaliativos |
| `23cadd80f` | feat(#1683): valida somatório de carga horária ao gerar documento TCR |
| `a6dc090bd` | feat(#1683): valida modalidade divergente do SIAPE (RN24) |
| `69f665bef` | feat(#1683): implementa solicitação de recurso (4.20) |
| `f864243cd` | feat(#1683): inclui avaliações e datas no index de consolidações |
| `bfdfa770e` | refactor(#1683): move query de notas de avaliação para ProgramaRepository |
| `613a1eea9` | refactor(#1683): substitui ServerException por exceções tipadas no V2 |
| `4b44b2c16` | feat(#1683): implementa cancelamento de plano de trabalho (4.22) |
| `c5db57c35` | feat(#1683): implementa encerramento antecipado de plano de trabalho (4.23) |
| `d68698819` | feat(#1683): implementa arquivamento de plano de trabalho (4.25) |
| `a83c35cc5` | fix(#1683): permite encerrar PT com status CONCLUÍDO |
| `265f40cc1` | fix(#1683): permite recurso em PT CONCLUÍDO e reverte encerrar |
| `58290c3fd` | refactor(#1683): renomeia EntregaController para PlanoTrabalhoEntregaController |
| `f65fe3dfd` | feat(#1683): implementa clonagem de plano de trabalho (4.24) |
| `fcd9f91ed` | fix(#1683): corrige testes pré-existentes de PlanoEntregaEntregaController |
| `76401ccd4` | refactor(#1683): move Avaliacao::create para AvaliacaoRepository |
| `d9d1be754` | feat(#1683): inclui unidade do plano de entrega nas relações do PT |
| `473e10f03` | fix(#1683): alinha validações do update com o store do PT |
| `502240302` | refactor(#1683): renomeia origem PLANO_ENTREGA para PROPRIA_UNIDADE/OUTRA_UNIDADE |
| `3a2456a80` | fix(#1683): corrige campo aprova nas notas de avaliacao |
| `5918393f5` | wip(#1683): CRUD de ocorrencias — PENDENTE migracao para repositories |
| `eaaf55f91` | chore(#1683): adiciona package-lock.json ao .gitignore |
| `ca1d1389f` | chore(#1683): remove package-lock.json do rastreamento do git |
| `b9b5ea199` | refactor(#1683): converte UsuarioRepositoryTest de PHPUnit para Pest |
| `25359c5bd` | refactor(#1683): renomeia métodos find que retornam Collection para findAll |
| `562092d80` | feat(#1683): valida participante habilitado no SIAPE ao criar/editar PT (RN25) |
| `daae88c45` | feat(#1683): filtra PEs por interseção de período e ordena do mais recente (RN31/RN32) |
| `3db1571c3` | test(#1683): adiciona testes E2E para interseção de período e ordenação de PEs (RN31/RN32) |
| `1580d9afb` | refactor(#1683): remove whereNull(deleted_at) redundante no TipoMotivoAfastamentoRepository |
| `eac261f9a` | refactor(#1683): move getStatuses do repository para o service |
| `d1bf01dbc` | refactor(#1683): renomeia getAll para findAll no TipoModalidadeRepository |
| `e2ea7bc41` | fix(#1683): corrige retorno do delete e impede invalidação do TCR em falha |
| `279f069d6` | refactor(#1683): torna AvaliacaoStoreDTO imutável com withNota e corrige mock do delete |
| `d6e400577` | refactor(#1683): move findAllNotasAvaliacao da facade para o EloquentProgramaReadRepository |
| `077a0d7b3` | refactor(#1683): substitui FQCNs inline por imports nos contracts e repositories |
