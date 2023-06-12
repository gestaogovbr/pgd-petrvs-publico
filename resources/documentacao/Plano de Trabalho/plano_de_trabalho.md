# Módulo: Plano de Trabalho

## Acessos  

~~~text
    MOD_PTR - Permite acessar item menu plano de trabalho
    MOD_PTR_CONS - Permite consultar plano de trabalho
    MOD_PTR_EDT - Permite editar planos de trabalho
    MOD_PTR_EXCL - Permite excluir planos de trabalho
    MOD_PTR_INCL - Permite incluir planos de trabalho
    MOD_PTR_USERS_CONS - Permite consultar planos de trabalho de usuários fora da lotação
    MOD_PTR_USERS_EXCL - Permite excluir planos de trabalho de usuários fora da lotação
    MOD_PTR_USERS_INCL - Permite incluir planos de trabalho de usuários fora da lotação
    MOD_PTR_INCL_SEM_LOT - Permite incluir planos de trabalho para usuários não lotado na unidade do plano
    MOD_PTR_INTSC_DATA - Permite incluir planos de trabalho para usuários que já possuem planos no período de mesma modalidade
~~~

## Planos de Trabalho

- Tabela: planos

~~~text
    carga_horaria
    tempo_total
    tempo_proporcional
    data_inicio_vigencia (*)
    data_fim_vigencia (*)
    numero (*)
    ganho_produtividade (*)
    forma_contagem_carga_horaria (*)
    (id/created_at/updated_at/data_inicio/data_fim)
        programa_id (*)
        usuario_id (*)
        unidade_id (*)
        tipo_modalidade_id (*)
        documento_id
        plano_entrega_id

    (*) campo obrigatório
~~~

## REGRAS DE NEGÓCIO APLICADAS AOS PLANOS DE TRABALHO

1. (RN_PTR_1) Após criado um plano de trabalho, o seu plano de entregas não pode mais ser alterado. Em consequência dessa regra, os seguintes campos não poderão mais ser alterados: plano_entrega_id, unidade_id, programa_id;

## REGRAS DE INTERFACE

1. (RI_PTR_1) No formulário de inclusão/edição de um plano de trabalho, o input-search de plano de entregas deve ficar desabilitado nas edições e habilitado apenas nas inclusões;