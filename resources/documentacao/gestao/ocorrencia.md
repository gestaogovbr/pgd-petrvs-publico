# Módulo: Atividade

## Acessos  

~~~text
    MOD_OCOR - Permite consultar ocorrência
    MOD_OCOR_EDT - Permite editar ocorrência
    MOD_OCOR_EXCL - Permite excluir ocorrência
    MOD_OCOR_INCL - Permite incluir ocorrência
~~~

## REGRAS DE NEGÓCIO APLICADAS AS ATIVIDADES

1. (RN_OCOR_1) Usuário do Plano de Trabalho deve obrigatoriamente ser o mesmo da ocorrência
2. (RN_OCOR_2) Ocorrência vinculada a plano de trabalho deverá ter algum perído coincidente com o do plano

## REGRAS CORRELACIONADAS

## REGRAS DE INTERFACE

1. (RI_OCOR_1) A seleção de um plano de trabalho não é obrigatória, mas caso selecionado, o usuário do plano deverá ser o mesmo