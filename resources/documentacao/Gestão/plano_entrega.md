# Módulo: Plano de Entregas

## Acessos  

~~~text
    MOD_PENT = Permite acesso ao menu do módulo Plano de Entregas, e consultar planos de entrega
    MOD_PENT_INCL = Permite incluir planos de entrega
    MOD_PENT_EDT = Permite editar planos de entrega
    MOD_PENT_EXCL = Permite excluir ou cancelar planos de entrega
    MOD_PENT_EDT_ATV_HOMOL = Permite editar planos de entrega que estejam no status ATIVO.
                               O plano voltará ao status HOMOLOGANDO
    MOD_PENT_EDT_ATV_ATV = Permite editar planos de entrega que estejam no status ATIVO, mantendo-os neste status
    MOD_PENT_HOMOL = Permite homologar planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação
    MOD_PENT_CANC_HOMOL = Permite cancelar a homologação dos planos de entregas das Unidades imediatamente 
                            subordinadas à sua Unidade de lotação
    MOD_PENT_AVAL = Permite avaliar planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação
    MOD_PENT_AVAL_SUBORD = Permite avaliar planos de entregas de todas as Unidades subordinadas à sua Unidade de lotação
    MOD_PENT_CANC_AVAL = Permite cancelar a avaliação dos planos de entregas das Unidades imediatamente 
                           subordinadas à sua Unidade de lotação 
    MOD_PENT_EDT_FLH = Permite alterar planos de entregas das Unidades imediatamente 
                         subordinadas à sua Unidade de lotação
    MOD_PENT_LIB_HOMOL = Permite liberar para homologação planos de entregas da sua Unidade de lotação
    MOD_PENT_CONCLUIR = Permite marcar como concluídos planos de entregas da sua Unidade de lotação
    MOD_PENT_CANC_CONCL = Permite cancelar a conclusão de planos de entregas da sua Unidade de lotação
    MOD_PENT_SUSP = Permite suspender planos de entregas da sua Unidade de lotação
    MOD_PENT_REATIVAR = Permite reativar planos de entregas suspensos, desde que sejam da sua Unidade de lotação
    MOD_PENT_ARQ = Permite arquivar planos de entregas da sua Unidade de lotação
    MOD_PENT_QQR_UND = Permite Incluir/Editar planos de entrega de qualquer Unidade, desde que possua 
                       também as respectivas MOD_PENT_INCL/MOD_PENT_EDT (independente de qualquer outra condição)
~~~

## Planos de Entrega

~~~text
Tabela: planos_entregas

Campos obrigatórios:
    numero
    nome
    data_inicio
    status
    Unidade_id
    programa_id
    criacao_usuario_id
~~~

## REGRAS DE NEGÓCIO APLICADAS AOS PLANOS DE ENTREGAS

Consideremos a seguinte hierarquia:
Unidade A
    Unidade B
        Unidade C
            Unidade D
    Unidade E
        Unidade F
        Unidade G
Consideremos também que o plano de entregas é da Unidade B.

- (RN_PENT_A) Quando um Plano de Entregas é criado adquire automaticamente o status INCLUIDO;
- (RN_PENT_B) O gestor de uma Unidade (B) e o gestor da sua Unidade-pai (A), podem iniciar a elaboração de Planos de Entrega para a Unidade B;
- (RN_PENT_C) O gestor da Unidade-pai (A) pode homologar e, se possuir a capacidade "MOD_PENT_EDT_FLH", alterar o plano de entregas de uma unidade-filha (B ou E) antes/depois de homologá-lo;
- (RN_PENT_D) Para ir para o status HOMOLOGANDO o Plano de Entregas deve ter ao menos uma entrega;
- (RN_PENT_E) Para ir para o status 'ATIVO', um Plano de Entregas precisa da Homologação do gestor da sua Unidade-pai (Unidade A), ou de servidor com a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para ela (a Unidade A);
- (RN_PENT_F) O gestor de uma Unidade deve poder visualizar os planos de entregas de todas as Unidades hierarquicamente a ele subordinadas;
- (RN_PENT_G) Uma vez homologado um Plano de Entregas, a Unidade do plano (Unidade B) está em PGD;
- (RN_PENT_H) Os planos de entregas vão gerar dados que serão enviados ao órgão central (aguardando a definição do formato);
- (RN_PENT_I) O participante poderá visualizar o Plano de Entregas de qualquer uma das suas áreas de trabalho. Área de Trabalho é qualquer unidade onde o participante esteja lotado ou tenha alguma atribuição a ela vinculada (ver [lista de atribuições possíveis](../Geral/informacoes-complementares.md));
- (RN_PENT_J) Uma Unidade de execução poderá ter mais de um Plano de Entregas com status 'HOMOLOGANDO' e 'ATIVO', desde que sejam para períodos diferentes;
- (RN_PENT_K) Após criado um plano de entregas, os seguintes campos não poderão mais ser alterados: unidade_id, programa_id;

## FLUXOS DOS PLANOS DE ENTREGAS (STATUS & AÇÕES)

![Fig. 1 - Análise dos Fluxos dos Planos de Entrega](Fluxo%20dos%20Planos%20de%20Entregas.jpg)

status possíveis: "INCLUIDO", "HOMOLOGANDO", "ATIVO", "CONCLUIDO", "AVALIADO", "SUSPENSO", "CANCELADO"

Ação: ALTERAR -> não muda o status do plano ('INCLUIDO','HOMOLOGANDO','ATIVO')
(RN_PENT_L) Condições para que um plano de entregas possa ser alterado:
    - o usuário logado precisa possuir a capacidade "MOD_PENT_EDT", o plano de entregas precisa ser válido (ou seja, nem deletado, nem arquivado e com status diferente de 'CANCELADO'), e:
        - estar com o status INCLUIDO ou HOMOLOGANDO, e o usuário logado precisa ser gestor da Unidade do plano, ou esta ser sua Unidade de lotação; ou
        - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B) e possuir a capacidade "MOD_PENT_EDT_FLH" (RN_PENT_C);  ou
        - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANO DE ENTREGA para a Unidade-pai (Unidade A) da Unidade do plano (Unidade B); ou
        - o plano de entregas precisa estar com o status ATIVO, a Unidade do plano precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL" ou "MOD_PENT_EDT_ATV_ATV"; ou
        - o usuário precisa possuir também a capacidade "MOD_PENT_QQR_UND".
(RN_PENT_M) Qualquer alteração, depois de o plano de entregas ser homologado, precisa ser notificada ao gestor da Unidade-pai (Unidade A) ou à pessoa que homologou. Essa comunicação sobre eventuais ajustes, não se aplica à Unidade instituidora.

** Alterações realizadas em planos de entregas vinculados a quaisquer unidades que sejam instituidoras não precisam ser notificadas ao gestor de sua Unidade-pai. É isso? **

Ação: ARQUIVAR -> não muda o status do plano ('CONCLUIDO','AVALIADO')
(RN_PENT_N) Condições para que um plano de entregas possa ser arquivado:
    - o plano precisa estar com o status CONCLUIDO ou AVALIADO, não ter sido arquivado, e:
        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_ARQ";

Ação: AVALIAR -> o plano adquire o status de 'AVALIADO'
(RN_PENT_O) Condições para que um plano de entregas possa ser avaliado:
    - o plano precisa estar com o status CONCLUIDO, e:
        - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
        - o usuário logado precisa possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para a Unidade do plano (Unidade B); ou
        - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_AVAL"; ou
        - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente da Unidade do plano (Unidade A e superiores), e possuir a capacidade "MOD_PENT_AVAL_SUBORD";
        - sugerir arquivamento automático (vide RI_PENT_A);
    - Estando no status "AVALIADO"
        botões-padrão:
            - 'Cancelar Avaliação'. Condições para ser exibido: vide RN_PENT_R;
            - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;;
        botões opcionais:
            - 'Arquivar'. Condições para ser exibido: vide RN_PENT_N;

Ação: CANCELAR PLANO -> o plano adquire o status de 'CANCELADO'
(RN_PENT_P) Condições para que um plano de entregas possa ser cancelado:
    - o usuário logado precisa possuir a capacidade "MOD_PENT_EXCL", o plano precisa estar em um dos seguintes status: INCLUIDO, HOMOLOGANDO, ATIVO ou CONCLUIDO; e
        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado;
(RN_PENT_Q) Quando um plano de entregas é cancelado, todas as suas entregas são canceladas, vindo a afetar as entregas dos planos de trabalho a elas relacionadas;

Ação: CANCELAR AVALIAÇÃO -> o plano retorna ao status de 'CONCLUIDO'
(RN_PENT_R) Condições para que um plano de entregas possa ter sua avaliação cancelada:
    - o plano precisa estar com o status AVALIADO, e
        - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
        - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade
            "MOD_PENT_CANC_AVAL"; ou
        - possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para a Unidade do plano (Unidade B);

Ação: CANCELAR CONCLUSÃO -> o plano retorna ao status de 'ATIVO'
(RN_PENT_S) Condições para que um plano de entregas possa ter sua conclusão cancelada:
    - o plano precisa estar com o status CONCLUIDO e o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
    - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "MOD_PENT_CANC_CONCL";

Ação: CANCELAR HOMOLOGAÇÃO -> o plano retorna ao status de 'HOMOLOGANDO'
(RN_PENT_T) Condições para que um plano de entregas possa ter sua homologação cancelada:
    - o plano precisa estar com o status ATIVO, e
        - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
        - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_CANC_HOMOL"; ou
        - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a Unidade-pai (Unidade A) da Unidade do plano (Unidade B);

Ação: CONCLUIR -> o plano adquire o status de 'CONCLUIDO'
(RN_PENT_U) Condições para que um plano de entregas possa ser concluído:
    - o plano precisa estar com o status ATIVO, e:
        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
        - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "MOD_PENT_CONCLUIR";
    - Estando no status "CONCLUIDO"
        botões-padrão:
            - 'Avaliar'. Condições para ser exibido: vide RN_PENT_O;
            - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
        botões opcionais:
            - 'Cancelar Conclusão'. Condições para ser exibido: vide RN_PENT_S;

Ação: CONSULTAR -> não muda o status do plano
(RN_PENT_V)
    - todos os participantes podem visualizar todos os planos de entrega, desde que possuam a capacidade "MOD_PENT";

Ação: DESARQUIVAR -> o plano retorna ao status que estava quando foi arquivado ('CONCLUIDO','AVALIADO')
(RN_PENT_W) Condições para que um plano de entregas possa ser desarquivado:
    - o plano precisa estar arquivado, e:
        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_ARQ";

Ação: EXCLUIR -> não muda o status do plano
(RN_PENT_X) Condições para que um plano de entregas possa ser excluído:
        - o usuário logado precisa possuir a capacidade "MOD_PENT_EXCL", o plano precisa estar com o status INCLUIDO ou HOMOLOGANDO; e
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado;

Ação: HOMOLOGAR -> o plano adquire o status de 'ATIVO'
(RN_PENT_Y) Condições para que um plano de entregas possa ser homologado:
        - o plano precisa estar com o status HOMOLOGANDO, e:
            - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B); (RN_PENT_C), ou
            - a Unidade-pai (Unidade A) for a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_HOMOL", ou
            - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a Unidade-pai (Unidade A); (RN_PENT_E)
        - A homologação do plano de entregas não se aplica à Unidade instituidora.
** Os planos de entregas vinculados a quaisquer unidades que sejam instituidoras não precisam ser homologados. É isso? **
        - Estando no status "ATIVO"
            botões-padrão:
                - 'Concluir'. Condições para ser exibido: vide RN_PENT_U;
                - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
            outras opções:
                - 'Cancelar Homologação'. Condições para ser exibido: vide RN_PENT_T;
                - 'Suspender'. Condições para ser exibido: vide RN_PENT_AD;

Ação: INCLUIR -> o plano adquire o status de 'INCLUIDO'
(RN_PENT_Z) Condições para que um plano de entregas possa ser criado:
        - o usuário logado precisa possuir a capacidade "MOD_PENT_INCL", e:
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou gestor da sua Unidade-pai (Unidade A)(RN_PENT_C); ou
            - o usuário precisa possuir a atribuição de HOMOLOGADOR DE PLANO DE ENTREGA para a Unidade-pai (Unidade A) da Unidade do plano (Unidade B) e possuir a capacidade "MOD_PENT_EDT_FLH"; ou
            - o usuário precisa possuir também a capacidade "MOD_PENT_QQR_UND";
        - Estando no status "INCLUIDO"
            botões-padrão:
                - 'Liberar para homologação'. Condições para ser exibido: vide RN_PENT_AA;
                - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
            botões opcionais:
                - botão 'Alterar'. Condições para ser exibido: vide RN_PENT_L;
                - botão 'Excluir'. Condições para ser exibido: vide RN_PENT_X;

Ação: LIBERAR PARA HOMOLOGAÇÃO -> o plano adquire o status de 'HOMOLOGANDO'
(RN_PENT_AA) Condições para que um plano de entregas possa ser liberado para homologação:
        - o plano precisa estar com o status INCLUIDO, conter ao menos uma entrega, e
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B); ou
            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e este possuir a capacidade "MOD_PENT_LIB_HOMOL"
        - Estando no status "HOMOLOGANDO"
            botões-padrão:
                - 'Homologar'. Condições para ser exibido: vide RN_PENT_Y;
                - 'Alterar'. Condições para ser exibido: vide RN_PENT_L;
                - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
            outras opções:
                - 'Retirar de Homologação'. Condições para ser exibido: vide RN_PENT_AB;
                - 'Excluir'. Condições para ser exibido: vide RN_PENT_X;

Ação: RETIRAR DE HOMOLOGAÇÃO -> o plano retorna ao status de 'INCLUIDO'
(RN_PENT_AB) Condições para que um plano de entregas possa ser retirado de homologação:
        - o plano precisa estar com o status HOMOLOGANDO, e o usuário logado precisa ser gestor da Unidade do plano (Unidade B);

Ação: REATIVAR -> o plano adquire novamente o status de 'ATIVO'
(RN_PENT_AC) Condições para que um plano de entregas possa ser reativado:
        - o plano precisa estar com o status SUSPENSO, e
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_REATIVAR"; ou
            - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);

Ação: SUSPENDER -> o plano adquire o status de 'SUSPENSO'
(RN_PENT_AD) Condições para que um plano de entregas possa ser suspenso:
        - o plano precisa estar com o status ATIVO, e
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_SUSP"; ou
            - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);
        - Estando no status "SUSPENSO"
            botões-padrão:
                - 'Reativar'. Condições para ser exibido: vide RN_PENT_AC;
                - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
            botões-opcionais:

## REGRAS DE INTERFACE APLICADAS AOS PLANOS DE ENTREGAS

(RI_PENT_A) Na janela de avaliar, já deixar o switch de arquivamento marcado, igual à janela de avaliação nas atividades (vide RN_PENT_);
(RI_PENT_B) A consulta do grid retornará inicialmente os principais Planos de Entrega do usuário logado (a opção 'principais' já vem marcada), que são:
    - os planos válidos das suas Áreas de Trabalho, e
    - se ele for gestor, os planos ativos das Unidades-pai de onde ele é gestor;
(RI_PENT_C) Por padrão, os planos de entregas retornados na listagem do grid são os que não foram arquivados nem cancelados.
(RI_PENT_D) Ao tentar excluir um plano de entregas, se as condições para sua exclusão não forem atendidas, o usuário deve ser informado das razões pelas quais o plano não foi excluído;

## QUESTÕES PENDENTES

- O que ocorre com as entregas de um Plano de Trabalho, vinculadas a um Plano de Entregas que retornou de status
MOD_PENT_CANC_CONCL_HOMOL/MOD_PENT_CANC_CONCL_ATV: o plano não deve retroagir mais de um passo de cada vez;
- Opções para o filtro: 'Incluir Unidades Superiores', 'Incluir Unidades Inferiores', 'Selecionar por Status'
- Em que situações o plano de entregas sofrerá a ação UPDATE no back-end?

[Documentação para ENTREGAS DO PLANO DE ENTREGAS](plano_entrega_entrega.md)

## Exemplos de grids do plano de entregas

- exemplo 1

~~~text
Plano de Entregas
   Unidade (Setor)
   Planejamento_estrategico_id
   Cadeia_valor_id
   Entregas
            Inicio     Fim        Indicador (vem do cadastro entrega) Meta geral Realizado Objetivos* Processos*    Atividades*          Cliente      Hmg
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

## ASSUNTOS A SEREM DISCUTIDOS NO FUTURO

Adesão a Planos de Entregas

- (RN_PENT_2_1) Ao se criar um plano de entregas através da adesão ao da Unidade-pai, aquele adquire de imediato o status "HOMOLOGANDO";
- (RN_PENT_2_2) A adesão a um Plano de Entregas da Unidade-pai precisa da homologação do gestor desta Unidade para ser ativado (ir para o status ATIVO);
- (RN_PENT_2_3) Só é possível aderir a um Plano de Entregas se este for da Unidade-pai e estiver ATIVO;
- (RN_PENT_2_4) O gestor de uma Unidade, e o gestor da sua Unidade-pai, podem realizar a adesão a um Plano de Entrega, ou seja, realizar a adesão do filho compulsoriamente;
- (RN_PENT_2_5) No caso de a adesão ser feita pelo gestor da Unidade-pai, o plano já adquire de imediato o status ATIVO;
- (RN_PENT_2_6) Se um Plano de Entregas for concluído/cancelado, e possuir planos vinculados, estes também serão concluídos/cancelados automaticamente;
- (RN_PENT_2_7) Em caso de adesão, os campos 'inicio', 'fim', 'planejamento_id', e 'cadeia_valor_id', deverão ser sempre iguais aos do plano-pai; portanto, quando um plano de entregas próprio sofrer alteração em um desses campos, todos os planos a ele vinculados deverão ser atualizados também;
- (RN_PENT_3_3) Se a Unidade A tem um plano de entrega próprio e a Unidade B aderiu ao plano de A, a Unidade C pode aderir ao plano de B e só a ele; (Hierarquia considerada: A -> B -> C)
- (RN_PENT_4_1) Ação: ADERIR (exclusivamente para planos vinculados)
    . o usuário precisa possuir também a capacidade "MOD_PENT_QQR_UND"; ou
    . o usuário logado precisa ser gestor da Unidade ou da sua Unidade-pai, ou uma destas ser sua Unidade de lotação e ele possuir a capacidade "MOD_PENT_ADERIR"; (RN_PENT_2_4) e
    . a Unidade do plano-pai precisa ser a Unidade-pai da Unidade do plano vinculado, e o plano-pai precisa estar com o status ATIVO; (RN_PENT_2_3) (RN_PENT_3_3) e
    . a Unidade não possua plano de entrega com o status ATIVO no mesmo período do plano ao qual está sendo feita a adesão;
- (RN_PENT_3_1) Quando um Plano de Entregaqs voltar no status, e possuir outros Planos de Entrega a ele vinculados, no status ATIVO, estes deverão ir para o status SUSPENSO;
- (RI_PENT_6) Na adesão a um plano de entregas:
    . o input-search dos planos de entregas exibirá apenas os ativos da Unidade-pai da Unidade selecionada;
    . a listagem dos planos de entrega não exibirá as opções de filtro.

Planos de Entrega sigilosos

- Se o Plano de Entregas for integralmente sigiloso, só poderá ser visualizado pelo gestor da sua Unidade ou por quem tiver capacidade de acesso;
- Se o Plano de Entregas for parcialmente sigiloso, as entregas não sigilosas poderão ser visualizadas por quem puder visualizar o plano de entregas, mas as sigilosas só poderão ser visualizadas pelo gestor da sua Unidade e pelos servidores que as possuirem em seus respectivos Planos de Trabalho;
- Somente o gestor da Unidade do Plano de Entregas deve ser capaz de adicionar uma entrega sigilosa a um plano de trabalho;
- Um Plano de Entregas pode ser sigiloso, e nesse caso todas as suas entregas são automaticamente sigilosas, ou possuir apenas algumas de suas entregas como sigilosas (plano parcialmente sigiloso);
- Adesão a planos sigilosos

(RI_PENT_1) O botão Aderir, na toolbar, deverá ser exibido sempre, mas para ficar habilitado:
    - o usuário logado precisa ser gestor da Unidade selecionada ou da sua Unidade-pai, ou uma destas ser sua Unidade de lotação e ele
      possuir a capacidade "MOD_PENT_ADERIR" (RN_PENT_2_4); e
    - a Unidade-pai da Unidade selecionada precisa possuir plano de entrega com o status ATIVO, que já não tenha sido vinculado pela Unidade selecionada;
(RI_PENT_2) O botão Aderir, nas linhas do grid, deverá aparecer num plano somente se:
    - o plano estiver com o status Ativo; e
    - a Unidade do plano for a Unidade-pai da Unidade selecionada pelo usuário; e
    - se o usuário for Gestor da Unidade selecionada, ou ela for sua lotação e ele possuir a capacidade "MOD_PENT_ADERIR" ; e
    - se a Unidade selecionada não possuir plano de entrega Ativo no mesmo período do plano em questão;
