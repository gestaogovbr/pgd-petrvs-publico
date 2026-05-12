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
objetivo_superior -> objetivo de outra unidade, normalmente superior
      |
      V
objetivo_pai -> objetivo da unidade que contém objeitvos atrelados
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