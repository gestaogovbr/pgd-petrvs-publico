# Módulo: Atividade

## Acessos  

~~~text
    MOD_PTR - Permite acessar item menu plano de trabalho
~~~

## REGRAS DE NEGÓCIO APLICADAS AOS PLANOS DE TRABALHO

1. (RN_ATV_X) Somente é permitido iniciar a atividade se o usuário responsável for o próprio usuário ou se tiver o MOD_ATV_USERS_INICIAR
2. (RN_ATV_X) Para incluir/alterar atividades o usuário logado precisa ser lotado ou colaborar da unidade, ou a unidade ser subordinada hierarquicamente a dele
3. (RN_ATV_X) O responsável pela atividade precisa ser lotado ou colaborar da unidade, ou o usuário logado possuir as capacidades MOD_ATV_EXT ou MOD_ATV_USERS_ATRIB
2. (RN_ATV_X) Unidade da atividade deve obrigatoriamente ser a unidade do plano de trabalho (quando o plano for informado)
2. (RN_ATV_X) A entrega vinculada a atividade deve ter período compativel com a da atividade (se for entrega de plano de entrega será a data da entrega, caso seja do catálogo de entregas então deverá ser o período do plano de trabalho)

## REGRAS DE INTERFACE

1. (RI_ATV_1) No formulário de inclusão/edição de um plano de trabalho, o input-search de plano de entregas deve ficar desabilitado nas edições e habilitado apenas nas inclusões;

## FLUXO DOS PLANOS DE TRABALHO  

~~~text
'ATIVO', 'AVALIADO', 'CANCELADO', 'CONCLUIDO', 'HOMOLOGANDO', 'INCLUIDO', 'INICIADO', 'LANCADO', 'RECORRIDO', 'SUSPENSO'


~~~
