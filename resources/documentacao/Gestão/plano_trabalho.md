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
2. O servidor só pode incluir plano de trabalho se ele for "participante do programa", habilitado. Se não for, somente seu chefe imediato pode inserir plano de trabalho para ele, e nesse caso, o servidor se torna participante automaticamente com o primeiro plano de trabalho!
3. Os planos de trabalho dos participantes afetados por exclusão de entregas deverão ser repactuados.
4. O plano de trabalho pode ser elaborado pelo chefe da unidade ou pelo próprio participante, e em seguida aprovado pela outra parte.
5. Como se dá o fluxo de plano de trabalho e plano de entregas quando o PGD for compulsório?
6. Toda atividade deve gerar uma entrega/resultado
7. Os planos de trabalho dos participantes contribuem direta ou indiretamente para o plano de entregas da unidade. Assim, um plano de trabalho será composto por atividades relacionadas ou não às entregas do plano de entregas da unidade.
8. A distribuição dos percentuais de carga horária do participante deve atender a três categorias de atividades: aquelas vinculadas a entregas do plano de entregas da unidade, aquelas não vinculadas a entregas mas que são do interesse da sua unidade organizacional, e por fim aquelas atividades a entregas de um plano de entregas de outra unidade organizacional.

## REGRAS DE INTERFACE

1. (RI_PTR_1) No formulário de inclusão/edição de um plano de trabalho, o input-search de plano de entregas deve ficar desabilitado nas edições e habilitado apenas nas inclusões;

## FLUXO DOS PLANOS DE TRABALHO  

~~~text

status possíveis = ['INCLUIDO', 'AGUARDANDO ASSINATURA', 'ATIVO', 'CONCLUIDO', 'AVALIADO', 'SUSPENSO', 'CANCELADO']

-----------------------------------------------------------------------------------------------------------------------------------
obrigatoriedade     | inclusão realizada  |  status     |  evento que                |  status      |  evento que       |  status
da assinatura       | pelo                |  inicial    |  faz avançar               |  seguinte    |  faz avançar      |  seguinte
--------------------+--------------------------------------------------------------------------------------------------------------
                    | participante        |  INCLUIDO   |  participante clica no     |  AGUARDANDO  |  chefe assina     |  ATIVO
    chefe           |                     |             |  botão 'assinar' (*1)      |  ASSINATURA  |  o TCR            |  
    &               +--------------------------------------------------------------------------------------------------------------
    participante    | chefe               |  INCLUIDO   |  chefe clica no            |  AGUARDANDO  |  participante     |  ATIVO
                    |                     |             |  botão 'assinar' (*2)      |  ASSINATURA  |  assina o TCR     |  
--------------------+--------------------------------------------------------------------------------------------------------------
                    | participante        |  INCLUIDO   |  chefe/participante clica  |  ATIVO       |                   |  
                    |                     |             |  no botão 'ativar' (*3)    |              |                   |  
    ninguém         +--------------------------------------------------------------------------------------------------------------
                    | chefe               |  INCLUIDO   |  chefe/participante clica  |  ATIVO       |                   |  
                    |                     |             |  no botão 'ativar' (*3)    |              |                   |  
--------------------+--------------------------------------------------------------------------------------------------------------
                    | participante        |  INCLUIDO   |  participante clica no     |  AGUARDANDO  |  chefe assina     |  ATIVO
                    |                     |             |  botão 'assinar' (*4)      |  ASSINATURA  |  o TCR            |  
    chefe           +--------------------------------------------------------------------------------------------------------------
                    | chefe               |  INCLUIDO   |  chefe clica               |  ATIVO       |                   |  
                    |                     |             |  no botão 'ativar' (*5)    |              |                   |  
--------------------+--------------------------------------------------------------------------------------------------------------
                    | participante        |  INCLUIDO   |  participante              |  ATIVO       |                   |  
                    |                     |             |  assina o TCR              |              |                   |  
    participante    +--------------------------------------------------------------------------------------------------------------
                    | chefe               |  INCLUIDO   |  chefe clica               |  AGUARDANDO  |  participante     |  
                    |                     |             |  no botão 'assinar' (*6)   |  ASSINATURA  |  assina o TCR     |  
--------------------+--------------------------------------------------------------------------------------------------------------

(*1) para o botão 'assinar' estar disponível para o usuário, ele precisa ser o criador do plano de trabalho, este possuir ao menos uma entrega, e o TCR, se obrigatório/existente, já estar assinado pelo participante; 
(*2) para o botão 'assinar' estar disponível para o gestor, o plano de trabalho precisa possuir ao menos uma entrega, e o TCR, se obrigatório/existente, já estar assinado pelo gestor;
(*3) para o botão 'ativar' estar disponível para o gestor/usuário, ...
(*4) para o botão 'assinar' estar disponível para o gestor/usuário, ...
(*5) para o botão 'ativar' estar disponível para o gestor/usuário, ...
(*6) para o botão 'assinar' estar disponível para o gestor/usuário, ...


* Estando no status "INCLUIDO"
        padrão: 
            - se o usuário logado for gestor da unidade do plano de trabalho, ou esta for sua unidade de lotação e ele possuir a capacidade "MOD_PENT_LIB_HOMOL", exibir o botão 'Liberar para homologação' 
            (vai para HOMOLOGANDO)
            - caso contrário, exibir o 'botão Consultar'
        outras opções: 
            - se o usuário logado for gestor da unidade do plano, ou esta for sua unidade de lotação e ele possuir a capacidade "MOD_PENT_EDT", exibir o botão 'Alterar'

* Estando no status "HOMOLOGANDO"
        padrão: 
            - se o usuário logado for gestor da unidade-pai da unidade do plano, ou se esta for sua lotação e ele possuir a capacidade "MOD_PENT_HOMOL", apresentar o botão 'Homologar' (vai para ATIVO)
            - se o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação e ele possuir a capacidade "MOD_PENT_EDT", exibir o botão 'Alterar'
            - se o usuário logado for um usuário comum, exibir o 'botão Consultar'
        outras opções:
            - se for um plano próprio: se o usuário logado for gestor da unidade ou esta ser sua unidade de lotação e ele possuir a capacidade "MOD_PENT_RET_HOMOL", exibir o botão 'Retirar de Homologação' 
            (volta para o status "INCLUIDO") 
            - se for um plano vinculado: se o usuário logado for gestor da unidade ou esta ser sua unidade de lotação e ele possuir a capacidade "MOD_PENT_EXCL", exibir o botão 'Excluir'

* Estando no status "ATIVO"
        padrão:
            - o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação e ele possuir a capacidade "MOD_PENT_CONCLUIR", exibir o botão 'Concluir' (vai para o status CONCLUIDO);
            - caso contrário, exibir o 'botão Consultar';
        outras opções:
            - se o usuário logado for gestor da unidade-pai da unidade do plano, ou esta for sua unidade de lotação e ele possuir a capacidade "MOD_PENT_CANC_HOMOL", apresentar o botão 'Cancelar Homologação' (volta para o status HOMOLOGANDO);
            - se o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação e ele possuir a capacidade "MOD_PENT_SUSP", exibir o botão 'Suspender' (vai para o status SUSPENSO);

* Estando no status "CONCLUIDO"
        padrão:
            - se o usuário logado for gestor da unidade-pai da unidade do plano, ou se esta for a sua unidade de lotação e ele possuir a capacidade "MOD_PENT_AVAL", exibir o botão 'Avaliar' (vai para o status AVALIADO);
            - se o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação e ele possuir a capacidade "MOD_PENT_CANC_CONCL", exibir o botão 'Cancelar Conclusão' 
            (vai para o status ATIVO);

* Estando no status "SUSPENSO"
        padrão:
            - se o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação e ele possuir a capacidade "MOD_PENT_REATIVAR", exibir o 
            botão 'Reativar' (vai para o status ATIVO);

* Estando no status "AVALIADO"
        padrão:
            - se o usuário logado for gestor da unidade-pai da unidade do plano, ou se esta for a sua unidade de lotação e ele possuir a capacidade
            "MOD_PENT_CANC_AVAL", exibir o botão 'Cancelar Avaliação' (vai para o status CONCLUIDO);
            - caso contrário, exibir o 'botão Consultar';
        outras opções:
            - se o plano não estiver arquivado: 
                - se o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação e ele possuir a capacidade "MOD_PENT_ARQ", exibir o botão 'Arquivar';
~~~~


********************* OBSERVACOES *********************
- Ao entrar na tela de incluir o plano, pesquisar se a unidade (lotacao) do usuário tem apenas um plano de entrega ativo e já selecionar ele na tela
- Se o usuário não for o gestor da unidade, já selecionar o próprio usuário automaticamente
- Data fim deve ser maior que data inicio (não pode nem ser igual)
