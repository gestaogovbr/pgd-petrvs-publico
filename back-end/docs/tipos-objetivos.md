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