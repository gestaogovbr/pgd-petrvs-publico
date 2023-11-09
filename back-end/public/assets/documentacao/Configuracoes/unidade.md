# Módulo: Unidades

## CAPACIDADES  

~~~text
    MOD_UND - Permite consultar unidade
    MOD_UND_EDT - Permite editar unidade
    MOD_UND_EXCL - Permite excluir unidade
    MOD_UND_INCL - Permite incluir unidade
    MOD_UND_UNIR - Permite unificar unidade
    MOD_UND_TUDO - Permite consultar qualquer unidade independente de subordinação
    MOD_UND_INATV - Permite inativar uma unidade
    MOD_UND_INTG - Permite gerenciar integrantes da unidade
    MOD_UND_INTG_INCL - Permite incluir integrantes da unidade
    MOD_UND_INTG_EDT - Permite editar integrantes da unidade
    MOD_UND_INTG_EXCL - Permite excluir integrantes da unidade
~~~

## BANCO DE DADOS

~~~text
Tabela: unidades

Campos obrigatórios:
    sigla
    nome
    instituidora
    atividades_arquivamento_automatico
    atividades_avaliacao_automatico
    planos_prazo_comparecimento
    planos_tipo_prazo_comparecimento
    distribuicao_forma_contagem_prazos
    entrega_forma_contagem_prazos
    autoedicao_subordinadas
    entidade_id
~~~

## REGRAS DE NEGÓCIO

- (RN_UND_A) Não poderá haver mais de uma unidade com a mesma sigla abaixo da mesma unidade-pai como ATIVA
- (RN_UND_B) Não poderá haver mais de uma unidade com o mesmo código como ATIVA
- (RN_UND_C) Permitir inserir unidades sem código, e na exportação para API considerar o mesmo código da primeira unidade superior com código
- (RN_UND_D) Podem ser cadastradas e atualizadas automaticamente a partir da integração com o SIAPE, quando habilitado
- (RN_UND_E) Quando utilizando integração com o SIAPE, as unidades serão inativadas quando não constarem na lista de unidades vindas do SIAPE, exceto as que se enquadrarem na regra RN_UND_F
- (RN_UND_F) Unidades cadastradas (com código vazio) devem permanecer ATIVO mesmo após a execução da rotina de integração com o SIAPE
- (RN_UND_G) Uma unidade poderá possuir um gestor, um gestor substituto, e um gestor delegado, mas devem ser servidores distintos
- (RN_UND_)
- (RN_UND_)
- (RN_UND_)
- (RN_UND_)
- (RN_UND_)
- (RN_UND_)

## REGRAS DE INTERFACE




