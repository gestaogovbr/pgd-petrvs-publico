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
    MOD_PTR_INCL_SEM_LOT - Permite incluir planos de trabalho para usuários não lotados na unidade do plano
    MOD_PTR_INTSC_DATA - Permite incluir planos de trabalho para usuários que já possuem planos no período de mesma modalidade
~~~

## Planos de Trabalho

~~~text
Tabela: planos_trabalhos

Campos obrigatórios:
    carga_horaria
    tempo_total
    tempo_proporcional
    numero
    data_inicio
    data_fim
    forma_contagem_carga_horaria
    status
    programa_id
    usuario_id
    unidade_id
    tipo_modalidade_id
    criacao_usuario_id
~~~

## REGRAS DE NEGÓCIO APLICADAS AOS PLANOS DE TRABALHO

(RN_PTR_A) Quando um Plano de Trabalho é criado adquire automaticamente o status INCLUIDO;
(RN_PTR_B) O Plano de Trabalho pode ser incluído pelo próprio servidor, se ele for "participante do programa", habilitado, ou pelo chefe da unidade executora.
(RN_PTR_C) Quando o Chefe da unidade executora criar o primeiro plano de trabalho para um servidor, este tornar-se-á automaticamente um participante habilitado;
(RN_PTR_D) O Plano de Trabalho só vai para o status ATIVO quando atender os critérios de assinatura, que estarão definidos no TCR com base nas configurações do Programa;
(RN_PTR_E) O Plano de Trabalho precisará ser repactuado quando alguma de suas entregas estiver vinculada a uma entrega de plano de trabalho cancelada;
(RN_PTR_F) Os planos de trabalho dos participantes contribuem direta ou indiretamente para o plano de trabalho da unidade. Assim, um plano de trabalho será composto por atividades relacionadas ou não às entregas do plano de trabalho da unidade;
(RN_PTR_G) Na criação/alteração de um Plano de Trabalho só podem ser criadas/alteradas entregas se vinculadas a entregas de planos de entregas não canceladas;
(RN_PTR_H) Segundo as configurações do Programa de Gestão, no TCR poderá ser exigida a assinatura dos seguintes atores: participante, gestor da Unidade Executora, gestor da Unidade de Lotação, e/ou gestor da Unidade Instituidora; entretanto, ainda segundo o Programa de Gestão, o TCR pode ser dispensável e, nesse caso, obviamente nenhuma assinatura será exigida;
(RN_PTR_) 
(RN_PTR_) 
(RN_PTR_) 
(RN_PTR_) 
(RN_PTR_) 
(RN_PTR_) 

## REGRAS DE INTERFACE APLICADAS AOS PLANOS DE TRABALHO

No formulário de inclusão/edição de um plano de trabalho:
    . (RI_PTR_A) se o usuário logado não for gestor da Unidade do plano (Unidade B), o inputSearch de usuário já vem preenchido com o seu nome e permanece bloqueado;
    . (RI_PTR_B) os input-search de unidade, programa e usuario devem ficar desabilitados nas edições e habilitado apenas nas inclusões;

## FLUXOS DOS PLANOS DE TRABALHO (STATUS & AÇÕES)

~~~text

status possíveis = ['INCLUIDO', 'AGUARDANDO_ASSINATURA', 'ATIVO', 'CONCLUIDO', 'AVALIADO', 'RECURSO', 'SUSPENSO', 'CANCELADO']

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
                    | participante        |  INCLUIDO   |  participante clica no     |              |                   |
                    |                     |             |  botão 'enviar para        |  AGUARDANDO  |  chefe assina     |  ATIVO 
                    |                     |             |  assinatura'     (*4)      |  ASSINATURA  |  o TCR            |  
    chefe           +--------------------------------------------------------------------------------------------------------------
                    | chefe               |  INCLUIDO   |  chefe clica               |  ATIVO       |                   |  
                    |                     |             |  no botão 'ativar' (*5)    |              |                   |  
--------------------+--------------------------------------------------------------------------------------------------------------
                    | participante        |  INCLUIDO   |  participante clica no     |  ATIVO       |                   |  
                    |                     |             |  botão 'ativar'            |              |                   |  
    participante    +--------------------------------------------------------------------------------------------------------------
                    | chefe               |  INCLUIDO   |  chefe clica               |              |                   |  
                    |                     |             |  no botão 'enviar para     |  AGUARDANDO  |  participante     |  ATIVO
                    |                     |             |  assinatura' (*6)          |  ASSINATURA  |  assina o TCR     |  
--------------------+--------------------------------------------------------------------------------------------------------------

(*1) para o botão 'assinar' estar disponível para o usuário, ele precisa ser o criador do plano de trabalho, este possuir ao menos uma entrega, e o TCR, se obrigatório/existente, já estar assinado pelo participante; 
(*2) para o botão 'assinar' estar disponível para o gestor, o plano de trabalho precisa possuir ao menos uma entrega, e o TCR, se obrigatório/existente, já estar assinado pelo gestor;

~~~

Ação: ALTERAR -> não muda o status do plano ('INCLUIDO','HOMOLOGANDO','ATIVO')
(RN_PTR_) Condições para que um plano de trabalho possa ser alterado:
    - o usuário logado precisa possuir a capacidade "MOD_PTR_EDT", o plano de trabalho precisa ser válido (ou seja, nem deletado, nem arquivado e com status diferente de 'CANCELADO'), e:
        - estar com o status INCLUIDO ou HOMOLOGANDO, e o usuário logado precisa ser gestor da Unidade do plano, ou esta ser sua Unidade de lotação; ou
        - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B) e possuir a capacidade "MOD_PTR_EDT_FLH" (RN_PTR_C);  ou
        - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANO DE ENTREGA para a Unidade-pai (Unidade A) da Unidade do plano (Unidade B); ou
        - o plano de trabalho precisa estar com o status ATIVO, a Unidade do plano precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PTR_EDT_ATV_HOMOL" ou "MOD_PTR_EDT_ATV_ATV"; ou
        - o usuário precisa possuir também a capacidade "MOD_PTR_QQR_UND".
(RN_PTR_) Qualquer alteração, depois de o plano de trabalho ser homologado, precisa ser notificada ao gestor da Unidade-pai (Unidade A) ou à pessoa que homologou. Essa comunicação sobre eventuais ajustes, não se aplica à Unidade instituidora.
(RN_PTR_AE) Se a alteração for feita com o plano de trabalho no status ATIVO e o usuário logado possuir a capacidade "MOD_PTR_EDT_ATV_HOMOL", o plano de trabalho voltará ao status "HOMOLOGANDO";
(RN_PTR_AF) Se a alteração for feita com o plano de trabalho no status ATIVO e o usuário logado possuir a capacidade "MOD_PTR_EDT_ATV_ATV", o plano de trabalho permanecerá no status "ATIVO";

Ação: ARQUIVAR -> não muda o status do plano ('CONCLUIDO','AVALIADO')
(RN_PTR_) Condições para que um plano de trabalho possa ser arquivado:
    - o plano precisa estar com o status CONCLUIDO ou AVALIADO, não ter sido arquivado, e:
        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PTR_ARQ";
    - Estando na condição de "ARQUIVADO"
        botões-padrão:
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_;
        botões opcionais:
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_;
            - 'Desarquivar'. Condições para ser exibido: vide RN_PTR_;

*/*Ação: ASSINAR -> enquanto faltar assinatura, o plano vai para o (ou permanece no) status de 'AGUARDANDO_ASSINATURA'. Quando o último assinar, o plano vai para o status 'ATIVO'
(RN_PTR_) Condições para que um plano de trabalho possa ser assinado:
    - o plano precisa estar com o status CONCLUIDO ou AVALIADO, não ter sido arquivado, e:
        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PTR_ARQ";
    - Estando no status "AGUARDANDO_ASSINATURA"
        botões-padrão:
            - 'Assinar'. Condições para ser exibido: vide RN_PTR_;
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_;
        botões opcionais:
    - Estando no status "ATIVO"
        botões-padrão:
            - 'Concluir'. Condições para ser exibido: vide RN_PTR_;
        botões opcionais:

*/*Ação: ATIVAR -> o plano vai para o status 'ATIVO'
(RN_PTR_) Condições para que um plano de trabalho possa ser ativado:
    - o plano precisa estar no status 'INCLUIDO' ou 'AGUARDANDO_ASSINATURA', e
        - todas as assinaturas exigidas pelo programa já terem sido realizadas;
    - Estando no status "ATIVO"
        botões-padrão:
            - 'Concluir'. Condições para ser exibido: vide RN_PTR_;
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_;
        botões opcionais:

Ação: CANCELAR PLANO -> o plano adquire o status de 'CANCELADO'
(RN_PTR_) Condições para que um plano de trabalho possa ser cancelado:
    - o usuário logado precisa possuir a capacidade "MOD_PTR_CNC", o plano precisa estar em um dos seguintes status: INCLUIDO, HOMOLOGANDO, ATIVO ou CONCLUIDO; e
        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado;
(RN_PTR_) Quando um plano de trabalho é cancelado, todas as suas entregas são canceladas, vindo a afetar as entregas dos planos de trabalho a elas relacionadas;
    - Estando no status "CANCELADO"
        botões-padrão:
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_;
        botões opcionais:
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_;

Ação: CANCELAR CONCLUSÃO -> o plano retorna ao status de 'ATIVO'
(RN_PTR_) Condições para que um plano de trabalho possa ter sua conclusão cancelada:
    - o plano precisa estar com o status CONCLUIDO e o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
    - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "MOD_PTR_CANC_CONCL";

Ação: CONCLUIR -> o plano adquire o status de 'CONCLUIDO'
(RN_PTR_) Condições para que um plano de trabalho possa ser concluído:
    - o plano precisa estar com o status ATIVO, e:
        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
        - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "MOD_PTR_CONC";
    - Estando no status "CONCLUIDO"
        botões-padrão:
            - 'Avaliar'. Condições para ser exibido: vide RN_PTR_;
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_;
        botões opcionais:
            - 'Avaliar'. Condições para ser exibido: vide RN_PTR_;
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_;
            - 'Cancelar'. Condições para ser exibido: vide RN_PTR_;
            - 'Arquivar'. Condições para ser exibido: vide RN_PTR_;
            - 'Cancelar Conclusão'. Condições para ser exibido: vide RN_PTR_;

Ação: CONSULTAR -> não muda o status do plano
(RN_PTR_)
    - todos os participantes podem visualizar todos os planos de entrega, desde que possuam a capacidade "MOD_PENT";

Ação: DESARQUIVAR -> o plano retorna ao status que estava quando foi arquivado ('CONCLUIDO','AVALIADO')
(RN_PTR_) Condições para que um plano de trabalho possa ser desarquivado:
    - o plano precisa estar arquivado, e:
        - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
        - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PTR_ARQ";

*/*Ação: ENVIAR PARA ASSINATURA -> o plano vai para o status 'AGUARDANDO_ASSINATURA'
(RN_PTR_) Condições para que um plano de trabalho possa ser enviado para assinatura:
        - o plano precisa estar com o status INCLUIDO; e
        - o usuário logado precisa ser o participante do plano; e
        - o programa de gestão precisa não exigir assinatura de ninguém (TCR não obrigatório);
        - Estando no status "AGUARDANDO_ASSINATURA"
            botões-padrão:
                - 'Assinar'. Condições para ser exibido: vide RN_PTR_;
                - 'Consultar'. Condições para ser exibido: vide RN_PTR_;
            botões opcionais:

Ação: EXCLUIR -> não muda o status do plano
(RN_PTR_) Condições para que um plano de trabalho possa ser excluído:
        - o usuário logado precisa possuir a capacidade "MOD_PTR_EXCL", o plano precisa estar com o status INCLUIDO ou HOMOLOGANDO; e
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado;

*/*Ação: INSERIR/INCLUIR -> o plano adquire o status de 'INCLUIDO'
(RN_PTR_) Condições para que um plano de trabalho possa ser criado:
        - o usuário logado precisa possuir a capacidade "MOD_PTR_INCL", e:
            - o usuário logado precisa ser o responsável pelo plano, e ser um participante do PGD habilitado; (RN_PTR_B) ou
            - o usuário logado precisa ser gestor da Unidade Executora do plano; (RN_PTR_B)
        - Estando no status "INCLUIDO"
            botões-padrão:
                - 'Assinar'. Condições para ser exibido: vide RN_PTR_;                  (quando for exigida apenas a assinatura do participante)
                - 'Enviar para Assinatura'. Condições para ser exibido: vide RN_PTR_;   (quando for exigida a assinatura apenas do(s) gestor(es))
                - 'Ativar'. Condições para ser exibido: vide RN_PTR_;                   (quando não for exigida nenhuma assinatura)
                - 'Consultar'. Condições para ser exibido: vide RN_PTR_;
            botões opcionais:

Ação: REATIVAR -> o plano adquire novamente o status de 'ATIVO'
(RN_PTR_) Condições para que um plano de trabalho possa ser reativado:
        - o plano precisa estar com o status SUSPENSO, e
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PTR_RTV"; ou
            - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);

Ação: SUSPENDER -> o plano adquire o status de 'SUSPENSO'
(RN_PTR_) Condições para que um plano de trabalho possa ser suspenso:
        - o plano precisa estar com o status ATIVO, e
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PTR_SUSP"; ou
            - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);
        - Estando no status "SUSPENSO"
            botões-padrão:
                - 'Reativar'. Condições para ser exibido: vide RN_PTR_;
                - 'Consultar'. Condições para ser exibido: vide RN_PTR_;
            botões-opcionais:
                - 'Reativar'. Condições para ser exibido: vide RN_PTR_;
                - 'Consultar'. Condições para ser exibido: vide RN_PTR_;

## REGRAS DE NEGÓCIO APLICADAS ÀS ENTREGAS DO PLANO DE TRABALHO

(RN_PTR_ENT_) A distribuição dos percentuais de carga horária do participante deve atender a três categorias de atividades: aquelas vinculadas a entregas do plano de trabalho da unidade, aquelas não vinculadas a entregas mas que são do interesse da sua unidade organizacional, e por fim aquelas vinculadas a entregas de um plano de trabalho de outra unidade organizacional.
(RN_PTR_ENT_) As entregas de um Plano de Trabalho só podem ser vinculadas a entregas de Planos de Entregas homologados (vide RN_PTR_G)
(RN_PTR_ENT_) Toda atividade deve gerar uma entrega/resultado;

## QUESTÕES PENDENTES

. a data final deve ser maior que a data inicial (não pode nem ser igual);