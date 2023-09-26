# Módulo: Atividade

## Acessos  

~~~text
    MOD_ATV - Permite acessar item menu plano de trabalho
    MOD_ATV_TIPO_ATV_VAZIO - Permite incluir atividade sem tipo de atividade
    MOD_ATV_CONS - Permite consultar atividade
    MOD_ATV_EDT - Permite editar atividade
    MOD_ATV_EXCL - Permite excluir atividade
    MOD_ATV_USU_EXT - Permite atribuir atividades a usuários de outra unidade
    MOD_ATV_INCL - Permite incluir atividade
    MOD_ATV_INICIO - Permite definir início atividade
    MOD_ATV_RESP_INICIAR - Permite incluir responsável por atividade
    MOD_ATV_TRF_INCL - Permite incluir tarefas dentro de atividades
    MOD_ATV_TRF_EDT - Permite editar tarefas dentro de atividades
    MOD_ATV_TRF_EXCL - Permite exluir tarefas dentro de atividades
    MOD_ATV_TRF_CONS - Permite consultar tarefas dentro de atividades
    MOD_ATV_CLONAR - Permite clonar atividades
~~~

## REGRAS DE NEGÓCIO APLICADAS AS ATIVIDADES

1. (RN_ATV_X) Somente é permitido iniciar a atividade se o usuário responsável for o próprio usuário ou se tiver o MOD_ATV_USERS_INICIAR
2. (RN_ATV_X) Para incluir/alterar atividades o usuário logado precisa ser lotado ou colaborar da unidade, ou a unidade ser subordinada hierarquicamente a dele
3. (RN_ATV_X) O responsável pela atividade precisa ser lotado ou colaborar da unidade, ou o usuário logado possuir as capacidades MOD_ATV_EXT ou MOD_ATV_USERS_ATRIB
2. (RN_ATV_X) Unidade da atividade deve obrigatoriamente ser a unidade do plano de trabalho (quando o plano for informado)
2. (RN_ATV_X) A entrega vinculada a atividade deve ter período compativel com a da atividade (se for entrega de plano de entrega será a data da entrega, caso seja do catálogo de entregas então deverá ser o período do plano de trabalho)

## REGRAS CORRELACIONADAS

1. (RN_CSLD_9) Se uma atividade for iniciada em uma outra consolidação anterior (CONCLUIDO ou AVALIADO), não poderá mais retroceder nem editar o inicio (Exemplo.: Retroceder de INICIADO para INCLUIDO, ou de CONCLUIDO para INICIADO);
2. (RN_CSLD_10) A atividade já iniciado so não pode pausar com data retroativa da última consolidação CONCLUIDO ou AVALIADO
3. (RN_CSLD_12) Tarefas concluidas de atividades em consolidação CONCLUIDO ou AVALIADO não poderão mais ser alteradas/excluidas, nem Concluir ou Remover conclusão.
4. (RN_CSLD_13) Tarefas de atividades em consolidação CONCLUIDO ou AVALIADO não poderão mais ser alteradas/excluidas, somente a opção de Concluir ficará disponível.

## REGRAS DE INTERFACE

1. (RI_ATV_X) 

## FLUXO DAS ATIVIDADE

~~~text

Inicia com INCLUIDO ao adicionar uma nota atividade diretamente pelo botão Incluir:

* INCLUIDO, podendo ir para
  - INICIADO: Ao clicar em iniciar a atividade
* INICIADO, podendo ir para:
  - INCLUIDO: Caso cancele a inicialização
  - PAUSADO: Caso adicione uma pausa
  - CONCLUIDO: Caso conclua a atividade
* PAUSADO, podendo ir para:
  - INCIADO: Caso reinicie a atividade
* CONCLUIDO, podendo ir para:
  - INICIADO: Caso cancele a conclusão
  - ARQUIVADO: Caso opte por arquivar

~~~