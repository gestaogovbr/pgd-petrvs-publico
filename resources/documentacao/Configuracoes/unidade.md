# Módulo: Unidades

## Acessos  

~~~text
    MOD_UND_CONS - Permite consultar Unidades
    MOD_UND_EDT - Permite editar Unidade
    MOD_UND_EXCL - Permite excluir Unidade
    MOD_UND_INCL - Permite incluir Unidades
    MOD_UND_UNIR - Permite Unificar Unidades
    MOD_UND_TUDO - Permite consultar qualquer unidade independente de subordinação
    MOD_UND_INATV - Permite inativar uma unidade
    MOD_UND_INTG - Permite gerenciar integrantes da unidade
    MOD_UND_INTG_INCL - Permite incluir integrantes da unidade
    MOD_UND_INTG_EDT - Permite editar integrantes da unidade
    MOD_UND_INTG_EXCL - Permite excluir integrantes da unidade
~~~

## REGRAS DE NEGÓCIO APLICADAS AS UNIDADES

1. (RN_UND_1) Não poderá haver mais de uma unidade com a mesma sigla dentro do mesmo pai como ATIVO
2. (RN_UND_2) Não poderá haver mais de uma unidade com a mesmo código como ATIVO
3. (RN_UND_3) Permitir inserir unidades sem código, e na exportação para API considerar o código da primeira unidade superior com código
4. (RN_UND_4) Podem ser cadastradas e atualizadas automaticamente a partir da integração com o SIAPE, quando habilitado
5. (RN_UND_5) Quando utilizando integração com o SIAPE, as unidades serão inativadas quando não constarem na lista de unidades vindas do SIAPE
4. (RN_UND_6) Unidades cadastradas (com código vazio) devem permanecer ATIVO mesmo após a execução da rotina de integração com o SIAPE

## REGRAS DE INTERFACE




