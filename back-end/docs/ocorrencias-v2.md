# Módulo Ocorrências V2

## Visão geral

Ocorrências (afastamentos) são registros de ausência ou compensação de um servidor. O módulo V2 é **standalone** — não subordinado a nenhum Plano de Trabalho específico. A associação com consolidações/PTs é feita inteiramente pelo back-end via intersecção de datas.

Uma ocorrência impacta **todos** os Planos de Trabalho do usuário cujo período de vigência seja interceptado pelas datas da ocorrência.

---

## Endpoints

### CRUD

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/v2/ocorrencia` | Listagem paginada (filtros: `usuario_id`, `tipo_motivo_afastamento_id`, `data_inicio`, `data_fim`, `page`, `size`) |
| POST | `/api/v2/ocorrencia` | Criar ocorrência |
| PUT | `/api/v2/ocorrencia/{id}` | Editar ocorrência |
| DELETE | `/api/v2/ocorrencia/{id}` | Excluir ocorrência |

### Auxiliares

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/v2/ocorrencia/agentes` | Usuários visíveis para seleção (self ou subordinados) |
| GET | `/api/v2/ocorrencia/impacto-consolidacoes` | Simulação de impacto antes de CUD |
| GET | `/api/v2/plano-trabalho-consolidacao/{id}/ocorrencias` | Ocorrências que interceptam uma consolidação (busca por datas) |
| GET | `/api/v2/tipos-motivos-afastamentos` | Tipos disponíveis para o dropdown |

---

## Campos do request

### POST (criar)

```json
{
  "usuario_id": "uuid",
  "observacoes": "string (obrigatório)",
  "data_inicio": "date (obrigatório)",
  "data_fim": "date (obrigatório, >= data_inicio)",
  "tipo_motivo_afastamento_id": "uuid (obrigatório)",
  "horas": "int|null (1-9999)"
}
```

### PUT (editar)

```json
{
  "usuario_id": "uuid (obrigatório, para autorização)",
  "observacoes": "string (opcional)",
  "data_inicio": "date (opcional)",
  "data_fim": "date (opcional)",
  "tipo_motivo_afastamento_id": "uuid (opcional)",
  "horas": "int|null (opcional)"
}
```

### DELETE (excluir)

```json
{
  "usuario_id": "uuid (obrigatório, para autorização)"
}
```

### GET impacto-consolidacoes

Query params:
```
usuario_id=uuid&data_inicio=date&data_fim=date&operacao=criar|editar|excluir&ocorrencia_id=uuid&tipo_motivo_afastamento_id=uuid
```

Response:
```json
{
  "operacao_bloqueada": false,
  "gera_dispensa": true,
  "remove_dispensa": false,
  "pt_concluido": false
}
```

---

## Regras de negócio (#2253)

### Autorização (RN4-6)

- **RN4**: Perfil Consulta não pode CUD
- **RN5**: Participante só pode CUD para si mesmo (`usuario_id == Auth::id()`)
- **RN6**: Demais perfis podem CUD para si e terceiros da cadeia hierárquica (unidades gerenciadas + subordinadas recursivas)

### Visibilidade (RN7-8)

- **RN7**: Participante/Consulta visualiza apenas suas próprias ocorrências
- **RN8**: Demais perfis visualizam ocorrências de terceiros da cadeia hierárquica

### Impacto (RN3 / #2145)

Antes de executar qualquer operação CUD, o sistema verifica se a operação altera o estado de dispensa de consolidações:

- **Dispensa**: quando ocorrências (não-compensação) cobrem integralmente o período de uma consolidação
- **Compensação**: tipos com `calculo = 'ACRESCIMO'` não contam para dispensa

#### 6 cenários possíveis

| # | Operação | Situação | Resultado |
|---|----------|----------|-----------|
| 1 | Gera dispensa | PT ativo | Confirmação |
| 2 | Gera dispensa | PT concluído, cancelamento permitido | Confirmação (avaliações canceladas) |
| 3 | Gera dispensa | PT concluído, cancelamento **não** permitido | **BLOQUEIO** |
| 4 | Remove dispensa | PT ativo | Confirmação |
| 5 | Remove dispensa | PT concluído, prazo recursal aberto | Confirmação (PT volta a ATIVO) |
| 6 | Remove dispensa | PT concluído, prazo recursal encerrado | **BLOQUEIO** |
| 7 | Gera + remove | Qualquer | Confirmação (recálculo) |

#### Cancelamento de avaliação não é permitido quando (regras 9/10)

- **Regra 9**: Passaram 20 dias desde a conclusão do registro de execução (`data_avaliacao < NOW() - 20 dias`)
- **Regra 10**: O participante fez recurso (`recurso IS NOT NULL`)

#### Mensagens (front-end)

- **Cenário 1**: "Esta ocorrência resultará na dispensa de registro de execução e avaliação de um ou mais períodos avaliativos, em razão da cobertura integral do período. Deseja confirmar?"
- **Cenário 2**: "A inclusão ou alteração desta ocorrência resultará na dispensa de registro de execução e avaliação de um ou mais períodos avaliativos. Os períodos afetados passarão para o status 'Dispensado', e as avaliações já realizadas serão canceladas. Em decorrência dessa alteração, o Plano de Trabalho poderá retornar ao status 'Em execução'. Deseja confirmar?"
- **Cenário 3**: "Não é possível incluir ou alterar esta ocorrência, pois ela resultaria na dispensa de registro de execução e avaliação de período avaliativo cuja avaliação não pode mais ser cancelada."
- **Cenários 4/5**: "A alteração desta ocorrência removerá a dispensa de registro de execução e avaliação de um ou mais períodos avaliativos. Os períodos afetados retornarão ao status anterior [e o Plano de Trabalho retornará ao status 'Em execução']. Deseja confirmar?"
- **Cenário 6**: "Esta ocorrência não pode ser alterada ou excluída, pois impacta período avaliativo dispensado pertencente a Plano de Trabalho concluído com prazo recursal encerrado."
- **Cenário 7**: "Esta alteração impactará a situação de um ou mais períodos avaliativos. As dispensas de registro de execução e avaliação serão recalculadas conforme as regras vigentes do sistema. Deseja confirmar?"

---

## Arquitetura (back-end)

```
app/V2/Ocorrencia/
├── DTOs/
│   ├── OcorrenciaStoreDTO.php
│   ├── OcorrenciaUpdateDTO.php
│   ├── OcorrenciaOperacaoDTO.php      ← input para impacto
│   ├── OcorrenciaImpactoDTO.php       ← output do impacto
│   └── OcorrenciaIndexDTO.php         ← filtros de listagem
├── Validators/
│   ├── OcorrenciaRequestValidator.php ← validação de input (Laravel validate)
│   └── OcorrenciaStoreValidator.php   ← autorização + impacto
├── OcorrenciaController.php
├── OcorrenciaService.php              ← orquestrador
└── OcorrenciaImpactoPolicy.php        ← lógica de impacto nas dispensas
```

### Dependências

- `AfastamentoRepository` — CRUD de afastamentos, listagem paginada, busca por datas
- `PlanoTrabalhoRepository` — buscar PTs interceptados
- `PlanoTrabalhoConsolidacaoRepository` — query de impacto com flags EXISTS
- `UnidadeRepository` — unidades gerenciadas + subordinadas
- `UsuarioRepository` — agentes visíveis
- `TipoMotivoAfastamentoRepository` — verificar se tipo é compensação
- `DispensaAvaliacaoPolicy` — lógica de merge de intervalos e verificação de cobertura

---

## Arquitetura (front-end)

```
front-end/src/app/modules/gestao/ocorrencia-v2/
├── domain/types.ts
├── infra/ocorrencia-api.client.ts
├── routes.ts
└── ui/
    ├── list.page.ts + html    ← listagem paginada + filtros + modal exclusão
    └── form.page.ts + html    ← criar/editar + modal impacto
```

### Fluxo do CUD no front

1. Usuário preenche formulário / clica excluir
2. Front chama `GET /impacto-consolidacoes` com os dados da operação
3. Se `operacao_bloqueada` → modal de bloqueio (só botão "Entendi")
4. Se `gera_dispensa || remove_dispensa` → modal de confirmação com mensagem contextual
5. Se sem impacto → modal simples "Deseja confirmar?"
6. Ao confirmar → executa POST/PUT/DELETE
7. Back-end valida impacto novamente (guard) — rejeita 422 se bloqueado

---

## Tipos de ocorrência

### Compensação (não contam para dispensa)

Identificados por `tipos_motivos_afastamentos.calculo = 'ACRESCIMO'`:
- Greve (compensação)
- Política de consequência do PGD (compensação)
- Recesso (compensação)
- Outras hipóteses (compensação)
- Atendimento à convocação presencial excepcional
- Trabalho Presencial Regular

### Ocultos do dropdown

- Comparecimento para fins de saúde (não se aplica para teletrabalho integral)
- Redução de jornada sem redução salarial

---

## Pendências

### Melhorias
- [ ] Cache `avaliacao-dispensa:{usuario-uuid}:{pt-uuid}` com invalidação

### Após validação de 1 mês dos nóvos módulos v2
- Remover `planos_trabalhos_consolidacoes_afastamentos`
- Remover `vincularConsolidacoes` do OcorrenciaService
- Remover `Services/Snapshot/` (9 classes @deprecated)
- Remover `PlanoTrabalhoConsolidacaoAfastamento` model
- Remover `ConsolidacaoAfastamentoDTO`
- Remover repository methods: `createAfastamentoVinculo`, `updateAfastamentoSnapshot`, `deleteAfastamentoVinculos`
- Listagem de ocorrências por consolidação já usa busca por datas (`GET /plano-trabalho-consolidacao/{id}/ocorrencias`)
