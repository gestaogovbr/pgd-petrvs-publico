# Módulo: Unidades

## Acessos  

~~~text
    MOD_UND_CONS - Permite consultar Unidades
    MOD_UND_EDT - Permite editar Unidade
    MOD_UND_EDT_FRM - Permite editar unidades formais (SIAPE ou não)
    MOD_UND_EXCL - Permite excluir Unidade
    MOD_UND_INCL - Permite incluir Unidade
    MOD_UND_INCL_FRM - Permite incluir unidades formais (SIAPE ou não)
    MOD_UND_UNIR - Permite unificar Unidades
    MOD_UND_TUDO - Permite consultar qualquer unidade independente de subordinação
    MOD_UND_INATV - Permite inativar uma unidade
    MOD_UND_INTG - Permite gerenciar integrantes da unidade
    MOD_UND_INTG_INCL - Permite incluir integrantes da unidade
    MOD_UND_INTG_EDT - Permite editar integrantes da unidade
    MOD_UND_INTG_EXCL - Permite excluir integrantes da unidade
~~~

## REGRAS DE NEGÓCIO APLICADAS AS UNIDADES

(RN_UND_A) Não poderá haver mais de uma unidade com a mesma sigla abaixo da mesma unidade-pai como ATIVA
(RN_UND_B) Não poderá haver mais de uma unidade com o mesmo código como ATIVA
(RN_UND_C) Permitir inserir unidades sem código, e na exportação para API considerar o mesmo código da primeira unidade superior com código
(RN_UND_D) Podem ser cadastradas e atualizadas automaticamente a partir da integração com o SIAPE, quando habilitado

(RN_UND_E) Quando utilizando integração com o SIAPE, as unidades serão inativadas quando não constarem na lista de unidades vindas do SIAPE, exceto as que se enquadrarem na regra RN_UND_F
(RN_UND_F) Unidades cadastradas (com código vazio) devem permanecer ATIVO mesmo após a execução da rotina de integração com o SIAPE
(RN_UND_G) O gestor titular de uma unidade formal necessariamente precisa estar lotado nela
(RN_UND_H) Uma unidade informal não pode possuir vínculo de lotação com nenhum servidor
(RN_UND_I) Um mesmo usuário não pode ser gestor titular simultaneamente de mais de uma unidade formal
(RN_UND_J) Um mesmo usuário pode ser gestor titular simultaneamente de mais de uma unidade informal, inclusive se já for gestor titular de uma unidade formal
(RN_UND_K) Uma unidade, seja formal ou informal, só pode possuir, no máximo, um gestor titular, um gestor substituto, e um gestor delegado
(RN_UND_L) 
(RN_UND_) 
(RN_UND_) 
(RN_UND_) 
(RN_UND_) 
(RN_UND_) 
(RN_UND_) 
(RN_UND_) 

## REGRAS DE INTERFACE
