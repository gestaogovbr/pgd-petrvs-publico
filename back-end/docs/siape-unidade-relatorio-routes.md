# Rotas SIAPE — Relatório de Processamento de Unidade

## Objetivo

Após o processamento da sincronização de uma unidade via SIAPE, o front-end precisa exibir um relatório final contendo o resumo da unidade processada e informações agregadas, como:

- CPF do chefe/titular da unidade
- Quantidade de servidores lotados na unidade
- Vinculação com a unidade pai, permitindo `null` quando a unidade processada for raiz

## Rotas existentes (referência)

- `POST /api/unidade/consultar-unidade-siape`
  - Retorna dados da unidade no SIAPE para exibição na tela de consulta.
- `POST /api/unidade/processar-siape`
  - Dispara o processamento/sincronização.
- `POST /api/unidade/exportar-unidade-siape`
  - Download do dump da consulta.
- `POST /api/unidade/download-unidade-siape`
  - Download do log de processamento.

## Rotas de relatório e resumo

### 1) Relatório agregado do processamento

**Rota**
- `POST /api/unidade/relatorio-processamento-siape`

**Request**
```json
{
  "unidade": "26101"
}
```

**Response (sucesso)**
```json
{
  "success": true,
  "chefeCpf": "00000000000",
  "quantidadeServidoresLotados": 123,
  "unidade": {
    "id": "uuid",
    "codigo": "26101",
    "sigla": "SIGLA",
    "nome": "Nome da unidade",
    "unidade_pai_id": null,
    "unidade_pai_codigo": null,
    "unidade_pai_sigla": null,
    "unidade_raiz": true
  }
}
```

**Response (erro)**
```json
{
  "success": false,
  "message": "Mensagem de erro"
}
```

**Regras**
- `unidade`: código numérico (string) sem máscara.
- `chefeCpf`: CPF numérico (string) sem máscara; pode ser `null` se indisponível.
- `quantidadeServidoresLotados`: número inteiro de servidores com atribuição `LOTADO` na unidade.
- `unidade.unidade_pai_id`, `unidade.unidade_pai_codigo` e `unidade.unidade_pai_sigla`: podem ser `null` quando a unidade processada for raiz.
- `unidade.unidade_raiz`: `true` quando `unidade_pai_id` for `null`.

**Status HTTP esperado**
- `200` em sucesso.
- `4xx/5xx` em erro, com `message` quando possível.

### 2) Ajuste na rota de processamento para devolver resumo da unidade processada

**Rota**
- `POST /api/unidade/processar-siape`

**Request**
```json
{
  "unidade": "26101"
}
```

**Response (sucesso)**
```json
{
  "success": true,
  "message": "Processamento concluído.",
  "log": "string com log do processamento",
  "resumo": [
    {
      "status": "sucesso",
      "mensagem": "Processamento da unidade concluído",
      "unidade_codigo": "26101",
      "unidade_nome": "Nome da unidade",
      "unidade_sigla": "SIGLA",
      "unidade_existia": true,
      "unidade_inserida": false,
      "unidade_pai_id": null,
      "unidade_pai_codigo": null,
      "unidade_pai_sigla": null,
      "unidade_raiz": true,
      "quantidade_servidores_lotados": 123,
      "chefe_cpf": "00000000000",
      "alteracoes": ["nome", "sigla", "unidade_pai_id"]
    }
  ]
}
```

**Response (falha com resumo)**
```json
{
  "success": false,
  "message": "Falha ao processar a unidade.",
  "log": "string com log do processamento",
  "resumo": [
    {
      "status": "erro",
      "mensagem": "Falha ao processar a unidade.",
      "unidade_codigo": "26101",
      "unidade_nome": null,
      "unidade_sigla": null,
      "unidade_existia": false,
      "unidade_inserida": false,
      "unidade_pai_id": null,
      "unidade_pai_codigo": null,
      "unidade_pai_sigla": null,
      "unidade_raiz": null,
      "quantidade_servidores_lotados": null,
      "chefe_cpf": null,
      "alteracoes": []
    }
  ]
}
```

**Status**
- `status` deve manter o padrão já utilizado no fluxo de CPF: `sucesso | parcial | erro`.
- O resumo de unidade não usa os campos do resumo de servidor (`usuario_existia`, `usuario_inserido`, `lotacao_associada`).
- A informação de lotação da unidade é `quantidade_servidores_lotados`.
- A unidade raiz é válida e deve retornar campos de unidade pai como `null`, sem gerar erro ou status parcial apenas por esse motivo.

## Observação sobre integração front-end

O front-end passou a:
- Exibir o modal de resumo de unidade quando `resumo` vier em `processar-siape`.
- Buscar `chefeCpf` e `quantidadeServidoresLotados` em `relatorio-processamento-siape` para enriquecer o relatório final.
