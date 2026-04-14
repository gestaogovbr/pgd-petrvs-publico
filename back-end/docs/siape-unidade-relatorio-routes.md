# Rotas SIAPE — Relatório de Processamento de Unidade

## Objetivo

Após o processamento da sincronização de uma unidade via SIAPE, o front-end precisa exibir um relatório final contendo, além do resumo por servidor, informações agregadas da unidade, como:

- CPF do chefe/titular da unidade
- Quantidade de servidores lotados na unidade

## Rotas existentes (referência)

- `POST /api/unidade/consultar-unidade-siape`
  - Retorna dados da unidade no SIAPE para exibição na tela de consulta.
- `POST /api/unidade/processar-siape`
  - Dispara o processamento/sincronização.
- `POST /api/unidade/exportar-unidade-siape`
  - Download do dump da consulta.
- `POST /api/unidade/download-unidade-siape`
  - Download do log de processamento.

## Novas rotas necessárias

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
  "quantidadeServidoresLotados": 123
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
- `quantidadeServidoresLotados`: número inteiro; pode ser `null` se indisponível.

**Status HTTP esperado**
- `200` ou `201` em sucesso.
- `4xx/5xx` em erro, com `message` quando possível.

### 2) Ajuste na rota de processamento para devolver resumo por servidor (necessário para o modal)

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
      "mensagem": "Processamento concluído",
      "usuario_existia": true,
      "usuario_inserido": false,
      "lotacao_associada": true,
      "alteracoes": ["campo1", "campo2"],
      "nome": "Nome do servidor (opcional)"
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
      "mensagem": "Servidor X não processado",
      "usuario_existia": false,
      "usuario_inserido": false,
      "lotacao_associada": false,
      "alteracoes": []
    }
  ]
}
```

**Status**
- `status` deve manter o padrão já utilizado no fluxo de CPF: `sucesso | parcial | erro`.

## Observação sobre integração front-end

O front-end passou a:
- Exibir o modal de resumo quando `resumo` vier em `processar-siape`.
- Buscar `chefeCpf` e `quantidadeServidoresLotados` em `relatorio-processamento-siape` para enriquecer o relatório final.

