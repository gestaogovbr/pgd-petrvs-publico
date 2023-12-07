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

1. (RN_UND_A) Não poderá haver mais de uma unidade com a mesma SIGLA abaixo da mesma UNIDADE-PAI como ATIVA;
2. (RN_UND_B) Não poderá haver mais de uma unidade com o mesmo código como ATIVA (vide RN_UND_G);
3. (RN_UND_C) Permitir inserir unidades informais (sem código), e na exportação para a API do Órgão Central, incluir seus dados nos dados da primeira unidade hierarquicamente superior com código (unidade formal);
4. (RN_UND_D) Devem ser cadastradas e atualizadas automaticamente a partir da integração com o SIAPE, quando for o caso;
5. (RN_UND_E) Quando utilizando integração com o SIAPE, as unidades serão inativadas quando não constarem na lista de unidades vindas do SIAPE, exceto as unidades informais (RN_UND_F);
6. (RN_UND_F) Unidades informais cadastradas (com código vazio) devem permanecer com status ATIVO mesmo após a execução da rotina de integração com o SIAPE;
7. (RN_UND_G) Todas as unidades informais possuem código nulo;
8. (RN_UND_H) Nos Órgãos que usarem integração com o SIAPE só poderão ser inseridas unidades informais;
9. (RN_UND_I) Nos Órgãos que usarem integração não poderão ser editadas as seguintes informações das unidades formais: flag de formal/informal, código, sigla, nome, gestor, gestor substituto, cidade, e unidade-pai. Essas informações só podem ser atualizadas pela rotina de integração com o SIAPE.
10. (RN_UND_J) 
11. (RN_UND_K)
12. (RN_UND_L)
13. (RN_UND_M)

## REGRAS DE INTERFACE
1. (RI_UND_A) Na inclusão de uma unidade, 
2. (RI_UND_B)
3. (RI_UND_C)
4. (RI_UND_D)
5. (RI_UND_E)