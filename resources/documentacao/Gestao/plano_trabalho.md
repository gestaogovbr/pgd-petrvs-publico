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
    (id/created_at/updated_at/deleted_at)
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
2. Os planos de trabalho dos participantes afetados por exclusão de entregas deverão ser repactuados.
3. O plano de trabalho pode ser elaborado pelo chefe da unidade ou pelo próprio participante, e em seguida aprovado pela outra parte.
4. Como se dá o fluxo de plano de trabalho e plano de entregas quando o PGD for compulsório?
5. Toda atividade deve gerar uma entrega/resultado
6. Os planos de trabalho dos participantes contribuem direta ou indiretamente para o plano de entregas da unidade. Assim, um plano de trabalho será composto por atividades relacionadas ou não às entregas do plano de entregas da unidade.
7. A distribuição dos percentuais de carga horária do participante deve atender a três categorias de atividades: aquelas vinculadas a entregas do plano de entregas da unidade, aquelas não vinculadas a entregas mas que são do interesse da sua unidade organizacional, e por fim aquelas atividades a entregas de um plano de entregas de outra unidade organizacional.

## REGRAS DE INTERFACE

1. (RI_PTR_1) No formulário de inclusão/edição de um plano de trabalho, o input-search de plano de entregas deve ficar desabilitado nas edições e habilitado apenas nas inclusões;

## FLUXO DOS PLANOS DE TRABALHO  

~~~text

status = ['HOMOLOGANDO', 'ATIVO', 'CONCLUIDO', 'AVALIADO', 'SUSPENSO', 'CANCELADO']


'HOMOLOGANDO' - 'ATIVO' (Quando assina) - CONCLUIDO - AVALIADO
              - 'REPROVADO'


Plano de trabalho            Ativo (Expirado)
                             Faltam X dias para conclusão automatica


Tipos de Modalidade
  Dias para conclusão automática apos expirar o plano de trabalho: 10 dias



~~~

********************* OBSERVACOES *********************
- Ao entrar na tela de incluir o plano, pesquisar se a unidade (lotacao) do usuário tem apenas um plano de entrega ativo e já selecionar ele na tela
- Se o usuário não for o gestor da unidade, já selecionar o próprio usuário automaticamente
- Data fim deve ser maior que data inicio (não pode nem ser igual)
