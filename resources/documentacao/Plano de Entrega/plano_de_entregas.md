# Módulo: Plano de Entregas
## Acessos  
~~~text
    MOD_PENT_CONS = Permite consultar planos de entrega
    MOD_PENT_INCL = Permite incluir planos de entrega
    MOD_PENT_EDT = Permite editar planos de entrega
    MOD_PENT_EXCL = Permite excluir planos de entrega

    MOD_PENT_HOMOL = Permite homologar planos de entregas das unidades imediatamente subordinadas
    MOD_PENT_CANC_HOMOL = Permite cancelar a homologação dos planos de entregas das unidades imediatamente subordinadas
    MOD_PENT_APROV = Permite aprovar planos de entregas das unidades imediatamente subordinadas
    MOD_PENT_CANC_APROV = Permite cancelar a aprovação dos planos de entregas das unidades imediatamente subordinadas
    MOD_PENT_APROV_SUBORD = Permite aprovar planos de entregas de todas as unidades subordinadas à sua unidade de lotação principal
    MOD_PENT_CANC_APROV_SUBORD = Permite cancelar a aprovação dos planos de entregas de todas as unidades subordinadas à sua unidade de lotação principal
    MOD_PENT_HOMOL_SUBORD = Permite homologar planos de entregas de todas as unidades subordinadas à sua unidade de lotação principal
    MOD_PENT_CANC_HOMOL_SUBORD = Permite cancelar a homologação dos planos de entregas de todas as unidades subordinadas à sua unidade de lotação principal
    MOD_PENT_AVAL = Permite avaliar planos de entregas das unidades imediatamente subordinadas
    MOD_PENT_CANC_AVAL = Permite cancelar a avaliação dos planos de entregas das unidades imediatamente subordinadas
    MOD_PENT_AVAL_SUBORD = Permite avaliar planos de entregas de todas as unidades subordinadas à sua unidade de lotação principal
    MOD_PENT_CANC_AVAL_SUBORD = Permite cancelar a avaliação dos planos de entregas de todas as unidades subordinadas à sua unidade de lotação principal

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
## Regras de Negócio aplicadas aos Planos de Entregas
1.  PLANOS DE ENTREGA PRÓPRIOS
    1.  Um Plano de Entregas próprio precisa da Homologação pela chefia imediata ou de pessoa autorizada para ser ativado (ir para o status ATIVO);
    2.  Para ir para o status HOMOLOGANDO o Plano de Entregas próprio deve ter ao menos uma entrega;
    3.  O gestor da Unidade Executora e o gestor da sua unidade-pai (desde que tenha a capacidade "XXXXXXXXXX") podem iniciar a elaboração de Planos de Entrega da Unidade Executora;
2.  PLANOS DE ENTREGA VINCULADOS
    1.  A adesão a um Plano de Entregas da unidade-pai precisa da aprovação do Chefe daquela unidade para ser ativado (ir para o status ATIVO);
    2.  Só é possível aderir a um Plano de Entregas da unidade-pai, se este estiver EM CURSO;
    3.  O gestor da Unidade Executora e o gestor da sua unidade-pai (desde que tenha a capacidade "XXXXXXXXXX") podem realizar a adesão de um Plano de Entrega para a Unidade Executora. No caso de ser a unidade-pai o plano já vai direto para o status ATIVO;
3.  TODOS OS PLANOS DE ENTREGA
    1.  Um plano de entregas é considerado EM CURSO se não tiver sido deletado, não tiver sido cancelado, não tiver sido arquivado, e possuir o status ATIVO;
    2.  Se a Unidade A tem um plano de entrega próprio e a Unidade B aderiu ao plano de A, a Unidade C pode aderir ao plano de B;
    3.  O superior hierárquico deve poder visualizar o conjunto dos planos de entregas das unidades hierarquicamente a ele subordinadas;
    4.  Uma vez homologado ou aprovado um Plano de Entregas, a unidade do plano está em PGD;
    5.  O superior hierárquico pode apenas homologar ou, antes de fazê-lo, realizar ajustes no Plano de Entregas;
    6.  Os planos de entregas vão gerar dados que serão enviados ao órgão central;
    7.  O participante conseguirá visualizar o Plano de Entregas da sua Unidade de Execução de forma automática, mas poderá navegar pela estrutura organizacional para visualizar planos de entregas de outras unidades que utilizam o mesmo sistema;
4.  ANALISAR MELHOR ESSAS REGRAS
    1.  Se a unidade B tiver um plano próprio, a unidade C pode aderir ao plano da unidade A?
    2.  Unidade “A” cria o plano de entregas -> unidade “B” adere ao plano de “A” -> Unidade “C” adere ao plano de “B” -> Unidade “B” cria um novo plano -> o plano da unidade “C” é encerrado -> unidade “C” tem opção de aderir ao novo plano de “B” ou criar um novo plano próprio;
    3.  Ao voltar no status, e já tiver outros planos de entrega ou planos de trabalhos vinculados ATIVO, deverá ir para SUSPENSO;
    4.  A adesão a um Plano de Entregas de uma unidade somente pode ser realizada pelo gestor de uma de suas unidades-filha ou pelo gestor de qualquer uma de suas unidades subordinadas;
    5.  O Plano de Entregas somente pode ser elaborado pelo gestor da unidade para sua própria unidade ou para aquelas subordinadas a ele;
    6.  A unidade de execução poderá ter mais de um Plano de Entregas com status 'HOMOLOGANDO' e 'ATIVO', desde que sejam para períodos diferentes;
    7.  Incluir campo para tornar todo o Plano de Entregas SIGILOSO ou permitir que algumas entregas não o sejam!
## Detalhes das views
1. O botão Aderir, na toolbar, deverá ser exibido sempre, mas ficará habilitado apenas se:
    - o usuário logado for chefe da unidade selecionada, ou ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_ADERIR"; e
    - se a unidade selecionada não possuir plano de entrega ativo; e
    - se a unidade-pai da unidade selecionada possuir plano de entrega EM CURSO;
2. O botão Aderir, nas linhas do grid, deverá aparecer num plano somente se:
    - a unidade do plano for a unidade-pai da unidade selecionada pelo usuário; e
    - se o usuário for Gestor da unidade selecionada, ou possuir a capacidade "MOD_PENT_ADERIR" (já que ele sempre será lotado em qualquer uma das selecionadas); e
    - se o plano estiver EM CURSO; e
    - se a unidade selecionada não possuir plano de entrega EM CURSO;
3. Na janela de avaliar, já deixar o swith de arquivamento marcado, igual à janela de avaliação nas demandas;
4. Em caso de adesão, os campos 'inicio', 'fim', 'planejamento_id', e 'cadeia_valor_id', deverão ser sempre iguais aos do plano-pai; portanto, quando um plano de entregas próprio sofrer alteração em um desses campos, todos os planos a ele vinculados deverão ser atualizados também;
## Comportamento do Grid
- A consulta do grid retornará inicialmente os Planos de Entrega a depender do perfil/permissões do usuário logado:
    1.  se for um usuário comum
        1.  os Planos de Entrega das suas unidades de lotação, que estejam EM CURSO;
    2.  se for gestor de uma unidade
        1.  os planos EM CURSO das suas unidades de lotação
        2.  os planos EM CURSO de todas as suas unidades subordinadas
        3.  os planos das unidades-filhas das unidades que ele for gestor, e que possuam o status HOMOLOGANDO
    3.  se possuir a capacidade "MOD_PENT_HOMOL_SUBORD"
        1.  os planos EM CURSO das suas unidades de lotação
        2.  os planos EM CURSO de todas as suas unidades subordinadas
        3.  os planos de todas as unidades subordinadas à sua unidade de lotação principal, e que possuam o status HOMOLOGANDO
- Nas opções do filtro o usuário poderá visualizar os planos de outras unidades, de acordo com as opções de filtro a ele disponibilizadas;
- Opções para o filtro:
    - ANALISAR COM MAIS DETALHES: 'Incluir Unidades Superiores', 'Incluir Unidades Inferiores', 'Selecionar por Status'
## Fluxos do Plano de Entregas  
1.  Plano de entregas próprio  
~~~text  
  * Ao incluir fica com o status "INCLUINDO"
  * Estando no status "INCLUINDO"
        dynamicButtons: 
            - se o usuário logado for gestor da unidade do plano de entregas, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_LIB_HOMOL", exibir o botão Liberar para homologação 
              (vai para HOMOLOGANDO)
            - caso contrário, exibir o botão Consultar
        dynamicOptions: 
            - se o usuário logado for gestor da unidade do plano, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_EDT", exibir o botão Editar plano de entrega
  * Estando no status "HOMOLOGANDO"
        dynamicButtons: 
            - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a 
              capacidade "MOD_PENT_HOMOL_SUBORD", apresentar o botão Homologar (vai para ATIVO)
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_EDT", Editar Plano de Entrega
            - se o usuário logado for um usuário comum, exibir o botão Consultar
        dynamicOptions:
            - se o usuário logado for gestor da unidade ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_RET_HOMOL", exibir o botão Retirar de Homologação 
              (volta para o status "INCLUINDO") 
  * Estando no status "ATIVO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_CONCLUIR", exibir o botão Concluir (vai para o status CONCLUIDO);
            - caso contrário, exibir o botão Consultar;
        dynamicOptions:
            - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a 
              capacidade "MOD_PENT_CANC_HOMOL_SUBORD", apresentar o botão Cancelar Homologação (volta para o status HOMOLOGANDO);
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_SUSP", exibir o botão Suspender (vai para o status SUSPENSO);
  * Estando no status "CONCLUIDO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a capacidade
              "MOD_PENT_AVAL_SUBORD", exibir o botão Avaliar (vai para o status AVALIADO);
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_CANC_CONCL", exibir o botão Cancelar Conclusão 
              (vai para o status ATIVO);
  * Estando no status "SUSPENSO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_REATIVAR", exibir o 
              botão Reativar (vai para o status ATIVO);
  * Estando no status "AVALIADO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a capacidade
              "MOD_PENT_CANC_AVAL_SUBORD", exibir o botão Cancelar Avaliação (vai para o status CONCLUIDO);
            - caso contrário, exibir o botão Consultar;
        dynamicOptions:
            - se o plano não estiver arquivado: 
                - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_ARQ", exibir o botão Arquivar;
~~~~ 
2.  Plano de entregas vinculado ao da unidade-pai  
~~~text  
  * Ao aderir fica com o status "APROVANDO"
  * Estando no status "APROVANDO"
        dynamicButtons: 
            - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a 
              capacidade "MOD_PENT_APROV_SUBORD", apresentar o botão Aprovar (vai para ATIVO);
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_EDT", Editar Plano de Entrega (alguns campos!);
            - se o usuário logado for um usuário comum, exibir o botão Consultar;
  * Estando no status "ATIVO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_CONCLUIR", exibir o botão Concluir (vai para o status CONCLUIDO);
            - caso contrário, exibir o botão Consultar;
        dynamicOptions:
            - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a 
              capacidade "MOD_PENT_CANC_APROV_SUBORD", apresentar o botão Cancelar Aprovação (volta para o status APROVANDO);
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_SUSP", exibir o botão Suspender (vai para o status SUSPENSO);
  * Estando no status "CONCLUIDO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a capacidade
              "MOD_PENT_AVAL_SUBORD", exibir o botão Avaliar (vai para o status AVALIADO);
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_CANC_CONCL", exibir o botão Cancelar Conclusão 
              (vai para o status ATIVO);
  * Estando no status "SUSPENSO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_REATIVAR", exibir o 
              botão Reativar (vai para o status ATIVO);
  * Estando no status "AVALIADO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade-pai do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a capacidade
              "MOD_PENT_CANC_AVAL_SUBORD", exibir o botão Cancelar Avaliação (vai para o status CONCLUIDO);
            - caso contrário, exibir o botão Consultar;
        dynamicOptions:
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
