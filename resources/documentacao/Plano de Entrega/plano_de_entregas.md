# Módulo: Plano de Entregas

## Acessos  

~~~text
    MOD_PENT_CONS = Permite consultar planos de entrega
    MOD_PENT_INCL = Permite incluir planos de entrega
    MOD_PENT_EDT = Permite editar planos de entrega
    MOD_PENT_EXCL = Permite excluir planos de entrega

    MOD_PENT_HOMOL = Permite homologar planos de entregas das unidades imediatamente subordinadas à sua unidade de lotação principal
    MOD_PENT_CANC_HOMOL = Permite cancelar a homologação dos planos de entregas das unidades imediatamente subordinadas à sua unidade de lotação principal
    MOD_PENT_AVAL = Permite avaliar planos de entregas das unidades imediatamente subordinadas à sua unidade de lotação principal
    MOD_PENT_AVAL_SUBORD = Permite avaliar planos de entregas de todas as unidades subordinadas à sua unidade de lotação principal
    MOD_PENT_CANC_AVAL = Permite cancelar a avaliação dos planos de entregas das unidades imediatamente subordinadas à sua unidade de lotação principal 
    MOD_PENT_CANC_AVAL_SUBORD = Permite cancelar a avaliação dos planos de entregas de todas as unidades subordinadas à sua unidade de lotação principal (*)
    MOD_PENT_EDT_FLH = Permite alterar planos de entregas das unidades imediatamente subordinadas à sua unidade de lotação principal

    MOD_PENT_LIB_HOMOL = Permite liberar para homologação planos de entregas da sua unidade de lotação principal
    MOD_PENT_RET_HOMOL = Permite retirar de homologação planos de entregas da sua unidade de lotação principal
    MOD_PENT_CONCLUIR = Permite marcar como concluídos planos de entregas da sua unidade de lotação principal
    MOD_PENT_ADERIR = Permite aderir a planos de entregas da unidade-pai sua unidade de lotação principal
    MOD_PENT_CANC_CONCL = Permite cancelar a conclusão de planos de entregas da sua unidade de lotação principal, retornando ao status ATIVO
    MOD_PENT_SUSP = Permite suspender planos de entregas da sua unidade de lotação principal
    MOD_PENT_REATIVAR = Permite reativar planos de entregas suspensos, desde que sejam da sua unidade de lotação principal
    MOD_PENT_ARQ = Permite arquivar planos de entregas da sua unidade de lotação principal
    MOD_PENT_DESARQ = Permite desarquivar planos de entregas da sua unidade de lotação principal
    MOD_PENT_CANCELAR = Permite cancelar planos de entregas da sua unidade de lotação principal
~~~

## Planos de Entrega

- Tabela: planos_entregas

~~~text
    numero (*)
    nome (*)
    inicio (*)
    fim
    data_cancelamento
    data_arquivamento
    status ('INCLUINDO', 'HOMOLOGANDO', 'ATIVO', 'CONCLUIDO', 'AVALIADO', 'SUSPENSO')
    (id/created_at/updated_at/data_inicio/data_fim)
        unidade_id (*)
        cadeia_valor_id
        planejamento_id
        cancelamento_usuario_id
    (*) campo obrigatório
~~~

## REGRAS DE NEGÓCIO APLICADAS AOS PLANOS DE ENTREGAS

1. PLANOS DE ENTREGA PRÓPRIOS
    1. (RN_PENT_1_1) Quando um Plano de Entregas próprio é criado adquire automaticamente o status INCLUINDO;
    2. (RN_PENT_1_2) O gestor de uma unidade e o gestor da sua unidade-pai, podem iniciar a elaboração de Planos de Entrega para a sua unidade;
    3. (RN_PENT_1_3) O chefe da unidade-pai pode homologar e, se possuir a capacidade "MOD_PENT_EDT_FLH", alterar o plano de entregas antes/depois de homologá-lo;
    4. (RN_PENT_1_4) Para ir para o status HOMOLOGANDO o Plano de Entregas deve ter ao menos uma entrega;
2. PLANOS DE ENTREGA VINCULADOS
    1. (RN_PENT_2_1) Ao se criar um plano de entregas através da adesão ao da unidade-pai, aquele adquire de imediato o status "HOMOLOGANDO";
    2. (RN_PENT_2_2) A adesão a um Plano de Entregas da unidade-pai precisa da homologação do Chefe desta unidade para ser ativado (ir para o status ATIVO);
    3. (RN_PENT_2_3) Só é possível aderir a um Plano de Entregas se este for da unidade-pai e estiver ATIVO;
    4. (RN_PENT_2_4) O gestor de uma unidade, e o gestor da sua unidade-pai, podem realizar a adesão a um Plano de Entrega;
    5. (RN_PENT_2_5) No caso de a adesão ser feita pelo chefe da unidade-pai, o plano já adquire de imediato o status ATIVO;
    6. (RN_PENT_2_6) Se um Plano de Entregas for concluído/cancelado, e possuir planos vinculados, estes também serão concluídos/cancelados automaticamente;
    7. (RN_PENT_2_7) Em caso de adesão, os campos 'inicio', 'fim', 'planejamento_id', e 'cadeia_valor_id', deverão ser sempre iguais aos do plano-pai; portanto, quando um plano de entregas próprio sofrer alteração em um desses campos, todos os planos a ele vinculados deverão ser atualizados também;
3. TODOS OS PLANOS DE ENTREGA
    1. (RN_PENT_3_1) Ao voltar no status, e já tiver outros planos de entrega (ou planos de trabalhos) vinculados ATIVO, estes deverão ir para SUSPENSO;
    2. (RN_PENT_3_2) Um Plano de Entregas, seja próprio ou não, precisa da Homologação do chefe da sua unidade-pai, ou de servidor com a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para esta unidade, para ser ativado (ir para o status ATIVO);
    3. (RN_PENT_3_3) Se a Unidade A tem um plano de entrega próprio e a Unidade B aderiu ao plano de A, a Unidade C pode aderir ao plano de B e só a ele;
    4. (RN_PENT_3_4) O chefe de uma unidade deve poder visualizar os planos de entregas de todas as unidades hierarquicamente a ele subordinadas;
    5. (RN_PENT_3_5) Uma vez homologado um Plano de Entregas, a unidade do plano está em PGD (Um Plano de Trabalho só pode ser vinculado a planos de entregas homologados);
    6. (RN_PENT_3_6) Os planos de entregas vão gerar dados que serão enviados ao órgão central (aguardando a definição do formato);
    7. (RN_PENT_3_7) O participante poderá visualizar o Plano de Entregas de qualquer Unidade em que esteja lotado;
    8. (RN_PENT_3_8) Uma unidade de execução poderá ter mais de um Plano de Entregas com status 'HOMOLOGANDO' e 'ATIVO', desde que sejam para períodos diferentes;
    9. (DESENVOLVIMENTO FUTURO) Um Plano de Entregas pode ser sigiloso, e nesse caso todas as suas entregas são automaticamente sigilosas, ou possuir apenas algumas de suas entregas como sigilosas (plano parcialmente sigiloso);
    10. (DESENVOLVIMENTO FUTURO) Se o Plano de Entregas for integralmente sigiloso, só poderá ser visualizado pelo Chefe da sua unidade ou por quem tiver capacidade de acesso;
    11. (DESENVOLVIMENTO FUTURO) Se o Plano de Entregas for parcialmente sigiloso, as entregas não sigilosas poderão ser visualizadas por quem puder visualizar o plano de entregas, mas as sigilosas só poderão ser visualizadas pelo Chefe da sua unidade e pelos servidores que as possuirem em seus respectivos Planos de Trabalho;
    12. (DESENVOLVIMENTO FUTURO) Somente o Chefe da unidade do Plano de Entregas deve ser capaz de adicionar uma entrega sigilosa a um plano de trabalho;
4. VALIDAÇÕES NECESSÁRIAS PARA AS AÇÕES PREVISTAS NO FLUXO
   1. OK(RN_PENT_4_1) ADERIR (exclusivamente para planos vinculados)
        1. o usuário logado precisa ser gestor da unidade ou da sua unidade-pai, ou uma destas ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_ADERIR"; (RN_PENT_2_4) e
        2. a unidade do plano-pai precisa ser a unidade-pai da unidade do plano vinculado, e o plano-pai precisa estar com o status ATIVO; (RN_PENT_2_3) (RN_PENT_3_3) e
        3. a unidade não possua plano de entrega com o status ATIVO no mesmo período do plano ao qual está sendo feita a adesão;
   2. OK(RN_PENT_4_2) ALTERAR
        1. o plano precisa estar com o status INCLUINDO ou HOMOLOGANDO, e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_EDT"; ou
        2. o plano precisa ser válido, o usuário logado precisa possuir a capacidade "MOD_PENT_EDT_FLH", e ser gestor da unidade-pai do plano ou possuir a atribuição de HOMOLOGADOR DE PLANO DE ENTREGA para a unidade-pai do plano; (RN_PENT_1_3) ou
        3. o plano precisa estar com o status ATIVO, a unidade do plano ser a unidade de lotação principal do usuário logado, e ele possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL" ou "MOD_PENT_EDT_ATV_ATV";
   3. (RN_PENT_4_3) ARQUIVAR
        1. o plano precisa estar com o status AVALIADO e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_ARQ";
   4. (RN_PENT_4_4) AVALIAR
        1. o plano precisa estar com o status CONCLUIDO e o usuário logado precisa ser gestor da unidade-pai do plano, ou possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para esta unidade; ou
        2. o plano precisa estar com o status CONCLUIDO, o usuário logado precisa ser gestor de alguma unidade da linha hierárquica ascendente da unidade do plano, e possuir a capacidade "MOD_PENT_AVAL_SUBORD";
   5. (RN_PENT_4_5) CANCELAR AVALIAÇÃO
        1. o plano precisa estar com o status AVALIADO e o usuário logado precisa ser gestor da unidade-pai do plano, ou possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para esta unidade;
   6. (RN_PENT_4_6) CANCELAR CONCLUSÃO
        1. o plano precisa estar com o status CONCLUIDO e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_CANC_CONCL";
   7. (RN_PENT_4_7) CANCELAR HOMOLOGAÇÃO
        1. o plano precisa estar com o status ATIVO e o usuário logado precisa ser gestor da unidade-pai do plano, ou possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a unidade-pai do plano;
   8. (RN_PENT_4_8) CONCLUIR
        1. o plano precisa estar com o status ATIVO e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_CONCLUIR";
   9. OK(RN_PENT_4_9) CONSULTAR
        1. todos os participantes podem visualizar todos os planos de entrega;
   10. (RN_PENT_4_10) EXCLUIR
        1. o plano precisa estar com o status INCLUINDO ou HOMOLOGANDO; e
        2. o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_EXCL";
        3. se o plano não atender às condições acima, o usuário deve ser informado das razões pelas quais o plano não foi excluído;
   11. (RN_PENT_4_11) HOMOLOGAR
        1. o plano precisa estar com o status HOMOLOGANDO e o usuário logado ser gestor da unidade-pai do plano, ou possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a unidade-pai; (RN_PENT_1_3)(RN_PENT_3_2)
   12. OK(RN_PENT_4_12) INSERIR (exclusivamente para planos próprios)
        1. o usuário logado precisa ser gestor da unidade do plano, ou gestor da sua unidade-pai; ou
        2. o usuário precisa possuir a atribuição de HOMOLOGADOR DE PLANO DE ENTREGA para a unidade-pai do plano e possuir a capacidade "MOD_PENT_EDT_FLH";
   13. (RN_PENT_4_13) LIBERAR PARA HOMOLOGAÇÃO
        1. o plano precisa estar com o status INCLUINDO; e
        2. o usuário logado precisa ser gestor da unidade do plano;
   14. (RN_PENT_4_14) RETIRAR DE HOMOLOGAÇÃO
        1. o plano precisa estar com o status HOMOLOGANDO, e o usuário logado precisa ser gestor da unidade do plano;
   15. (RN_PENT_4_15) REATIVAR
        1. o plano precisa estar com o status SUSPENSO e o usuário logado precisa ser gestor da unidade do plano, ou ser gestor de alguma unidade da linha hierarquica ascendente da unidade do plano;
   16. (RN_PENT_4_16) SUSPENDER
        1. o plano precisa estar com o status ATIVO e o usuário logado precisa ser gestor da unidade do plano, ou ser gestor de alguma unidade da linha hierarquica ascendente da unidade do plano;

## REGRAS DE INTERFACE APLICADAS ÀS VIEWS

1. (RI_PENT_1) O botão Aderir, na toolbar, deverá ser exibido sempre, mas para ficar habilitado:
    - o usuário logado precisa ser gestor da unidade selecionada ou da sua unidade-pai, ou uma destas ser sua unidade de lotação principal e ele
      possuir a capacidade "MOD_PENT_ADERIR" (RN_PENT_2_4); e
    - a unidade-pai da unidade selecionada precisa possuir plano de entrega com o status ATIVO, que já não tenha sido vinculado pela unidade selecionada;
2. (RI_PENT_2) O botão Aderir, nas linhas do grid, deverá aparecer num plano somente se:
    - a unidade do plano for a unidade-pai da unidade selecionada pelo usuário; e
    - se o usuário for Gestor da unidade selecionada, ou ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_ADERIR" ; e
    - o plano precisa estar Ativo; e
    - se a unidade selecionada não possuir plano de entrega Ativo no mesmo período do plano em questão;
3. (RI_PENT_3) Na janela de avaliar, já deixar o swith de arquivamento marcado, igual à janela de avaliação nas demandas;
4. (RI_PENT_4) A consulta do grid retornará inicialmente os Planos de Entrega das unidades onde o usuário logado possui lotação (ou seja, a opção "minhas" já vem inicialmente marcada);

## REGRAS A SEREM MELHOR EXAMINADAS

1. (DESENVOLVIMENTO FUTURO) Adesão a planos sigilosos
2. Qualquer alteração, depois de o plano ser homologado, precisa ser notificada ao chefe da unidade-pai ou à pessoa que homologou;
3. Arquivamento automático do plano de entregas após ser avaliado;
4. MOD_PENT_CANC_CONCL_HOMOL/MOD_PENT_CANC_CONCL_ATV: o plano não deve retroagir mais de um passo de cada vez;
5. Opções para o filtro: 'Incluir Unidades Superiores', 'Incluir Unidades Inferiores', 'Selecionar por Status'

## FLUXO DOS PLANOS DE ENTREGAS  

~~~text  
* Estando no status "INCLUINDO"
        padrão: 
            - se o usuário logado for gestor da unidade do plano de entregas, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_LIB_HOMOL", exibir o botão 'Liberar para homologação' 
            (vai para HOMOLOGANDO)
            - caso contrário, exibir o 'botão Consultar'
        outras opções: 
            - se o usuário logado for gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_EDT", exibir o botão 'Alterar'

* Estando no status "HOMOLOGANDO"
        padrão: 
            - se o usuário logado for gestor da unidade-pai do plano, ou se esta for sua lotação principal e ele possuir a capacidade "MOD_PENT_HOMOL", apresentar o botão 'Homologar' (vai para ATIVO)
            - se o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_EDT", exibir o botão 'Alterar'
            - se o usuário logado for um usuário comum, exibir o 'botão Consultar'
        outras opções:
            - se for um plano próprio: se o usuário logado for gestor da unidade ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_RET_HOMOL", exibir o botão 'Retirar de Homologação' 
            (volta para o status "INCLUINDO") 
            - se for um plano vinculado: se o usuário logado for gestor da unidade ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_EXCL", exibir o botão 'Excluir'

* Estando no status "ATIVO"
        padrão:
            - se o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_CONCLUIR", exibir o botão 'Concluir' (vai para o status CONCLUIDO);
            - caso contrário, exibir o 'botão Consultar';
        outras opções:
            - se o usuário logado for gestor da unidade-pai do plano, ou esta for sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_CANC_HOMOL", apresentar o botão 'Cancelar Homologação' (volta para o status HOMOLOGANDO);
            - se o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_SUSP", exibir o botão 'Suspender' (vai para o status SUSPENSO);

* Estando no status "CONCLUIDO"
        padrão:
            - se o usuário logado for gestor da unidade-pai do plano, ou se esta for a sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_AVAL", exibir o botão 'Avaliar' (vai para o status AVALIADO);
            - se o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_CANC_CONCL", exibir o botão 'Cancelar Conclusão' 
            (vai para o status ATIVO);

* Estando no status "SUSPENSO"
        padrão:
            - se o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_REATIVAR", exibir o 
            botão 'Reativar' (vai para o status ATIVO);

* Estando no status "AVALIADO"
        padrão:
            - se o usuário logado for gestor da unidade-pai do plano, ou se esta for a sua unidade de lotação principal e ele possuir a capacidade
            "MOD_PENT_CANC_AVAL", exibir o botão 'Cancelar Avaliação' (vai para o status CONCLUIDO);
            - caso contrário, exibir o 'botão Consultar';
        outras opções:
            - se o plano não estiver arquivado: 
                - se o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_ARQ", exibir o botão 'Arquivar';
~~~~

## Entregas do Plano de Entregas

- Tabela: planos_entregas_entregas

~~~text
    inicio (*)
    fim
    descricao (*)
    homologado (*)
    meta (*)
    realizado
    progresso_esperado
    progresso_realizado
    destinatario
    (id/created_at/updated_at/data_inicio/data_fim)
        plano_entrega_id (*)
        entrega_id (*)
        entrega_pai_id
        unidade_id (*)

    (*) campo obrigatório
~~~

## Regras de Negócio aplicadas às entregas de um Plano de Entregas

1. ENTREGAS DO PLANO DE ENTREGA
    1. (RN_ENT_PENT_1_1) As entregas que compõem um Plano de Entregas pertencem todas à Unidade Executora do Plano;
    2. (RN_ENT_PENT_1_2) As entregas incluídas/alteradas na criação/edição de um Plano de Entregas precisam ser homologadas pelo gestor da unidade hierarquicamente superior;
    3. (RN_ENT_PENT_1_3) As entregas incluídas/alteradas na criação/edição de um Plano de Entregas precisam estar dentro do prazo de execução de um plano de entregas;
    
## REGRAS DE INTERFACE APLICADAS ÀS VIEWS

1. (RI_ENT_PENT_1) O botão Aderir, na toolbar, deverá ser exibido sempre, mas para ficar habilitado:
    - as abas de objetivos e processos na tela de inserção das entregas apenas serão exibidas se o usuário selecionar o planejamento e/ou a cadeia de valor na tela anterior ;
    
## REGRAS DE NEGÓCIO A SEREM DISCUTIDAS

- O gestor da unidade de execução **deverá também cadastrar, quando da elaboração do Plano de Entregas,** os tipos de "ocorrência" (ocorrências tradicionais, férias, cursos, etc) que não possuem meta, prazo ou cliente. Essas ocorrências poderão ser selecionadas pelos participantes quando da elaboração do plano de trabalho, com respectiva alocação, ao selecionar a opção: Não vinculada a entrega.

## Exemplos de grids

- exemplo 1

~~~text
Plano de Entregas
   Unidade (Setor)
   Planejamento_estrategico_id
   Cadeia_valor_id
   Entregas
            Inicio     Fim        Indicador (vem do cadastro entrega) Metal geral Realizado Objetivos* Processos*    Atividades*          Cliente      Hmg
      Ent1: 01/01/2022 -          Quantidade                          1000        200       Ob1, Ob1   Proc1, Proc2  Tip.Ativ1, Tip.Atv2  uOrg1, uOrg2 S
      Ent2: 01/01/2022 30/12/2022 %                                   100         70        Ob2                                                        S
      Ent3: 01/01/2022 30/12/2024 Qualitativo                         Excelente   Bom                                                                  S      Ent4: 09/12/2022 30/12/2022 ...                                                                                                                  N
* Deverá haver pelo menos 1
~~~  

- exemplo 2

~~~text
Nome                         Data Inicio Data Fim
XXXXXXXXXXXXXXXXXXXXXXXXXXXX xx/xx/xxxx  xx/xx/xxxx
Planejamento institucional      Cadeia de valor
[XXXXXXXXXXXXXXXXXXXXXX (v)]    [XXXXXXXXXXXXXXXXXXXXXX (v)]
Entregas ------------------------------------------------------------------------------------------
        Data Inicio                                      Objetivos/
Entrega Data Fim    Indicador   Meta geral  Realizado    Processos/Atividades   Cliente  Hmg  
-------+-----------+-----------+-----------+------------+----------------------+--------+----+-----
XXXXXX  XX/XX/XXXX   XXXXXXXXX   9999999     9999999      (XXXXX)(XXXX)(XXXXX)  XXXXXXX  (OK) 
XXXXXX  XX/XX/XXXX                                        (XXX)(XXXXX)                        [...]
                                                                                        | Alterar  |
                                                                                        | Excluir  |
                                                                                        | Homologar|
~~~  
