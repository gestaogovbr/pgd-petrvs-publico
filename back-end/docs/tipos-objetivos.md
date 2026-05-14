# Tipos Objetivos

## Objetivo

Queremos qualificar os `planos_entregas_entregas_objetivos` em tipos para que seja facilitada. Essa qualificação servirá para a contabilização das horas de esforço despendido em entregas relacionados a elas.

## Decisões de escopo e autorização

- **Escopo**: tenant-wide. Tipos de objetivo são compartilhados por todo o tenant do PGD.
- **Leitura**: qualquer usuário autenticado do tenant.
- **Escrita (CUD)**: restrita ao perfil `ADMINISTRADOR_MASTER` (role-based, sem lógica de owner).
- Não há campo `usuario_id` na tabela — a autorização é puramente por nível de perfil.

## Planejamento

- Criar tabelas e modelos `tipos_objetivos`, relacionando com `planejamentos_objetivos` (FK), mas sem constraint obrigatória para permitir que hajam objetivos não tipificados;
- Adicionar controller/service seguindo os V2 de CRUD `tipos_objetivos`;
  - Operações de escrita (CUD) restritas a ADM_MASTER (verificação por nível de perfil)
  - A leitura será feita tanto numa listagem de tipos quanto num dropdown para atribuição de `planos_entregas_entregas_objetivos.tipos_objetivos`
- Criar um end-point para consulta da cadeia de entregas relacionadas (mais detalhes no futuro);

**Importante:** os patterns da V2 devem ser seguidos requests -> validação no controller -> service -> validação de negócios -> (orquestração algorítimica con consultas ao DB em repositories) -> response

## Hierarquia de objetivos

```
objetivo_superior -> objetivo de outra programa, normalmente de uma unidade superior
      |
      V
objetivo_pai -> objetivo do programa que contém objeitvos como seus descendente
  L objetivo -> objetivos subordinados, que compoem um objetivo maior
```

### Exemplo

    Siglas: 
    - Diretoria de TI - DTI;
      - Departamento de treinamentos de TI - DepTTI;
      - Departamento de geral de TI - DepGTI;
        - Divisão de desenvolvimento - DivDev
  
- **DTI**
  - objetivo pai(DTI): aumentar a segurança da informação (3 entregas de 10h) **(30 + 200 + 84(DepTTI) + 555(DepGTI) = 869h)**
    - objetivo (DTI): revisar o KYC dos stakeholders (1 entrega de 200h)
---
- **DepTTI**
  - objetivo superior(DTI): aumentar a segurança da informação
    - objetivo pai(DepTTI): ampliar o conhecimento do pessoal a respeito de temas relevantes de segurança da informação: (1 entrega de 12h) **(12 + 32 + 40 = 84h)**
      - objetivo (DepTTI): dar visibilidade ao tema: STRIDE (4 entregas de 8 h cada: 32h)
      - objetivo (DepTTI): dar visibilidade ao tema: prevenção contra phishing (4 entregas de 10 h cada: 40h)
---
- **DepGTI**
  - objetivo superior(DTI): aumentar a segurança da informação
    - objetivo pai(DepGTI): atualizar os softwares (4 entregas de 50h : 200h) **(200 + 355(DivDev) = 555h)**
---
- **DivDev**
  - objetivo pai(DivDev): aumentar o entrosamento do time (3 entregas de 30h: 90 h) (90 + 10 = 100h) `Não contabiliza no objetivo superior(DepGTI), consequentemente, não contabiliza no objetivo superior(DTI)`
    - objetivo (DivDev): melhorar a comunicação interna (1 entrega de 10h)
  - objetivo superior(DepGTI): atualizar os softwares
    - objetivo pai(DivDev): manter estabilidade da comunicação com APIs legado (2 entregas de 150h: 300h) **(300 + 20 + 35 = 355h)**
      - objetivo (DivDev): aumentar transparência dos débitos técnicos (2 entregas de 10h: 20h)
      - objetivo (DivDev): tornar as decisões e atualizações mais compreensíveis para os times não-técnicos (7 entregas de 5h: 35h)

## End-pont - `/api/v2/planejamentos-objetivos/:uuid/esforco-total`

SQL original: há margem para melhorias

```sql
SELECT
    po.id AS objetivo_id,
    po.nome AS objetivo_nome,
    po.objetivo_pai_id,
    po.objetivo_superior_id,
    pla.nome AS planejamento_nome,
 
    COUNT(DISTINCT pee.id) AS total_entregas,
 
    ROUND(
        COALESCE(
            SUM(
                (
                    (u.cod_jornada / 7.0)
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                ) * (pte.forca_trabalho / 100.0)
            ),
            0
        ),
        2
    ) AS esforco_total_horas
 
FROM planejamentos_objetivos po
 
JOIN planejamentos pla
    ON pla.id = po.planejamento_id
 
LEFT JOIN planos_entregas_entregas_objetivos peeo
    ON peeo.planejamento_objetivo_id = po.id
   AND peeo.deleted_at IS NULL
 
LEFT JOIN planos_entregas_entregas pee
    ON pee.id = peeo.entrega_id
   AND pee.deleted_at IS NULL
 
LEFT JOIN planos_trabalhos_entregas pte
    ON pte.plano_entrega_entrega_id = pee.id
   AND pte.deleted_at IS NULL
 
LEFT JOIN planos_trabalhos pt
    ON pt.id = pte.plano_trabalho_id
   AND pt.deleted_at IS NULL
   AND pt.status IN ('CONCLUIDO')
 
LEFT JOIN usuarios u
    ON u.id = pt.usuario_id
   AND u.deleted_at IS NULL
 
WHERE po.deleted_at IS NULL
 
GROUP BY
    po.id,
    po.nome,
    po.objetivo_pai_id,
    po.objetivo_superior_id,
    pla.nome
 
ORDER BY
    po.nome;
```

Response:

```jsonc
[
  // { "fbb701c4-4ed8-4439-a15f-9e7ca69af3f1", sum(esforco_total_filhos) }, { "outro_filho_de_fbb701c4-4ed8-4439-a15f-9e7ca69af3f1", sum(esforco_total_horas) }
  {
        "objetivo_id" : "198597e2-b53a-4ee5-ae8b-6a885c60f192",
        "objetivo_nome" : "Iniciativa - Aperfeiçoamento da Logística de Deslocamento dos Servidores",
        "objetivo_pai_id" : "fbb701c4-4ed8-4439-a15f-9e7ca69af3f1",
        "objetivo_superior_id" : null,
        "planejamento_nome" : "Planejamento Estratégico MGI 2023-2027",
        "planejamento_superior_id" : null,
        "total_entregas" : 0,
        "esforco_total_horas" : 0.00
    }
    //...
]
```

### Esquematizando
```
  o id passado será o de obja, mas quero todos os descendentes do obj-pai, e os do obj-sup

  SEP=SUM(entregas_do_proprio_obj)

  [obj-sup, horas=SUM(horas)]
    L[obj-sup-filho, horas=N=H+Y+SEP]
  [obj-pai, horas=P=Z+Y+SEP]
   L[objb, horas=Z=H+SEP]
   | L[objb-filho, horas=H=SEP, superior=obj-sup]
   L[obja, horas=Y=X+SEP, superior=obj-sup]
      L[obja-filho, horas=X=Xa+Xb+SEP]
        L[obja-filho-filhoa, horas=Xa=SEP]
        L[obja-filho-filhob, horas=Xb=SEP]

```

### Iteration v2 - **This is how it's working now**

For being more economic with the processing I intend to make it on demand.
0. GET `/api/v2/planejamentos-objetivos/:uuid/esforco-total`
1. we'll look for the descsendants of a objective {:uuid}, and count its effort hours for its completed entregas. organizing as a tree
   1. The organization will be made on the front-end, we just need the reponse as stated before {objetivo_id, objetivo_nome, objetivo_pai{nome, id}, objetivo_superior{nome, id}, ....}
2. On the front-end, we'll have the original objective's tree with branches to the name of the obetivo_pai and objetivo_superior (if they exist), they will have the name and a `more details` button. 
3. Third: upon clicking the `more details` -> Step 0 with superior/pai's id and so on


### `GET /api/v2/planejamento/objetivo/:uuid/entregas`

Retorna as entregas vinculadas ao objetivo, agrupadas por unidade.

Response:

```jsonc
{
  "success": true,
  "data": [
    {
      "unidade_id": "a1b2c3d4-...",
      "unidade_nome": "Departamento de TI",
      "unidade_sigla": "DTI",
      "entregas": [
        {
          "id": "e1f2g3h4-...",
          "descricao_entrega": "Revisar KYC dos stakeholders",
          "data_inicio": "2024-01-01 00:00:00",
          "data_fim": "2024-06-30 00:00:00",
          "progresso_esperado": "50.00",
          "progresso_realizado": "30.00",
          "homologado": true
        }
      ]
    },
    {
      "unidade_id": "b2c3d4e5-...",
      "unidade_nome": "Divisão de Desenvolvimento",
      "unidade_sigla": "DivDev",
      "entregas": [
        {
          "id": "m9n0o1p2-...",
          "descricao_entrega": "Migrar APIs legado",
          "data_inicio": "2024-02-01 00:00:00",
          "data_fim": "2024-12-31 00:00:00",
          "progresso_esperado": "75.00",
          "progresso_realizado": "60.00",
          "homologado": true
        }
      ]
    }
  ]
}
```

### Estratégia de Cache

A resposta é um `map<uuid, EsforcoNodeDTO>` onde cada nó tem `filhos: string[]` (UUIDs). Duas estratégias possíveis:

- **Chave**: `esforco-node:{objetivo_id}`
- **Valor**: `{esforco_proprio, filhos: string[], objetivo_pai, objetivo_superior}`
- Ao consultar um UUID raiz:
  1. Buscar o nó raiz no cache
  2. Se hit, percorrer `filhos` recursivamente buscando cada um no cache
  3. Se miss em qualquer nó, query apenas os nós faltantes
  4. Recomputar `esforco_total_horas` somando `esforco_proprio` dos descendentes
- **Invalidação**: granular — ao mudar uma entrega, , invalida apenas os nós diretamente afetados + seus ancestrais

**Prós**: evita re-queries para subárvores já visitadas; ideal para árvores grandes.
**Contras**: complexidade de implementação; precisa de invalidação em cascata (ascendente).
**Pergunta**: e a busca? E o query?

### `/api/v2/planejamentos-objetivos/:uuid/entregas`

Returns a list of `planos_entregas_entregas`, the entregas should be groupped by the unidade