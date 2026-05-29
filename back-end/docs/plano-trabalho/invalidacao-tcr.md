# Invalidação do TCR ao modificar Plano de Trabalho ou Entregas

## Regra de negócio

Qualquer modificação no Plano de Trabalho ou nas suas entregas invalida o TCR vigente e reverte o status do plano para rascunho. Isso garante que o documento assinado sempre reflita o estado atual do plano.

## Quando se aplica

A invalidação deve ocorrer nos seguintes endpoints:

| Endpoint | Ação |
|---|---|
| `PUT /api/v2/plano-trabalho/:id` | Edição dos dados do plano |
| `POST /api/v2/plano-trabalho/:id/entrega` | Adição de entrega |
| `PUT /api/v2/plano-trabalho/:id/entrega/:id` | Edição de entrega |
| `DELETE /api/v2/plano-trabalho/:id/entrega/:id` | Remoção de entrega |

## O que deve acontecer

Ao executar qualquer uma das ações acima:

1. Se o plano **não está com status Incluído**, reverter para **Incluído**
2. Se existe um **documento TCR** associado ao plano, **removê-lo** (soft delete)
3. As **assinaturas** do documento removido são invalidadas junto com ele (cascade do soft delete ou remoção explícita)
4. O campo `documento_id` do plano deve ser **anulado**

## Quando NÃO se aplica

- Se o plano já está com status **Incluído** e não possui TCR, nenhuma ação adicional é necessária
- Planos com status **Ativo**, **Concluído**, **Cancelado** ou **Encerrado** não permitem edição de entregas (guard de status já existente nos validators)

## Impacto nos endpoints existentes

### Entregas (já implementados)

Os endpoints de entrega já possuem guard de status (`INCLUIDO` ou `AGUARDANDO_ASSINATURA`). A invalidação do TCR precisa ser adicionada **após** a operação principal (criar/editar/remover entrega) como efeito colateral.

### Plano de Trabalho (PUT ainda não implementado)

O `PUT /api/v2/plano-trabalho/:id` ainda não existe na V2. Quando for implementado, deve incluir a invalidação como parte do fluxo.

## Sugestão de implementação

Criar uma classe reutilizável que encapsule a lógica de invalidação, evitando duplicação nos 4 endpoints:

```
V2/PlanoTrabalho/Documento/
└── TCR/
    └── TCRInvalidador.php   ← invalida TCR + reverte status
```

Essa classe receberia o `DocumentoRepository`, `PlanoTrabalhoRepository` e `StatusService`, e seria chamada pelo service de cada endpoint após a operação principal.

## Fluxo esperado

```
Usuário edita entrega
    │
    ▼
EntregaService executa a operação
    │
    ▼
TCRInvalidador.invalidar(planoTrabalhoId)
    ├── Plano não está INCLUIDO? → reverte para INCLUIDO
    ├── Existe TCR? → soft delete do documento
    └── Anula documento_id no plano
```
