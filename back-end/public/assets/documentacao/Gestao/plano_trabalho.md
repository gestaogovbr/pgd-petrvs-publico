# MÓDULO: PLANO DE TRABALHO

## CAPACIDADES  

~~~text
    MOD_PTR - Permite acessar item menu Plano de Trabalho
    MOD_PTR_EDT - Permite editar planos de trabalho
    MOD_PTR_INCL - Permite incluir planos de trabalho
    MOD_PTR_EDT_ATV - Permite editar planos de trabalho ativos
    MOD_PTR_CNC - Permite cancelar planos de trabalho
    MOD_PTR_USERS_INCL - Permite incluir planos de trabalho para usuários que não estão lotados na unidade executora
    MOD_PTR_INTSC_DATA - Permite incluir plano de trabalho que possua período conflitante com outro já existente na mesma unidade/servidor
~~~

## RESPONSABILIDADES
 
~~~text
(PTR:TABELA_1) - Tabela de responsabilidades do plano de trabalho

+   => Unidade superior
-   => Exceto o próprio participante
?   => Habilitado no programa?
^   => Entidade (Orgão)
º   => Lotação (do usuário do plano)
CF  => Chefe
CS  => Chefe Sub.
DL  => Delegado
LC  => Lotado/Colaborador

Considerando sempre a unidade executora, caso possua cargo de chefia mas o plano seja pra outra
unidade executora, então será considerado como um participante (Lotado/Colaborador);
O ator sempre é referente ao "Usuário do Plano de Trabalho", e as responsabilidades são referentes
ao usuário que está logado (CF, CS, DL, LC).

--------------+----------------+----------------------+------------------+-------------------------
Ação \ Ator   | PT do Chefe    | PT do Chefe Sub.     | PT do Delegado   | PT do Lotado/Colaborador   
--------------+----------------+----------------------+------------------+-------------------------
Assinar       | CF+,CS+,CF     | CF,CS,CF^,CS^        | CF,CS,DL,CF^,CS^ | CF,CS,LC,CF^,CS^
(TABELA_2)    | CF^,CS^        | CFº,CSº,CFº+,CSº+    | CFº,CSº,CFº+,CSº+| CFº,CSº,CFº+,CSº+ 
--------------+----------------+----------------------+------------------+-------------------------
Ativar        | CF?,CF+,CS+    | CF,CS-,CS?           | CF,CS,DL?        | CF,CS,LC?
--------------+----------------+----------------------+------------------+-------------------------
Avaliar       | CF+,CS+        | CF,CF+,CS+           | CF,CS            | CF,CS
--------------+----------------+----------------------+------------------+-------------------------
Alterar       | CF?,CF+,CS+    | CF,CS?,CF+,CS+       | CF,CS,DL?        | CF,CS,DL,LC?
--------------+----------------+----------------------+------------------+-------------------------
Incluir       | CF?,CF+,CS+    | CF,CS?,CF+,CS+       | CF,CS,DL?        | CF,CS,DL,LC?
--------------+----------------+----------------------+------------------+-------------------------
Outros        | CF,CS,DL       | CF,CS,DL             | CF,CS,DL         | CF,CS,DL
--------------+----------------+----------------------+------------------+-------------------------

~~~

## REGRAS DE NEGÓCIO

- (RN_PTR_A) Quando um Plano de Trabalho é criado adquire automaticamente o status INCLUIDO;
- (RN_PTR_B) O Plano de Trabalho pode ser incluído pelo próprio servidor, se ele for "participante do programa" habilitado, ou pelas condições da TABELA_1;
- (RN_PTR_C) Quando o gestor da Unidade Executora criar o primeiro Plano de Trabalho para um servidor, este tornar-se-á automaticamente um participante habilitado;
- (RN_PTR_D) O Plano de Trabalho só vai para o status ATIVO quando atender os critérios de assinatura, que estarão definidos nas configurações do Programa;
- (RN_PTR_E) O Plano de Trabalho precisará ser repactuado (retornar ao status de AGUARDANDO_ASSINATURA) quando houver quaisquer alterações no plano de entrega que impacte as entregas do plano de trabalho; (alterada a entrega ou cancelada);
- (RN_PTR_F) Os planos de trabalho dos participantes contribuem direta ou indiretamente para o plano de entregas da unidade. Assim, um Plano de Trabalho será composto da divisão da carga horária disponível entre entregas da sua unidade, entregas de outra unidade, entregas de outro orgão, ou não vinculadas a entregas;
- (RN_PTR_G) Na criação/alteração de um Plano de Trabalho só podem ser criadas/alteradas entregas se vinculadas a entregas de planos de entregas não canceladas;
- (RN_PTR_H) Segundo as configurações do Programa de Gestão, no TCR poderá ser exigida a assinatura dos seguintes atores: participante, gestor da Unidade Executora, gestor da Unidade de Lotação e gestor da Unidade Instituidora, repeitado o definido na TABELA_3; entretanto, ainda segundo o Programa de Gestão, o TCR pode ser dispensável e, nesse caso, obviamente nenhuma assinatura será exigida;
- (RN_PTR_I) Quando a Unidade Executora não for a unidade de lotação do servidor, seu gestor imediato e seus substitutos devem ter acesso ao seu Plano de Trabalho (e à sua execução);
- (RN_PTR_J) Quando todas as consolidações de um Plano de Trabalho forem avaliadas, informar que este está também avaliado (não é um status);
- (RN_PTR_K) O Plano de Trabalho somente poderá ser cancelado se não houver nenhuma atividade e nenhum periodo consolidado. Os afastamentos e ocorrências continuam válidas no sistema, somente removendo o vinculo com a consolidação;
- (RN_PTR_L) Um Plano de Trabalho adquire o status 'CONCLUIDO' quando a sua última consolidação for avaliada;
- (RN_PTR_M) Vide Fluxo;
- (RN_PTR_N) Vide Fluxo;
- (RN_PTR_O) Vide FLuxo;
- (RN_PTR_P) Vide Fluxo;
- (RN_PTR_Q) Vide Fluxo;
- (RN_PTR_R) Vide Fluxo;
- (RN_PTR_S) Vide Fluxo;
- (RN_PTR_T) Vide Fluxo;
- (RN_PTR_U) Vide Fluxo;
- (RN_PTR_V) Vide Fluxo;
- (RN_PTR_W) Vide Fluxo;
- (RN_PTR_X) Vide Fluxo;
- (RN_PTR_Y) Para incluir um Plano de Trabalho para um participante, é necessário que este esteja LOTADO/COLABORADOR na unidade executora, a menos que este possua a capacidade MOD_PTR_USERS_INCL;
- (RN_PTR_AA) Um Plano de Trabalho não pode ser incluído/alterado se apresentar período conflitante com outro Plano de Trabalho já existente para a mesma unidade/servidor, a menos que o usuário logado possua a capacidade MOD_PTR_INTSC_DATA;
- (RN_PTR_AB) Um Plano de Trabalho não pode ser excluído;
- (RN_PTR_AC) Quando um participante tiver um plano de trabalho criado, ele se tornará automaticamente um COLABORADOR da sua unidade executora;
- (RN_PTR_AD) Após criado um plano de trabalho, a sua unidade e programa não podem mais ser alterados.
- (RN_PTR_AE) Após criado um plano de trabalho, o usuário do plano não poderá mais ser alterado.

## FLUXOS (STATUS & AÇÕES)

![Fig. 1 - Fluxos do Plano de Trabalho](../Imagens/Fluxos_Planos_Trabalhos.jpeg)

~~~text
(PTR:TABELA_2) - Fluxos do plano para ir ao status de ATIVO

Caso o participante seja o gestor da unidade executora ou gestor em sua unidade de lotação, então os atores "gestor executora" e 
"gestor imediato" deverão seguir o descrito na TABELA_3. Caso contrário, deverá ser considerado somente o gestor tituluar e os substitutos.

status possíveis = ['INCLUIDO', 'AGUARDANDO_ASSINATURA', 'ATIVO', 'CONCLUIDO', 'SUSPENSO', 'CANCELADO']
-----------------------------------------------------------------------------------------------------------------------------------
obrigatoriedade     | inclusão realizada  |  status     |  evento que                |  status      |  evento que       |  status
da assinatura       | pelo                |  inicial    |  faz avançar               |  seguinte    |  faz avançar      |  seguinte
--------------------+--------------------------------------------------------------------------------------------------------------
  participante      | participante        |  INCLUIDO   |  participante              |  AGUARDANDO  |  gestores assinam |  ATIVO*
  gestor executora  |                     |             |  assina o TCR              |  ASSINATURA  |  o TCR            |  
  gestor imediato   +--------------------------------------------------------------------------------------------------------------
  gestor entidade   | gestor              |  INCLUIDO   |  gestor assina             |  AGUARDANDO  |  particip/gestor  |  ATIVO
                    |                     |             |  o TCR                     |  ASSINATURA  |  assinam o TCR    |  
--------------------+--------------------------------------------------------------------------------------------------------------
                    | participante        |  INCLUIDO   |  gestor/participante       |  ATIVO       |                   |  
                    |                     |             |  ativa o plano             |              |                   |  
  ninguém           +--------------------------------------------------------------------------------------------------------------
                    | gestor              |  INCLUIDO   |  gestor/participante       |  ATIVO       |                   |  
                    |                     |             |  ativa o plano             |              |                   |  
--------------------+--------------------------------------------------------------------------------------------------------------
                    | participante        |  INCLUIDO   |  participante              |              |                   |
                    |                     |             |  envia para                |  AGUARDANDO  |  gestores assinam |  ATIVO 
                    |                     |             |  assinatura do TCR         |  ASSINATURA  |  o TCR            |  
  gestor(es)        +--------------------------------------------------------------------------------------------------------------
                    | gestor              |  INCLUIDO   |  gestor ativa (e assina)   |  ATIVO       |                   |  
                    |                     |             |  o plano                   |              |                   |  
--------------------+--------------------------------------------------------------------------------------------------------------
                    | participante        |  INCLUIDO   |  participante              |  ATIVO       |                   |  
                    |                     |             |  ativa (e assina) o plano  |              |                   |  
  participante      +--------------------------------------------------------------------------------------------------------------
                    | gestor              |  INCLUIDO   |  gestor envia              |              |                   |  
                    |                     |             |  para                      |  AGUARDANDO  |  participante     |  ATIVO
                    |                     |             |  assinatura do TCR         |  ASSINATURA  |  assina o TCR     |  
--------------------+--------------------------------------------------------------------------------------------------------------
~~~

~~~text
(PTR:TABELA_3) - Gestor da unidade executora e gestor imediato (para o participante, considerando sua atribuição)

+   => Unidade superior
º   => Lotação (do usuário do plano)
-   => Exceto o próprio participante
CF  => Chefe
CS  => Chefe Sub.

                 +---------------------------------------------------+---------------------------------------------------+---------------
                                   Unidade Executora                 |                 Unidade de Lotação                |  Participante
                 +---------------+------------------+----------------+---------------+------------------+----------------+      Sem
                   Chefe titular | Chefe substituto | Chefe delagado | Chefe titular | Chefe substituto | Chefe delagado |     Chefia
-----------------+---------------+------------------+----------------+---------------+------------------+----------------+---------------
gestor executora | CF+, CS+      | CF,CS-           | CF,CS          |               |                  |                | CF,CS
-----------------+---------------+------------------+----------------+---------------+------------------+----------------+---------------
gestor imediato  |               |                  |                | CFº+,CSº+     | CFº,CSº-         | CFº,CSº        | CFº,CSº
-----------------+---------------+------------------+----------------+---------------+------------------+----------------+---------------

~~~

Ação: ALTERAR -> não muda o status do plano se ele estiver com o status 'INCLUIDO' ou 'AGUARDANDO_ASSINATURA', mas retorna ao status 'AGUARDANDO_ASSINATURA' se ele estiver no status 'ATIVO';

- (RN_PTR_M) Condições para que um Plano de Trabalho possa ser alterado:
  - o usuário logado precisa possuir a capacidade "MOD_PTR_EDT", o Plano de Trabalho precisa ser válido (ou seja, nem deletado, nem arquivado, nem estar no status CANCELADO), e:
    - estando com o status 'INCLUIDO' ou 'AGUARDANDO_ASSINATURA', o usuário logado precisa atender os critérios da ação Alterar da TABELA_1;
    - estando com o status 'ATIVO', o usuário precisa possuir a capacidade MOD_PTR_EDT_ATV e atender os critérios da ação Alterar da TABELA_1;
  - Após alterado, e no caso se exija assinaturas no TCR, o Plano de Trabalho precisa ser repactuado (novo TCR), e o plano retorna ao status 'AGUARDANDO_ASSINATURA';
  - A alteração não pode apresentar período conflitante com outro plano já existente para a mesma Unidade Executora e mesmo participante, ou o usuário logado possuir a capacidade MOD_PTR_INTSC_DATA (RN_PTR_AA)

Ação: ARQUIVAR -> não muda o status do plano ('CONCLUIDO', 'CANCELADO');

- (RN_PTR_N) Condições para que um Plano de Trabalho possa ser arquivado:
  - o plano precisa estar com o status CONCLUIDO ou CANCELADO, não ter sido arquivado, e:
  - o usuário logado precisa ser o participante ou o gestor da Unidade Executora;

Ação: ASSINAR -> pode manter-se em AGUARDANDO_ASSINATURA ou ir para ATIVO

- (RN_PTR_O) Condições para que um Plano de Trabalho possa ser assinado:
  - estar no status INCLUIDO ou AGUARDANDO_ASSINATURA, e
    - o plano precisa possuir ao menos uma entrega, e
    - o usuário logado precisa atender os critérios da ação Assinar da TABELA_1, e
    - a assinatura do usuário logado precisa ser uma das exigidas pelo Programa de Gestão, respeitando a TABELA_3, e ele não ter ainda assinado;
  - Enquanto faltar assinatura no TCR, o plano vai para o (ou permanece no) status de 'AGUARDANDO_ASSINATURA'. Quando o último assinar o TCR, o plano vai para o status 'ATIVO';

Ação: ATIVAR -> o plano vai para o status 'ATIVO';

- (RN_PTR_P) Condições para que um Plano de Trabalho possa ser ativado:
  - o plano precisa estar no status 'INCLUIDO', e
    - o usuário logado precisa respeitar a ação Ativar da TABELA_1, e
    - nenhuma assinatura no TCR ser exigida pelo programa, e
    - o plano de trabalho precisa ter ao menos uma entrega;

Ação: CANCELAR ASSINATURA -> o plano permanece no status 'AGUARDANDO_ASSINATURA' ou retorna ao status 'INCLUIDO';

- (RN_PTR_Q) Condições para que um Plano de Trabalho possa ter uma assinatura cancelada:
  - o plano precisa estar no status 'AGUARDANDO_ASSINATURA'; e
    - o usuário logado precisa já ter assinado o TCR;
  - Após o cancelamento da assinatura do usuário logado, se existir assinatura(s) de outro(s) usuário(s), o plano permanece no status 'AGUARDANDO_ASSINATURA'. Caso contrário, retrocessará para o status 'INCLUIDO';

Ação: CANCELAR PLANO -> o plano adquire o status de 'CANCELADO';

- (RN_PTR_R) Condições para que um Plano de Trabalho possa ser cancelado:
  - o usuário logado precisa possuir a capacidade "MOD_PTR_CNC", e
    - o plano precisa estar em um dos seguintes status: INCLUIDO, AGUARDANDO_ASSINATURA, ATIVO; e
    - não possuir nenhuma atividade lançada e não possuir nenhuma consolidação CONCLUIDO/AVALIADO; [RN_PTR_K]
    - o usuário logado precisa ser gestor da Unidade Executora;

Ação: CONSULTAR -> não muda o status do plano;

- (RN_PTR_S) Condições para que um Plano de Trabalho possa ser consultado:
  - todos os participantes podem visualizar todos os planos de trabalho, desde que possuam a capacidade "MOD_PTR";

Ação: DESARQUIVAR -> o plano retorna ao status que estava quando foi arquivado ('CONCLUIDO');

- (RN_PTR_T) Condições para que um Plano de Trabalho possa ser desarquivado:
  - o plano precisa estar arquivado, e:
    - o usuário logado precisa ser o participante ou gestor da Unidade Executora;

Ação: ENVIAR PARA ASSINATURA -> o plano vai para o status 'AGUARDANDO_ASSINATURA';

- (RN_PTR_U) Condições para que um Plano de Trabalho possa ser enviado para assinatura:
  - o plano precisa estar com o status INCLUIDO; e
    - o usuário logado precisa atender os critérios da ação Assinar da TABELA_1, e
    - a assinatura do usuário logado não ser exigida, e caso seja, então ele já deve ter assinado o TCR (salvaguarda); e
    - devem existir assinaturas exigíveis ainda pendentes; e
    - o plano precisa possuir ao menos uma entrega.

Ação: INSERIR/INCLUIR -> o plano adquire o status de 'INCLUIDO';

- (RN_PTR_V) Condições para que um Plano de Trabalho possa ser criado:
  - o usuário logado precisa possuir a capacidade "MOD_PTR_INCL", e:
    - o usuário logado precisa ser um participante do Programa, habilitado, ou atender aos critérios da TABELA_1; [RN_PTR_B]; e
    - o participante do plano precisa ser LOTADO/COLABORADOR na unidade do plano, ou este deve possuir a capacidade MOD_PTR_USERS_INCL [RN_PTR_Y]; e
    - o novo Plano de Trabalho não pode apresentar período conflitante com outro plano já existente para a mesma Unidade Executora e mesmo participante, ou o usuário logado possuir a capacidade MOD_PTR_INTSC_DATA [RN_PTR_AA]

Ação: REATIVAR -> o plano adquire novamente o status de 'ATIVO';

- (RN_PTR_W) Condições para que um Plano de Trabalho possa ser reativado:
  - o plano precisa estar com o status SUSPENSO, e
    - o usuário logado precisa ser gestor da Unidade Executora;

Ação: SUSPENDER -> o plano adquire o status de 'SUSPENSO';

- (RN_PTR_X) Condições para que um Plano de Trabalho possa ser suspenso:
  - o plano precisa estar com o status ATIVO, e
    - o usuário logado precisa ser gestor da Unidade Executora;

## BOTÕES

- 'Alterar'. Condições para ser exibido: vide RN_PTR_M;
- 'Arquivar'. Condições para ser exibido: vide RN_PTR_N;
- 'Assinar'. Condições para ser exibido: vide RN_PTR_O;
- 'Ativar'. Condições para ser exibido: vide RN_PTR_P;
- 'Cancelar assinatura'. Condições para ser exibido: vide RN_PTR_Q;
- 'Cancelar plano'. Condições para ser exibido: vide RN_PTR_R;
- 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
- 'Desarquivar'. Condições para ser exibido: vide RN_PTR_T;
- 'Enviar para assinatura'. Condições para ser exibido: vide RN_PTR_U;
- 'Incluir'. Condições para ser exibido: vide RN_PTR_V;
- 'Reativar'. Condições para ser exibido: vide RN_PTR_W;
- 'Suspender'. Condições para ser exibido: vide RN_PTR_X;

## REGRAS DE INTERFACE

~~~text
- Estando no status "INCLUIDO"
  - botões-padrão:
    - 'Assinar'. Condições para ser exibido: vide RN_PTR_O;                  (quando for exigida apenas a assinatura do usuário logado no TCR)
    - 'Ativar'. Condições para ser exibido: vide RN_PTR_P;                   (quando não for exigida nenhuma assinatura no TCR)
    - 'Enviar para Assinatura'. Condições para ser exibido: vide RN_PTR_U;
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
  - botões opcionais:
    - 'Alterar'. Condições para ser exibido: vide RN_PTR_M;
    - 'Assinar'. Condições para ser exibido: vide RN_PTR_O;
    - 'Ativar'. Condições para ser exibido: vide RN_PTR_P;
    - 'Cancelar plano'. Condições para ser exibido: vide RN_PTR_R;
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
    - 'Enviar para assinatura'. Condições para ser exibido: vide RN_PTR_U;

- Estando no status "AGUARDANDO_ASSINATURA"
  - botões-padrão:
    - 'Assinar'. Condições para ser exibido: vide RN_PTR_O;
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
  - botões opcionais:
    - 'Alterar'. Condições para ser exibido: vide RN_PTR_M;
    - 'Assinar'. Condições para ser exibido: vide RN_PTR_O;
    - 'Cancelar assinatura'. Condições para ser exibido: vide RN_PTR_Q;
    - 'Cancelar plano'. Condições para ser exibido: vide RN_PTR_R;
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;

- Estando no status "ATIVO"
  - botões-padrão:
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
  - botões opcionais:
    - 'Alterar'. Condições para ser exibido: vide RN_PTR_M;
    - 'Cancelar plano'. Condições para ser exibido: vide RN_PTR_R;
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
    - 'Suspender'. Condições para ser exibido: vide RN_PTR_X;

- Estando no status "CONCLUIDO"
  - botões-padrão:
    - 'Arquivar'. Condições para ser exibido: vide RN_PTR_N;
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
  - botões opcionais:
    - 'Arquivar'. Condições para ser exibido: vide RN_PTR_N;
    - 'Cancelar plano'. Condições para ser exibido: vide RN_PTR_R;
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;

- Estando no status "SUSPENSO"
  - botões-padrão:
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
  - botões opcionais:
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
    - 'Reativar'. Condições para ser exibido: vide RN_PTR_W;

- Estando no status "CANCELADO"
  - botões-padrão:
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
  - botões opcionais:
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;

- Estando na condição de "ARQUIVADO"
  - botões-padrão:
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
  - botões opcionais:
    - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
    - 'Desarquivar'. Condições para ser exibido: vide RN_PTR_T;
~~~

- No formulário de inclusão/edição de um Plano de Trabalho:
  - (RI_PTR_A) se o usuário logado não for gestor da Unidade Executora, o inputSearch de usuário já vem preenchido com o seu nome e permanece bloqueado;
  - (RI_PTR_B) os input-search de unidade, programa e usuario devem ficar desabilitados nas edições e habilitado apenas nas inclusões;
  - (RI_PTR_C) Garante que, se não houver um interesse específico na data de arquivamento, só retornarão os planos de trabalho não arquivados.
  - (RI_PTR_C) Data final do plano deve ser inicializada vazio para obrigar o usuário a preencher, e validar para que não seja menor que a data inicial.

## REGRAS DE NEGÓCIO APLICADAS ÀS ENTREGAS DO PLANO DE TRABALHO

(RN_PTR_ENT_) A distribuição dos percentuais de carga horária do participante deve atender a três categorias de atividades: aquelas vinculadas a entregas do Plano de Trabalho da unidade, aquelas não vinculadas a entregas mas que são do interesse da sua unidade organizacional, e por fim aquelas vinculadas a entregas de um Plano de Trabalho de outra unidade organizacional.
(RN_PTR_ENT_) As entregas de um Plano de Trabalho só podem ser vinculadas a entregas de Planos de Entregas homologados (vide RN_PTR_G)
(RN_PTR_ENT_) Toda atividade deve gerar uma entrega/resultado;

## PENDENCIAS

- Na regra RN_PTR_G verificar o que fazer com as entregas do plano de trabalho quando for excluída uma entrega do plano de entrega
- Na regra RN_PTR_J informar a quem e o que! Presa-se definir as notificações que serão enviadas, inclusive as obrigatórias da IN

## IMPLEMENTAÇÃO DAS REGRAS

```
Regra      Back-End         Front-End           
--------------------------------------------
RN_PTR_A   Implementado     Não aplicável
RN_PTR_B   Implementado     Não aplicável
RN_PTR_C   Implementado     Não aplicável
RN_PTR_D   Implementado     Não aplicável
RN_PTR_E   Implementado     Implementado
RN_PTR_F   Não aplicável    Não aplicável
RN_PTR_G   Não aplicável    Implementado
RN_PTR_H   Implementado     Não aplicável
RN_PTR_I   Implementado     Implementado
RN_PTR_J   Pendente         Não aplicável
RN_PTR_K   Implementado     Implementado 
RN_PTR_L   Implementado     Não aplicável
RN_PTR_M   Implementado     Implementado
RN_PTR_N   Implementado     Implementado
RN_PTR_O   Implementado     Implementado
RN_PTR_P   Implementado     Implementado
RN_PTR_Q   Implementado     Implementado
RN_PTR_R   Implementado     Implementado
RN_PTR_S   Implementado     Implementado
RN_PTR_T   Implementado     Implementado
RN_PTR_U   Implementado     Implementado
RN_PTR_V   Implementado     Parcialmente (Impossível implementar completamente devido a necessidade de se conhecer a unidade e o período)
RN_PTR_W   Implementado     Implementado
RN_PTR_X   Implementado     Implementado
RN_PTR_Y   Implementado     Não aplicável
RN_PTR_AA  Implementado     Não aplicável
RN_PTR_AB  Implementado     Implementado
RN_PTR_AC  Implementado     Não aplicável
RN_PTR_AD  Implementado     Implementado
RN_PTR_AE  Implementado     Implementado

```