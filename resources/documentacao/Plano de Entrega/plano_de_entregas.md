# Módulo: Plano de Entregas

## Acessos  

    ~~~text
        MOD_PENT_CONS = Permite consultar planos de entrega
        MOD_PENT_INCL = Permite incluir planos de entrega
        MOD_PENT_EDT = Permite editar planos de entrega
        MOD_PENT_EXCL = Permite excluir planos de entrega

        MOD_PENT_HOMOL = Permite homologar planos de entregas das unidades imediatamente subordinadas
        MOD_PENT_CANC_HOMOL = Permite cancelar a homologação dos planos de entregas das unidades imediatamente subordinadas
        MOD_PENT_HOMOL_SUBORD = Permite homologar planos de entregas das unidades imediatamente subordinadas à sua unidade de lotação principal
        MOD_PENT_CANC_HOMOL_SUBORD = Permite cancelar a homologação dos planos de entregas das unidades imediatamente subordinadas à sua unidade de lotação principal
        MOD_PENT_AVAL = Permite avaliar planos de entregas das unidades imediatamente subordinadas
        MOD_PENT_CANC_AVAL = Permite cancelar a avaliação dos planos de entregas das unidades imediatamente subordinadas
        MOD_PENT_AVAL_SUBORD = Permite avaliar planos de entregas das unidades imediatamente subordinadas à sua unidade de lotação principal
        MOD_PENT_CANC_AVAL_SUBORD = Permite cancelar a avaliação dos planos de entregas das unidades imediatamente subordinadas à sua unidade de lotação principal

        MOD_PENT_LIB_HOMOL = Permite liberar para homologação planos de entregas da sua unidade de lotação principal
        MOD_PENT_RET_HOMOL = Permite retirar de homologação planos de entregas da sua unidade de lotação principal
        MOD_PENT_CONCLUIR = Permite marcar como concluídos planos de entregas da sua unidade de lotação principal
        MOD_PENT_ADERIR = Permite aderir a planos de entregas da unidade-pai sua unidade de lotação principal
        MOD_PENT_CANC_CONCL = Permite cancelar a conclusão de planos de entregas da sua unidade de lotação principal
        MOD_PENT_SUSP = Permite suspender planos de entregas da sua unidade de lotação principal
        MOD_PENT_REATIVAR = Permite reativar planos de entregas suspensos, desde que sejam da sua unidade de lotação principal
        MOD_PENT_ARQ = Permite arquivar planos de entregas da sua unidade de lotação principal
        MOD_PENT_DESARQ = Permite desarquivar planos de entregas da sua unidade de lotação principal
        MOD_PENT_CANCELAR = Permite cancelar planos de entregas da sua unidade de lotação principal

        MOD_PENT_TOD_SUP = Permite visualizar todas as unidades superiores
        MOD_PENT_IMD_SUP = Permite visualizar somente a unidade imediatamente superior
        MOD_PENT_TOD_SUBORD = Permite visualizar todas as unidades subordinadas
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

~~~text
    REGRAS DE NEGÓCIO APLICADAS AOS PLANOS DE ENTREGAS
~~~

1. PLANOS DE ENTREGA PRÓPRIOS
    1. (RN_PENT_1_1) Quando um Plano de Entregas próprio é criado adquire automaticamente o status INCLUINDO;
    2. O gestor de uma unidade e o gestor da sua unidade-pai, podem iniciar a elaboração de Planos de Entrega para a sua unidade;
    3. O superior hierárquico pode apenas homologar ou, antes de fazê-lo, realizar ajustes em um Plano de Entregas próprio;
2. PLANOS DE ENTREGA VINCULADOS
    1. Ao se criar um plano de entregas através da adesão ao da unidade-pai, aquele adquire de imediato o status "HOMOLOGANDO";
    2. A adesão a um Plano de Entregas da unidade-pai precisa da homologação do Chefe desta unidade para ser ativado (ir para o status ATIVO);
    3. Só é possível aderir a um Plano de Entregas se este for da unidade-pai e estiver ATIVO;
    4. O gestor de uma unidade, e o gestor da sua unidade-pai, podem realizar a adesão a um Plano de Entrega;
    5. No caso de a adesão ser feita pelo chefe da unidade-pai, o plano já adquire de imediato o status ATIVO;
    6. Se um Plano de Entregas for concluído/cancelado, e possuir planos vinculados, estes também serão concluídos/cancelados automaticamente;
    7. Em caso de adesão, os campos 'inicio', 'fim', 'planejamento_id', e 'cadeia_valor_id', deverão ser sempre iguais aos do plano-pai; portanto, quando um plano de entregas próprio sofrer alteração em um desses campos, todos os planos a ele vinculados deverão ser atualizados também;
3. TODOS OS PLANOS DE ENTREGA
    1. Para ir para o status HOMOLOGANDO o Plano de Entregas deve ter ao menos uma entrega;
    2. Um Plano de Entregas, seja próprio ou não, precisa da Homologação do chefe da sua unidade-pai, ou de servidor lotado nesta unidade e que possua a  capacidade "MOD_PENT_HOMOL", para ser ativado (ir para o status ATIVO);
    3. Se a Unidade A tem um plano de entrega próprio e a Unidade B aderiu ao plano de A, a Unidade C pode aderir ao plano de B e só a ele;
    4. O superior hierárquico deve poder visualizar o conjunto dos planos de entregas de todas as unidades hierarquicamente a ele subordinadas;
    5. Uma vez homologado um Plano de Entregas, a unidade do plano está em PGD (Um Plano de Trabalho só pode ser vinculado a planos de entregas homologados);
    6. Os planos de entregas vão gerar dados que serão enviados ao órgão central;
    7. O participante poderá visualizar o Plano de Entregas da sua Unidade de forma automática;
    8. Uma unidade de execução poderá ter mais de um Plano de Entregas com status 'HOMOLOGANDO' e 'ATIVO', desde que sejam para períodos diferentes;
    9. Um Plano de Entregas pode ser sigiloso, e nesse caso todas as suas entregas são automaticamente sigilosas, ou possuir apenas algumas de suas entregas como sigilosas (plano parcialmente sigiloso);
    10. Se o Plano de Entregas for integralmente sigiloso, só poderá ser visualizado pelo Chefe da sua unidade;
    11. Se o Plano de Entregas for parcialmente sigiloso, as entregas não sigilosas poderão ser visualizadas por quem puder visualizar o plano de entregas, mas as sigilosas só poderão ser visualizadas pelo Chefe da sua unidade e pelos servidores que as possuirem em seus respectivos Planos de Trabalho;
    12. Somente o Chefe da unidade do Plano de Entregas deve ser capaz de adicionar uma entrega sigilosa a um plano de trabalho;
4. ANALISAR MELHOR ESSAS REGRAS
    Ao voltar no status, e já tiver outros planos de entrega (ou planos de trabalhos) vinculados ATIVO, estes deverão ir para SUSPENSO;
    Adesão a planos sigilosos

    ~~~text
    REGRAS DE NEGÓCIO APLICADAS ÀS VIEWS
    ~~~

5. (RN_PENT_5) O botão Aderir, na toolbar, deverá ser exibido sempre, mas ficará habilitado apenas se:
    - o usuário logado for gestor da unidade selecionada, ou ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_ADERIR"; e
    - se a unidade-pai da unidade selecionada possuir plano de entrega Ativo que já não tenha sido vinculado pela unidade selecionada;
6. (RN_PENT_6) O botão Aderir, nas linhas do grid, deverá aparecer num plano somente se:
    - a unidade do plano for a unidade-pai da unidade selecionada pelo usuário; e
    - se o usuário for Gestor da unidade selecionada, ou ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_ADERIR" ; e
    - se o plano estiver Ativo; e
    - se a unidade selecionada não possuir plano de entrega Ativo no mesmo período do plano em questão;
7. Na janela de avaliar, já deixar o swith de arquivamento marcado, igual à janela de avaliação nas demandas;

    ...................FALTA VER COM O GENISSON DAQUI PRA FRENTE

8. A consulta do grid retornará inicialmente os Planos de Entrega a depender do perfil/permissões do usuário logado:
    1. se for um usuário comum
        1. os Planos de Entrega das suas unidades de lotação, que estejam ATIVOS;
    2. se for gestor de uma unidade
        1. os planos ATIVOS das suas unidades de lotação
        2. os planos ATIVOS de todas as suas unidades subordinadas
        3. os planos das unidades-filhas das unidades em que ele seja gestor, e que possuam o status HOMOLOGANDO
    3. se possuir a capacidade "MOD_PENT_HOMOL_SUBORD"
        1. os planos ATIVOS das suas unidades de lotação
        2. os planos ATIVOS de todas as suas unidades subordinadas
        3. os planos de todas as unidades subordinadas à sua unidade de lotação principal, e que possuam o status HOMOLOGANDO
9. Nas opções do filtro o usuário poderá visualizar os planos de outras unidades, de acordo com as opções de filtro a ele disponibilizadas;
    1. Opções para o filtro:
        1. ANALISAR COM MAIS DETALHES: 'Incluir Unidades Superiores', 'Incluir Unidades Inferiores', 'Selecionar por Status'

~~~text
FLUXO DOS PLANOS DE ENTREGAS  
~~~

    ~~~text  
    * Estando no status "INCLUINDO"
            padrão: 
                - se o usuário logado for gestor da unidade do plano de entregas, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_LIB_HOMOL", exibir o botão Liberar para homologação 
                (vai para HOMOLOGANDO)
                - caso contrário, exibir o botão Consultar
            outras opções: 
                - se o usuário logado for gestor da unidade do plano, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_EDT", exibir o botão Editar plano de entrega

    * Estando no status "HOMOLOGANDO"
            padrão: 
                - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a 
                capacidade "MOD_PENT_HOMOL_SUBORD", apresentar o botão Homologar (vai para ATIVO)
                - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_EDT", Editar Plano de Entrega
                - se o usuário logado for um usuário comum, exibir o botão Consultar
            outras opções:
                - se for um plano próprio: se o usuário logado for gestor da unidade ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_RET_HOMOL", exibir o botão Retirar de Homologação 
                (volta para o status "INCLUINDO") 
                - se for um plano vinculado: se o usuário logado for gestor da unidade ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_EXCL", exibir o botão Excluir

    * Estando no status "ATIVO"
            padrão:
                - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_CONCLUIR", exibir o botão Concluir (vai para o status CONCLUIDO);
                - caso contrário, exibir o botão Consultar;
            outras opções:
                - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a 
                capacidade "MOD_PENT_CANC_HOMOL_SUBORD", apresentar o botão Cancelar Homologação (volta para o status HOMOLOGANDO);
                - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_SUSP", exibir o botão Suspender (vai para o status SUSPENSO);

    * Estando no status "CONCLUIDO"
            padrão:
                - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a capacidade
                "MOD_PENT_AVAL_SUBORD", exibir o botão Avaliar (vai para o status AVALIADO);
                - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_CANC_CONCL", exibir o botão Cancelar Conclusão 
                (vai para o status ATIVO);

    * Estando no status "SUSPENSO"
            padrão:
                - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_REATIVAR", exibir o 
                botão Reativar (vai para o status ATIVO);

    * Estando no status "AVALIADO"
            padrão:
                - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a capacidade
                "MOD_PENT_CANC_AVAL_SUBORD", exibir o botão Cancelar Avaliação (vai para o status CONCLUIDO);
                - caso contrário, exibir o botão Consultar;
            outras opções:
                - se o plano não estiver arquivado: 
                    - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_ARQ", exibir o botão Arquivar;
    ~~~~

## Entregas do Plano de Entregas

- Tabela: planos_entregas_entregas

~~~text
    inicio (*)
    fim
    descricao (*)
    cliente (*)
    homologado (*)
    meta (*)
    realizado
    (id/created_at/updated_at/data_inicio/data_fim)
        plano_entrega_id (*)
        entrega_id (*)
        entrega_pai_id

    (*) campo obrigatório
~~~

## Regras de Negócio aplicadas às entregas de um Plano de Entregas

- As entregas que compõem um Plano de Entregas pertencem todas à Unidade Executora do Plano;  
- As entregas incluídas/alteradas na criação/edição de um Plano de Entregas precisam ser homologadas pelo gestor da unidade hierarquicamente superior;

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
