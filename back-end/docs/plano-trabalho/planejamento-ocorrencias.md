# Planejamento — Endpoints de Ocorrências (Afastamentos)

## Referência na IN

A necessidade de registrar intercorrências para subsidiar a avaliação do período avaliativo é citada nos seguintes artigos:

> **Art. 20.** Ao longo da execução do plano de trabalho, o participante registrará:
>
> (...)
>
> II — as intercorrências que afetaram o que foi inicialmente pactuado, mediante justificativa.
> *(Redação dada pela IN Conjunta SEGES-SGP-SRT/MGI nº 21, de 16/07/2024)*

> **Art. 21.** A chefia da unidade avaliará a execução do plano de trabalho do participante, considerando:
>
> (...)
>
> V — as intercorrências registradas pelo participante ao longo da execução do plano de trabalho.
> *(Redação dada pela IN Conjunta SEGES-SGP-SRT/MGI nº 21, de 16/07/2024)*

> **Art. 26.** Constituem responsabilidades dos participantes do PGD:
>
> (...)
>
> IV — informar à chefia da unidade de execução as atividades realizadas, as licenças e afastamentos legais e as intercorrências que possam afetar ou que afetaram o que foi pactuado.
> *(Redação dada pela IN Conjunta SEGES-SGP-SRT/MGI nº 21, de 16/07/2024)*

## Hierarquia do banco de dados

**Importante:** Apesar de o front-end usar o termo "ocorrências", a tabela utilizada para registrá-las é `afastamentos`. A relação com os períodos avaliativos é feita pela tabela pivô `planos_trabalhos_consolidacoes_afastamentos`.

```
planos_trabalhos
    | 1..*
    |
afastamentos --- *..1 --- tipos_motivos_afastamentos
    |   |
    |   +------- *..1 --- usuarios
   1..*
    |--- planos_trabalhos_consolidacoes_afastamentos
   *..1
    |
    |
planos_trabalhos_consolidacoes
```

## Diretrizes

1. Manter as regras existentes na V1 `AfastamentoController`, `AfastamentoService`
2. Aplicar as mesmas autorizações dividindo em grupos de write e read
3. Não permitir a edição de `afastamento.data_inicio/data_fim` no PATCH, para evitar regras complexas de INCLUSÃO/EXCLUSÃO de `planos_trabalhos_consolidacoes_afastamentos` na medida em que o novo período de `data_inicio/data_fim` compreenda ou deixe de compreender algum `planos_trabalhos_consolidacoes` 
    * Caso queira editar o período da ocorrência, DELETE -> POST registro c/novo período
4. Participante só deve poder ver as próprias ocorrências
5. Chefia só deve poder ver as ocorrências dos subordinados
6. Como haverá mudanças nos repositórios de `afastamentos` na task #1984, a implemenação inicial será feita direto no Eloquent, e serão feitos apenas testes E2E para conferir a corretude de tudo que foi feito.

## Endpoints

**Importante:** os endpoints serão implementados em `AfastamentoController` e `AfastamentoService`. No entanto, o apontamento do endpoint em `api_tenant.php` será para rotas de ocorrências.

### `GET /api/v2/plano-trabalho/:id` (atualização)

Adicionar o campo `afastamentos` aos períodos avaliativos, relacionando a partir de `planos_trabalhos_consolidacoes_afastamentos`. Carregar via `$plano->load()` no `PlanoTrabalhoService::show`, respeitando as diretrizes 4 e 5.

#### Exemplo de resposta:

```js
{
    "id": "pt-x",
    // ...
    "consolidacoes": [ // Fazer um $plano->load() em PlanoTrabalhoServiceV2#show, se o usuário se encaixar nas diretrizes 4 ou 5
        // ...
        {
            "id": "ptc-x",
            "data_inicio": "01/03/2026",
            "data_fim": "31/03/2026",
            "afastamentos": [
                {
                    "id": "af-1",
                    "observacoes": "Gripe. Atestado enviado ao departamento de bem estar do trabalho",
                    "data_inicio": "31/03/2026",
                    "data_fim": "07/04/2026"
                    "motivo": {
                        "id": "tmaf-1",
                        "descricao": "Licença Médica"
                    }
                },
                {
                    "id": "af-2",
                    "observacoes": "Sistema fora do ar. Impossibilidade total de login na intranet",
                    "data_inicio": "12/03/2026",
                    "data_fim": "13/03/2026",
                    "motivo": {
                        "id": "tmaf-2",
                        "descricao": "Falha nas instalações"
                    }
                }
            ]
        },
        {
            "id": "ptc-y",
            "data_inicio": "01/04/2026",
            "data_fim": "30/04/2026",
            "afastamentos": [
                {
                    "id": "af-1",
                    "observacoes": "Gripe. Atestado enviado ao departamento de bem estar do trabalho",
                    "data_inicio": "31/03/2026",
                    "data_fim": "07/04/2026"
                    "motivo": {
                        "id": "tmaf-1",
                        "descricao": "Licença Médica"
                    }
                }
            ]
        },
        // ...
    ]
    // ...
}
```

### `POST /api/v2/plano-trabalho/:id/ocorrencia`

Cria uma nova ocorrência vinculada ao plano de trabalho. O `usuario_id` é preenchido automaticamente com `$plano->usuario_id` no service.

#### Body:

  ```javascript
  {
      "observacoes": "Descrição da ocorrência", // obrigatório, não pode ser vazio
      "data_inicio": "01/01/2026", // obrigatório, >= plano_trabalho.data_inicio
      "data_fim": "31/01/2026", // obrigatório, <= plano_trabalho.data_fim
      "tipo_motivo_afastamento_id": "tmaf-x", // obrigatório, uuid
      "horas": 123 // se tipo_motivo_afastamento.horas == true: obrigatório, > 0
  }
  ```

### `PATCH /api/v2/plano-trabalho/:id/ocorrencia/:oid`

Atualiza uma ocorrência existente. **Não permite alterar `data_inicio`/`data_fim`** (ver diretriz 3).

#### Body:

```javascript
{
    "observacoes": "Descricao atualizada",           // opcional
    "tipo_motivo_afastamento_id": "tmaf-x",          // opcional, uuid
    "horas": 123                                     // obrigatorio se tipo_motivo_afastamento.horas == true, > 0
}
```

### `DELETE /api/v2/plano-trabalho/:id/ocorrencia/:oid`

Remove a ocorrência e seus vínculos na tabela pivô `planos_trabalhos_consolidacoes_afastamentos`.
