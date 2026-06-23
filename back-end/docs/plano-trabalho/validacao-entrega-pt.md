# Planejamento — Validação de PlanoTrabalhoEntrega

## Contexto

Uma `PlanoTrabalhoEntrega` vincula uma entrega ao plano de trabalho do participante. Existem 3 tipos:

| Origem | `plano_entrega_entrega_id` | `orgao` | Descrição |
|------|---------------------------|---------|-----------|
| `PLANO_ENTREGA` | ✅ obrigatório | — | Entrega de um PE (própria ou outra unidade) |
| `OUTRO_ORGAO` | — | ✅ obrigatório | Entrega de órgão externo |
| `SEM_ENTREGA` | — | — | Sem vínculo |

## Campos do request

| Campo | Origem | Regra |
|-------|------|-------|
| `origem` | string, enum | obrigatório: `PLANO_ENTREGA`, `OUTRO_ORGAO`, `SEM_ENTREGA` |
| `plano_entrega_entrega_id` | uuid | obrigatório quando tipo é `PLANO_ENTREGA` |
| `orgao` | string, max 256 | obrigatório quando tipo é `OUTRO_ORGAO` |
| `forca_trabalho` | numeric, min 0 | opcional |
| `descricao` | string, max 1000 | opcional |

## Validação de request (RequestValidator)

Validação de input condicional por `tipo`:
- `origem` é obrigatório, enum `PLANO_ENTREGA|OUTRO_ORGAO|SEM_ENTREGA`
- `plano_entrega_entrega_id` é `required` quando `origem = PLANO_ENTREGA`
- `orgao` é `required` quando `origem = OUTRO_ORGAO`

## Validações de negócio (StoreValidator)

### Sempre
- PT deve existir
- PT deve estar com status INCLUIDO ou AGUARDANDO_ASSINATURA

### Origem `PLANO_ENTREGA`
1. A `PlanoEntregaEntrega` deve existir
2. **Unicidade**: não pode existir outra `PlanoTrabalhoEntrega` com o mesmo par (`plano_trabalho_id`, `plano_entrega_entrega_id`)
3. O período da entrega (`data_inicio`/`data_fim`) deve ter **interseção** com o período do PT

### Origem `OUTRO_ORGAO`
- Nenhuma validação adicional

### Tipo `SEM_ENTREGA`
- Nenhuma validação adicional

## DTO (StoreDTO)

Campos: `planoTrabalhoId`, `tipo`, `planoEntregaEntregaId` (nullable), `orgao` (nullable), `forcaTrabalho`, `descricao`

O DTO limpa campos irrelevantes para o tipo:
- `PLANO_ENTREGA` → `orgao = null`
- `OUTRO_ORGAO` → `planoEntregaEntregaId = null`
- `SEM_ENTREGA` → ambos null

## Impacto nos arquivos

- `PlanoTrabalhoEntregaRequestValidator` — validação condicional por `tipo`
- `PlanoTrabalhoEntregaStoreDTO` — campo `tipo`, limpeza de campos por tipo
- `PlanoTrabalhoEntregaStoreValidator` — validação condicional (existência, unicidade, período)
- `PlanoTrabalhoEntregaService` — passa dados ao validator
- `PlanoTrabalhoEntregaRepository` — método para checar unicidade do par (`plano_trabalho_id`, `plano_entrega_entrega_id`)
- `PlanoEntregaRepository` — `findEntregaById` (já implementado)
