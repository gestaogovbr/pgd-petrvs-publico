# MÓDULO: Plano de Entregas

## CAPACIDADES

~~~text
    MOD_PENT = Permite acesso ao menu e consultas do módulo Plano de Entregas.
    MOD_PENT_INCL = Permite incluir planos de entregas.
    MOD_PENT_EDT = Permite editar planos de entregas.
    MOD_PENT_EXCL = Permite excluir planos de entregas.
    MOD_PENT_CNC = Permite cancelar planos de entregas.
    MOD_PENT_EDT_ATV_HOMOL = Permite editar planos de entregas que estejam no status ATIVO. O plano voltará ao status HOMOLOGANDO.
    MOD_PENT_EDT_ATV_ATV = Permite editar planos de entregas que estejam no status ATIVO, mantendo-os neste status.
    MOD_PENT_HOMOL = Permite homologar planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação.
    MOD_PENT_CANC_HOMOL = Permite cancelar a homologação dos planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação.
    MOD_PENT_AVAL = Permite avaliar planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação.
    MOD_PENT_AVAL_SUBORD = Permite avaliar planos de entregas de todas as Unidades subordinadas à sua Unidade de lotação.
    MOD_PENT_CANC_AVAL = Permite cancelar a avaliação dos planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação.
    MOD_PENT_EDT_FLH = Permite alterar planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação.
    MOD_PENT_LIB_HOMOL = Permite liberar para homologação planos de entregas da sua Unidade de lotação.
    MOD_PENT_RET_HOMOL = Permite retirar de homologação planos de entregas da sua Unidade de lotação.
    MOD_PENT_CONC = Permite marcar como concluídos planos de entregas da sua Unidade de lotação.
    MOD_PENT_CANC_CONCL = Permite cancelar a conclusão de planos de entregas da sua Unidade de lotação.
    MOD_PENT_SUSP = Permite suspender planos de entregas da sua Unidade de lotação.
    MOD_PENT_RTV = Permite reativar planos de entregas suspensos, desde que sejam da sua Unidade de lotação.
    MOD_PENT_ARQ = Permite arquivar planos de entregas da sua Unidade de lotação.
    MOD_PENT_QQR_UND = Permite Incluir/Editar planos de entregas de qualquer Unidade, desde que possua também as respectivas MOD_PENT_INCL/MOD_PENT_EDT (independente de qualquer outra condição).
~~~

## BANCO DE DADOS

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

## RESPONSABILIDADES

```
(PENT:TABELA_1) Atribuições do plano de entrega

+  => Unidade superior
CF => Chefe
CS => Chefe Sub.
DL => Delegado
LC => Lotado/Colaborador

                Unidade Executora
--------------+----------------------
Inclusão        CF,CS,DL,CF+,CS+,DL+
Edição          CF,CS,DL,CF+,CS+,DL+
Homologar       CF+,CS+
Avaliação       CF+,CS+
```

## REGRAS DE NEGÓCIO

Consideremos a seguinte hierarquia:
Unidade A
    Unidade B
        Unidade C
            Unidade D
    Unidade E
        Unidade F
        Unidade G
Consideremos também que o Plano de Entregas é da Unidade B.

- (RN_PENT_A) Quando um Plano de Entregas é criado adquire automaticamente o status INCLUIDO;
- (RN_PENT_B) O gestor (e delegado) de uma Unidade (B) e o gestor (e delegado) da sua Unidade-pai (A), podem iniciar a elaboração de Planos de Entrega para a Unidade B;
- (RN_PENT_C) O gestor da Unidade-pai (A) pode homologar e, se possuir a capacidade "MOD_PENT_EDT_FLH", alterar o Plano de Entregas de uma unidade-filha (B ou E) antes/depois de homologá-lo;
- (RN_PENT_D) Para ir para o status HOMOLOGANDO o Plano de Entregas deve ter ao menos uma entrega;
- (RN_PENT_E) Para ir para o status 'ATIVO', um Plano de Entregas precisa da Homologação do gestor da sua Unidade-pai (Unidade A);
- (RN_PENT_F) O gestor de uma Unidade deve poder visualizar os planos de entregas de todas as Unidades hierarquicamente a ele subordinadas [RN_PENT_V];
- (RN_PENT_G) Uma vez homologado um Plano de Entregas, a Unidade do plano (Unidade B) está no Programa;
- (RN_PENT_H) Os planos de entregas vão gerar dados que serão enviados ao órgão central (aguardando a definição do formato);
- (RN_PENT_I) O participante poderá visualizar o Plano de Entregas de qualquer uma das suas áreas de trabalho. Área de Trabalho é qualquer unidade onde o participante esteja lotado ou tenha alguma atribuição a ela vinculada (ver [lista de atribuições possíveis](docs/geral/informacoes_complementares.md));
- (~~RN_PENT_J~~) (REVOGADO) Uma Unidade de execução poderá ter mais de um Plano de Entregas com status 'HOMOLOGANDO' e 'ATIVO', desde que sejam para períodos diferentes;
- (RN_PENT_K) Após criado um Plano de Entregas, os seguintes campos não poderão mais ser alterados: unidade_id, programa_id;
- (RN_PENT_L) Vide Fluxo;
- (RN_PENT_M) Qualquer alteração, depois de o Plano de Entregas ser homologado, precisa ser notificada ao gestor da Unidade-pai (Unidade A) ou à pessoa que homologou. Essa comunicação sobre eventuais ajustes, não se aplica à Unidade Instituidora, ou seja, alterações realizadas em planos de entregas de unidades instituidoras não precisam ser notificadas à sua Unidade-pai;
- (RN_PENT_N) Vide Fluxo;
- (RN_PENT_O) Vide Fluxo;
- (RN_PENT_P) Vide Fluxo;
- (RN_PENT_Q) Quando um Plano de Entregas é cancelado, todas as suas entregas são canceladas, vindo a afetar as entregas dos planos de trabalho a elas relacionadas, tendo os mesmo efeitos da regra [RN_PTR_E];
- (RN_PENT_R) Vide Fluxo;
- (RN_PENT_S) Vide Fluxo;
- (RN_PENT_T) Vide Fluxo;
- (RN_PENT_U) Vide Fluxo;
- (RN_PENT_V) Vide Fluxo;
- (RN_PENT_W) Vide Fluxo;
- (RN_PENT_X) Vide Fluxo;
- (RN_PENT_Y) Vide Fluxo;
- (RN_PENT_Z) Vide Fluxo;
- (RN_PENT_AA) Vide Fluxo;
- (RN_PENT_AB) Vide Fluxo;
- (RN_PENT_AC) Vide Fluxo;
- (RN_PENT_AD) Vide Fluxo;
- (RN_PENT_AE) Se a alteração for feita com o Plano de Entregas no status ATIVO e o usuário logado possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL", o Plano de Entregas voltará ao status "HOMOLOGANDO";
- (RN_PENT_AF) Se a alteração for feita com o Plano de Entregas no status ATIVO e o usuário logado possuir a capacidade "MOD_PENT_EDT_ATV_ATV", o Plano de Entregas permanecerá no status "ATIVO";
- (RN_PENT_AG) A homologação do Plano de Entregas não se aplica à Unidade Instituidora, ou seja, os planos de entregas vinculados a unidades que sejam instituidoras não precisam ser homologados.
- (RN_PENT_AH) O plano de entrega vai para o status de AGUARDANDO_CANCELAMENTO, e só após a confimação pela chefia superior é que será realmente cancelado. Mas caso seja realizado o cancelamento diretamente pela chefia superior ele já cancela diretamente;

## REGRAS VINCULADAS

- (RN_PTR_E) O Plano de Trabalho precisará ser repactuado (retornar ao status de AGUARDANDO_ASSINATURA) quando houver quaisquer alterações no plano de entrega que impacte as entregas do plano de trabalho; (alterada a entrega ou cancelada);

## FLUXOS (STATUS & AÇÕES)

![Fig. 1 - Análise dos Fluxos dos Planos de Entrega](../imagens/fluxo_planos_entregas.jpg)

~~~text
status possíveis: "INCLUIDO", "HOMOLOGANDO", "ATIVO", "CONCLUIDO", "AVALIADO", "SUSPENSO", "CANCELADO"
~~~

Ação: ALTERAR -> geralmente não muda o status do plano ('INCLUIDO','HOMOLOGANDO','ATIVO'), exceto no caso da regra RN_PENT_AE;

- (RN_PENT_L) Condições para que um Plano de Entregas possa ser alterado:
  - o Plano de Entregas precisa estar com o status INCLUIDO, HOMOLOGANDO ou ATIVO, e
  - o usuário logado precisa possuir a capacidade "MOD_PENT_EDT", o Plano de Entregas precisa ser válido (ou seja, nem deletado, nem arquivado e com status diferente de 'CANCELADO'), e:
    - estar com o status INCLUIDO ou HOMOLOGANDO, e o usuário logado precisa ser gestor (ou delegado) da Unidade do plano; ou
    - o usuário logado precisa ser gestor (ou delegado) da Unidade-pai (Unidade A) da Unidade do plano (Unidade B) e possuir a capacidade "MOD_PENT_EDT_FLH" [RN_PENT_C];  ou
    - o Plano de Entregas precisa estar com o status ATIVO, o usuário logado precisa atender os critírios da TABELA_1, e ele possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL" [RN_PENT_AE] ou "MOD_PENT_EDT_ATV_ATV" [RN_PENT_AF]; ou
    - o usuário possuir a capacidade "MOD_PENT_QQR_UND". (independente de qualquer outra condição);

Ação: ARQUIVAR -> não muda o status do plano ('CONCLUIDO','AVALIADO');

- (RN_PENT_N) Condições para que um Plano de Entregas possa ser arquivado:
  - o plano precisa estar com o status CONCLUIDO ou AVALIADO, não ter sido arquivado, e:
    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
    - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_ARQ";

Ação: AVALIAR -> o plano adquire o status de 'AVALIADO';

- (RN_PENT_O) Condições para que um Plano de Entregas possa ser avaliado:
  - o plano precisa estar com o status CONCLUIDO, e:
    - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
    - o usuário logado precisa possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para a Unidade do plano (Unidade B); ou 
    **** REMOVIDO: - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_AVAL"; ou ****
    - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente da Unidade do plano (Unidade A e superiores), e possuir a capacidade "MOD_PENT_AVAL_SUBORD";
    ********************************- sugerir arquivamento automático (vide RI_PENT_A); (A IMPLEMENTAÇÃO DESTA REGRA DEPENDE DA IMPLEMENTAÇÃO DA AVALIAÇÃO DOS PLANOS DE ENTREGAS)**

Ação: CANCELAR PLANO -> o plano adquire o status de 'CANCELADO';

- (RN_PENT_P) Condições para que um Plano de Entregas possa ser cancelado:
  - ***** ALTERADO: o usuário logado precisa possuir a capacidade "MOD_PENT_CNC", o plano precisa estar em um dos seguintes status: INCLUIDO, HOMOLOGANDO, ATIVO; e ******
    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
    - o usuário logado precisa ser gestor da Unidade-pai do plano (Unidade A), ou
    ***** DESNECESSARIO: - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado; ****

Ação: CANCELAR AVALIAÇÃO -> o plano retorna ao status de 'CONCLUIDO';

- (RN_PENT_R) Condições para que um Plano de Entregas possa ter sua avaliação cancelada:
  - o plano precisa estar com o status AVALIADO, e
    - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
    **VER NO FRONT****************************- a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_CANC_AVAL"; ou**
    - possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para a Unidade do plano (Unidade B);

Ação: CANCELAR CONCLUSÃO -> o plano retorna ao status de 'ATIVO';

- (RN_PENT_S) Condições para que um Plano de Entregas possa ter sua conclusão cancelada:
  - o plano precisa estar com o status CONCLUIDO, e:
 **VER NO FRONT***************************- o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou**
  - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "MOD_PENT_CANC_CONCL";

Ação: CANCELAR HOMOLOGAÇÃO -> o plano retorna ao status de 'HOMOLOGANDO';

- (RN_PENT_T) Condições para que um Plano de Entregas possa ter sua homologação cancelada:
  - o plano precisa estar com o status ATIVO, e
    - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
    - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_CANC_HOMOL"; ou
    - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a Unidade-pai (Unidade A) da Unidade do plano (Unidade B);

Ação: CONCLUIR -> o plano adquire o status de 'CONCLUIDO';

- (RN_PENT_U) Condições para que um Plano de Entregas possa ser concluído:
  - o plano precisa estar com o status ATIVO, e:
    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
    - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "MOD_PENT_CONC";

Ação: CONSULTAR -> não muda o status do plano;

- (RN_PENT_V) Condições para que um Plano de Entregas possa ser consultado:
  - Possuir a capacidade "MOD_PENT"
  - Atender as regras [RN_PENT_F] e [RN_PENT_I];

Ação: DESARQUIVAR -> o plano retorna ao status que estava quando foi arquivado ('CONCLUIDO','AVALIADO');

- (RN_PENT_W) Condições para que um Plano de Entregas possa ser desarquivado:
  - o plano precisa estar arquivado, e:
    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
    - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_ARQ";

Ação: EXCLUIR -> não muda o status do plano;

- (RN_PENT_X) Condições para que um Plano de Entregas possa ser excluído:
  - o usuário logado precisa possuir a capacidade "MOD_PENT_EXCL", o plano precisa estar com o status INCLUIDO ou HOMOLOGANDO; e
    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
    - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado;

Ação: HOMOLOGAR -> o plano adquire o status de 'ATIVO';

- (RN_PENT_Y) Condições para que um Plano de Entregas possa ser homologado:
  - o plano precisa estar com o status HOMOLOGANDO, e:
    - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B); [RN_PENT_C] [RN_PENT_E], ou
    - a Unidade-pai (Unidade A) for a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_HOMOL", ou
  - A homologação do plano de entregas não se aplica à Unidade instituidora, ou seja, os planos de entregas vinculados a unidades que sejam instituidoras não precisam ser homologados (RN_PENT_AG).

Ação: INSERIR/INCLUIR -> o plano adquire o status de 'INCLUIDO';

- (RN_PENT_Z) Condições para que um Plano de Entregas possa ser criado:
  - o usuário logado precisa possuir a capacidade "MOD_PENT_INCL", e:
    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou gestor da sua Unidade-pai (Unidade A)[RN_PENT_B]; ou
    - o usuário precisa possuir também a capacidade "MOD_PENT_QQR_UND" (independente de qualquer outra condição);

Ação: LIBERAR PARA HOMOLOGAÇÃO -> o plano adquire o status de 'HOMOLOGANDO';

- (RN_PENT_AA) Condições para que um Plano de Entregas possa ser liberado para homologação:
  - o plano precisa estar com o status INCLUIDO, conter ao menos uma entrega [RN_PENT_D], e
    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B); ou
    - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e este possuir a capacidade "MOD_PENT_LIB_HOMOL"

Ação: RETIRAR DE HOMOLOGAÇÃO -> o plano retorna ao status de 'INCLUIDO';

- (RN_PENT_AB) Condições para que um Plano de Entregas possa ser retirado de homologação:
  - o plano precisa estar com o status HOMOLOGANDO, e:
    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B); ou
    - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e este possuir a capacidade "MOD_PENT_RET_HOMOL"

Ação: REATIVAR -> o plano adquire novamente o status de 'ATIVO';

- (RN_PENT_AC) Condições para que um Plano de Entregas possa ser reativado:
  - o plano precisa estar com o status SUSPENSO, e
    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
    - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_RTV"; ou
    - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);

Ação: SUSPENDER -> o plano adquire o status de 'SUSPENSO';

- (RN_PENT_AD) Condições para que um Plano de Entregas possa ser suspenso:
  - o plano precisa estar com o status ATIVO, e
    - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
    - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_SUSP"; ou
    - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);

## BOTÕES

- 'Alterar'. Condições para ser exibido: vide RN_PENT_L;
- 'Arquivar'. Condições para ser exibido: vide RN_PENT_N;
- 'Avaliar'. Condições para ser exibido: vide RN_PENT_O;
- 'Cancelar'. Condições para ser exibido: vide RN_PENT_P;
- 'Cancelar Avaliação'. Condições para ser exibido: vide RN_PENT_R;
- 'Cancelar Conclusão'. Condições para ser exibido: vide RN_PENT_S;
- 'Cancelar Homologação'. Condições para ser exibido: vide RN_PENT_T;
- 'Concluir'. Condições para ser exibido: vide RN_PENT_U;
- 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
- 'Desarquivar'. Condições para ser exibido: vide RN_PENT_W;
- 'Excluir'. Condições para ser exibido: vide RN_PENT_X;
- 'Homologar'. Condições para ser exibido: vide RN_PENT_Y;
- 'Liberar para Homologação'. Condições para ser exibido: vide RN_PENT_AA;
- 'Reativar'. Condições para ser exibido: vide RN_PENT_AC;
- 'Retirar de Homologação'. Condições para ser exibido: vide RN_PENT_AB;
- 'Suspender'. Condições para ser exibido: vide RN_PENT_AD;

## REGRAS DE INTERFACE

~~~text
- Estando no status "INCLUIDO"
  - botões-padrão:
    - 'Liberar para homologação'. Condições para ser exibido: vide RN_PENT_AA;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
  - botões opcionais:
    - 'Liberar para Homologação'. Condições para ser exibido: vide RN_PENT_AA;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
    - 'Cancelar'. Condições para ser exibido: vide RN_PENT_P;
    - 'Excluir'. Condições para ser exibido: vide RN_PENT_X;
    - 'Alterar'. Condições para ser exibido: vide RN_PENT_L;

- Estando no status "HOMOLOGANDO"
  - botões-padrão:
    - 'Homologar'. Condições para ser exibido: vide RN_PENT_Y;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
  - botões opcionais:
    - 'Homologar'. Condições para ser exibido: vide RN_PENT_Y;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
    - 'Cancelar'. Condições para ser exibido: vide RN_PENT_P;
    - 'Retirar de Homologação'. Condições para ser exibido: vide RN_PENT_AB;
    - 'Excluir'. Condições para ser exibido: vide RN_PENT_X;
    - 'Alterar'. Condições para ser exibido: vide RN_PENT_L;

- Estando no status "ATIVO"
  - botões-padrão:
    - 'Concluir'. Condições para ser exibido: vide RN_PENT_U;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
  - botões opcionais:
    - 'Concluir'. Condições para ser exibido: vide RN_PENT_U;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
    - 'Cancelar'. Condições para ser exibido: vide RN_PENT_P;
    - 'Suspender'. Condições para ser exibido: vide RN_PENT_AD;
    - 'Cancelar Homologação'. Condições para ser exibido: vide RN_PENT_T;
    - 'Alterar'. Condições para ser exibido: vide RN_PENT_L;

- Estando no status "CONCLUIDO"
  - botões-padrão:
    - 'Avaliar'. Condições para ser exibido: vide RN_PENT_O;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
  - botões opcionais:
    - 'Avaliar'. Condições para ser exibido: vide RN_PENT_O;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
    - 'Cancelar'. Condições para ser exibido: vide RN_PENT_P;
    - 'Arquivar'. Condições para ser exibido: vide RN_PENT_N;
    - 'Cancelar Conclusão'. Condições para ser exibido: vide RN_PENT_S;

- Estando no status "AVALIADO"
  - botões-padrão:
    - 'Arquivar'. Condições para ser exibido: vide RN_PENT_N;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
  - botões opcionais:
    - 'Arquivar'. Condições para ser exibido: vide RN_PENT_N;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
    - 'Cancelar Avaliação'. Condições para ser exibido: vide RN_PENT_R;

- Estando no status "SUSPENSO"
  - botões-padrão:
    - 'Reativar'. Condições para ser exibido: vide RN_PENT_AC;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
  - botões opcionais:
    - 'Reativar'. Condições para ser exibido: vide RN_PENT_AC;
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;

- Estando no status "CANCELADO"
  - botões-padrão:
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
  - botões opcionais:
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;

- Estando na condição de "ARQUIVADO"
  - botões-padrão:
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
  - botões opcionais:
    - 'Consultar'. Condições para ser exibido: vide RN_PENT_V;
    - 'Desarquivar'. Condições para ser exibido: vide RN_PENT_W;
~~~

- (RI_PENT_A) Na janela de avaliar, já deixar o switch de arquivamento marcado, igual à janela de avaliação nas atividades (vide RN_PENT_);
- (RI_PENT_B) A consulta do grid retornará inicialmente os principais Planos de Entrega do usuário logado (a opção 'principais' já vem marcada), que são:
  - os planos válidos das suas Áreas de Trabalho, e
  - se ele for gestor, os planos ativos das Unidades-pai de onde ele é gestor;
- (RI_PENT_C) Por padrão, os planos de entregas retornados na listagem do grid são os que não foram arquivados nem cancelados.
- (RI_PENT_D) Na visualização de Avaliação, deverá trazer a unidade ao qual o usuário é gestor e todas as suas subordinadas imediatas.
- (RI_PENT_E) As entregas vinculadas de planos de entregas cancelados devem aparecer em vermelho e avisando que foram canceladas em seu plano de entregas.

## QUESTÕES PENDENTES

- Opções para o filtro: 'Incluir Unidades Superiores', 'Incluir Unidades Inferiores', 'Selecionar por Status'

[Documentação para ENTREGAS DO Plano de Entregas](docs/gestao/plano_entrega_entrega.md)

## EXEMPLOS DE GRIDS

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

- (~~RN_PENT_2_1~~) (REVOGADO) Ao se criar um Plano de Entregas através da adesão ao da Unidade-pai, aquele adquire de imediato o status "HOMOLOGANDO";
- (~~RN_PENT_2_2~~) (REVOGADO) A adesão a um Plano de Entregas da Unidade-pai precisa da homologação do gestor desta Unidade para ser ativado (ir para o status ATIVO);
- (~~RN_PENT_2_3~~) (REVOGADO) Só é possível aderir a um Plano de Entregas se este for da Unidade-pai e estiver ATIVO;
- (~~RN_PENT_2_4~~) (REVOGADO) O gestor de uma Unidade, e o gestor da sua Unidade-pai, podem realizar a adesão a um Plano de Entrega, ou seja, realizar a adesão do filho compulsoriamente;
- (~~RN_PENT_2_5~~) (REVOGADO) No caso de a adesão ser feita pelo gestor da Unidade-pai, o plano já adquire de imediato o status ATIVO;
- (~~RN_PENT_2_6~~) (REVOGADO) Se um Plano de Entregas for concluído/cancelado, e possuir planos vinculados, estes também serão concluídos/cancelados automaticamente;
- (~~RN_PENT_2_7~~) (REVOGADO) Em caso de adesão, os campos 'inicio', 'fim', 'planejamento_id', e 'cadeia_valor_id', deverão ser sempre iguais aos do plano-pai; portanto, quando um Plano de Entregas próprio sofrer alteração em um desses campos, todos os planos a ele vinculados deverão ser atualizados também;
- (~~RN_PENT_3_3~~) (REVOGADO) Se a Unidade A tem um plano de entrega próprio e a Unidade B aderiu ao plano de A, a Unidade C pode aderir ao plano de B e só a ele; (Hierarquia considerada: A -> B -> C)
- (~~RN_PENT_4_1~~) (REVOGADO) Ação: ADERIR (exclusivamente para planos vinculados)
    . o usuário precisa possuir também a capacidade "MOD_PENT_QQR_UND"; ou
    . o usuário logado precisa ser gestor da Unidade ou da sua Unidade-pai, ou uma destas ser sua Unidade de lotação e ele possuir a capacidade "MOD_PENT_ADR"; [RN_PENT_2_4] e
    . a Unidade do plano-pai precisa ser a Unidade-pai da Unidade do plano vinculado, e o plano-pai precisa estar com o status ATIVO; [RN_PENT_2_3] [RN_PENT_3_3] e
    . a Unidade não possua plano de entrega com o status ATIVO no mesmo período do plano ao qual está sendo feita a adesão;
- (~~RN_PENT_3_1~~) (REVOGADO) Quando um Plano de Entregaqs voltar no status, e possuir outros Planos de Entrega a ele vinculados, no status ATIVO, estes deverão ir para o status SUSPENSO;
- (~~RI_PENT_6~~) (REVOGADO) Na adesão a um Plano de Entregas:
    . o input-search dos planos de entregas exibirá apenas os ativos da Unidade-pai da Unidade selecionada;
    . a listagem dos planos de entregas não exibirá as opções de filtro.
- (~~RI_PENT_1~~) (REVOGADO) O botão Aderir, na toolbar, deverá ser exibido sempre, mas para ficar habilitado:
    - o usuário logado precisa ser gestor da Unidade selecionada ou da sua Unidade-pai, ou uma destas ser sua Unidade de lotação e ele
      possuir a capacidade "MOD_PENT_ADR" [RN_PENT_2_4]; e
    - a Unidade-pai da Unidade selecionada precisa possuir plano de entrega com o status ATIVO, que já não tenha sido vinculado pela Unidade selecionada;
- (~~RI_PENT_2~~) (REVOGADO) O botão Aderir, nas linhas do grid, deverá aparecer num plano somente se:
    - o plano estiver com o status Ativo; e
    - a Unidade do plano for a Unidade-pai da Unidade selecionada pelo usuário; e
    - se o usuário for Gestor da Unidade selecionada, ou ela for sua lotação e ele possuir a capacidade "MOD_PENT_ADR" ; e
    - se a Unidade selecionada não possuir plano de entrega Ativo no mesmo período do plano em questão;

Planos de Entrega sigilosos (Ainda não implementado)

- Se o Plano de Entregas for integralmente sigiloso, só poderá ser visualizado pelo gestor da sua Unidade ou por quem tiver capacidade de acesso;
- Se o Plano de Entregas for parcialmente sigiloso, as entregas não sigilosas poderão ser visualizadas por quem puder visualizar o Plano de Entregas, mas as sigilosas só poderão ser visualizadas pelo gestor da sua Unidade e pelos servidores que as possuirem em seus respectivos Planos de Trabalho;
- Somente o gestor da Unidade do Plano de Entregas deve ser capaz de adicionar uma entrega sigilosa a um plano de trabalho;
- Um Plano de Entregas pode ser sigiloso, e nesse caso todas as suas entregas são automaticamente sigilosas, ou possuir apenas algumas de suas entregas como sigilosas (plano parcialmente sigiloso);

