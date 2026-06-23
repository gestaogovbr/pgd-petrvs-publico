# Listagem de Plano de Trabalho V2

## Endpoint

```
GET /api/v2/plano-trabalho
```

- Autenticação: `auth:sanctum`
- Controller: `PlanoTrabalhoController@index`
- Service: `PlanoTrabalhoService::index`

## Query Parameters

### Filtros (`filters`)

| Parâmetro | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `filters[usuario_id]` | uuid | não | Filtra por participante |
| `filters[unidade_id]` | uuid | não | Filtra por unidade executora |
| `filters[data_inicio]` | date | não | Início do intervalo (planos com `data_fim >= valor`) |
| `filters[data_fim]` | date | não | Fim do intervalo (planos com `data_inicio <= valor`) |
| `filters[vigentes]` | boolean | não | Apenas planos vigentes (dentro do período atual e status `ATIVO`) |
| `filters[arquivados]` | boolean | não | `true` = apenas arquivados; `false`/ausente = apenas não-arquivados |
| `filters[incluir_subordinadas]` | boolean | não | Inclui planos de unidades subordinadas às `unidade_id` informadas |
| `filters[numero]` | integer | não | Filtra por número exato do plano |
| `filters[tipo_modalidade_id]` | uuid | não | Filtra por modalidade |
| `filters[status]` | uuid | não | Filtra por status |
| `filters[usuario_nome]` | string | não | Busca parcial (LIKE) no nome do participante |
| `filters[unidade_regramento]` | string | não | Busca parcial (LIKE, case-insensitive) na sigla ou nome da unidade |
| `filters[hierarquia]` | boolean | não | Adiciona coluna `hierarquia` via `fn_obter_unidade_hierarquia` e ordena por ela. Default: `true` |

> **Regra**: ao menos um filtro deve ser informado, caso contrário retorna `422` com `"Informe ao menos um filtro para a busca."`.

### Paginação

| Parâmetro | Tipo | Default | Descrição |
|---|---|---|---|
| `page` | integer (min:1) | 1 | Página atual |
| `size` | integer (min:1) | 15 | Itens por página |

### Ordenação

| Parâmetro | Tipo | Valores aceitos | Descrição |
|---|---|---|---|
| `order_by` | string | `numero`, `usuario_nome` | Campo de ordenação |
| `order_dir` | string | `asc`, `desc` | Direção da ordenação |

Valores fora dos aceitos retornam `400`.

## Validação de Request (`PlanoTrabalhoRequestValidator::index`)

Validação Laravel padrão dos tipos e formatos dos query params. Falha retorna `400`.

## Validação de Negócio (`PlanoTrabalhoIndexValidator`)

Aplicada após a construção do DTO, com base no perfil do usuário logado.

### Perfil Participante

- Só pode consultar seus próprios planos.
- Se `usuario_id` for informado e diferir do usuário logado → `422`.

### Perfil Unidade (Gestor, Gestor Substituto, etc.)

- O sistema resolve automaticamente as unidades permitidas: unidades onde o usuário é integrante + subordinadas recursivas.
- Se `unidade_id` não for informado → o filtro é preenchido com todas as unidades permitidas.
- Se `unidade_id` for informado e contiver unidades fora do escopo → `422`.

## Fluxo Interno

```
Request
  │
  ▼
PlanoTrabalhoController::index
  │  PlanoTrabalhoRequestValidator::index(request)  → valida tipos/formatos
  │
  ▼
PlanoTrabalhoService::index(data)
  │  PlanoTrabalhoIndexDTO::fromRequest(data, Auth::id())  → monta DTO + valida filtro mínimo
  │  PlanoTrabalhoIndexValidator::validar(dto)              → aplica regras de perfil
  │  Se subordinadas=true → resolve IDs via UnidadeRepository::getSubordinadasRecursivas
  │
  ▼
EloquentPlanoTrabalhoReadRepository::buscarPlanosListagem(dto)
  │  Monta query com filtros, joins, ordenação
  │
  ▼
LengthAwarePaginator → JSON response
```

## Resposta

### 200 OK

```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": "uuid",
        "numero": 1,
        "usuario_id": "uuid",
        "unidade_id": "uuid",
        "tipo_modalidade_id": "uuid",
        "data_inicio": "2024-01-01",
        "data_fim": "2024-12-31",
        "data_arquivamento": null,
        "status": "ATIVO",
        "hierarquia": "UNIDADE_PAI/UNIDADE_FILHA",
        "usuario": { "id": "uuid", "nome": "Nome" },
        "tipo_modalidade": { "id": "uuid", "nome": "Presencial" },
        "unidade": { "id": "uuid", "nome": "Nome Unidade", "sigla": "SIGLA" }
      }
    ],
    "per_page": 15,
    "total": 1,
    "last_page": 1
  }
}
```

### Erros

| Status | Causa |
|---|---|
| 400 | Validação de request (tipo inválido, `order_by`/`order_dir` inválido) |
| 422 | Nenhum filtro informado ou violação de regra de perfil |
| 500 | Erro inesperado (logado via `Log::error`) |

## Arquivos Relacionados

| Camada | Arquivo |
|---|---|
| Rota | `routes/api_tenant.php` (linha ~619) |
| Controller | `app/V2/PlanoTrabalho/PlanoTrabalhoController.php` |
| Request Validator | `app/V2/PlanoTrabalho/Validators/PlanoTrabalhoRequestValidator.php` |
| DTO | `app/V2/PlanoTrabalho/DTOs/PlanoTrabalhoIndexDTO.php` |
| Business Validator | `app/V2/PlanoTrabalho/Validators/PlanoTrabalhoIndexValidator.php` |
| Service | `app/V2/PlanoTrabalho/PlanoTrabalhoService.php` |
| Repository (contract) | `app/Repository/PlanoTrabalho/Contracts/PlanoTrabalhoReadRepositoryContract.php` |
| Repository (impl) | `app/Repository/PlanoTrabalho/Eloquent/EloquentPlanoTrabalhoReadRepository.php` |
| Teste unitário (DTO) | `tests/Unit/V2/PlanoTrabalho/` |
| Teste unitário (Validator) | `tests/Unit/V2/PlanoTrabalho/PlanoTrabalhoIndexValidatorTest.php` |
| Teste unitário (Service) | `tests/Unit/V2/PlanoTrabalho/PlanoTrabalhoServiceTest.php` |
| Teste E2E | `tests/IntegrationTenant/Controllers/V2/PlanoTrabalhoControllerTest.php` |
