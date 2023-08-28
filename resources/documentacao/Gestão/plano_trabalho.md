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

- (RN_PTR_A) Quando um Plano de Trabalho é criado adquire automaticamente o status INCLUIDO;

- O Plano de Trabalho só vai para o status ATIVO quando atender os critérios de assinatura, que estarão definidos no TCR com base nas configurações do Programa;
- O Plano de Trabalho precisará ser repactuado quando alguma de suas entregas estiver vinculada a uma entrega de plano de entregas cancelada;
- O servidor só pode incluir plano de trabalho para si próprio e somente se ele for "participante do programa", habilitado. Se não o for, somente o chefe da unidade executora poderá inserir plano de trabalho para ele, e nesse caso, com o primeiro plano de trabalho incluído, o servidor tornar-se-á automaticamente um participante habilitado;
- Toda atividade deve gerar uma entrega/resultado;
- Os planos de trabalho dos participantes contribuem direta ou indiretamente para o plano de entregas da unidade. Assim, um plano de trabalho será composto por atividades relacionadas ou não às entregas do plano de entregas da unidade;
- A distribuição dos percentuais de carga horária do participante deve atender a três categorias de atividades: aquelas vinculadas a entregas do plano de entregas da unidade, aquelas não vinculadas a entregas mas que são do interesse da sua unidade organizacional, e por fim aquelas vinculadas a entregas de um plano de entregas de outra unidade organizacional.
- (RN_PTR_) As entregas de um Plano de Trabalho só podem ser vinculadas a entregas de Planos de Entregas homologados (vide RN_PENT_G)
- Na criação/alteração de um Plano de Trabalho só podem ser criadas/alteradas entregas se vinculas a entregas de planos de entregas não canceladas;

## REGRAS DE INTERFACE APLICADAS AOS PLANOS DE TRABALHO

- (RI_PTR_A) No formulário de inclusão/edição de um plano de trabalho:
    . se o usuário logado não for gestor da Unidade do plano (Unidade B), o inputSearch de usuário já vem preenchido com o seu nome e permanece bloqueado;
    . os input-search de unidade, programa e usuario devem ficar desabilitados nas edições e habilitado apenas nas inclusões;

## FLUXOS DOS PLANOS DE TRABALHO  

~~~text

status possíveis = ['INCLUIDO', 'AGUARDANDO ASSINATURA', 'ATIVO', 'CONCLUIDO', 'AVALIADO', 'RECURSO', 'SUSPENSO', 'CANCELADO']

-----------------------------------------------------------------------------------------------------------------------------------
obrigatoriedade     | inclusão realizada  |  status     |  evento que                |  status      |  evento que       |  status
da assinatura       | pelo                |  inicial    |  faz avançar               |  seguinte    |  faz avançar      |  seguinte
--------------------+--------------------------------------------------------------------------------------------------------------
                    | participante        |  INCLUIDO   |  participante clica no     |  AGUARDANDO  |  os chefes assinam|  ATIVO
    chefe           |                     |             |  botão 'assinar' (*1)      |  ASSINATURA  |  o TCR            |  
    &               +--------------------------------------------------------------------------------------------------------------
    participante    | chefe               |  INCLUIDO   |  chefe clica no            |  AGUARDANDO  |  particip/chefe   |  ATIVO
    & ch imediato   |                     |             |  botão 'assinar' (*2)      |  ASSINATURA  |  assinam o TCR    |  
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

## QUESTÕES PENDENTES

. a data final deve ser maior que a data inicial (não pode nem ser igual);