# Módulo: Avaliação (Consolidação do Plano de Trabalho e Plano de Entrega)

## Acessos  

~~~text
    MOD_PENT_AVAL - Permite avaliar planos de entregas das unidades imediatamente subordinadas
    MOD_PENT_CANC_AVAL - Permite cancelar a avaliação dos planos de entregas das unidades imediatamente subordinadas
    MOD_PENT_AVAL_SUBORD - Permite avaliar planos de entregas de todas as unidades subordinadas à sua unidade de lotação
    MOD_PTR_CSLD_AVAL - Permite avaliar
    MOD_PTR_CSLD_CANC_AVAL - Permite cancelar avaliação
~~~

## REGRAS DE NEGÓCIO APLICADAS AS AVALIAÇÕES DO PLANO DE TRABALHO E DO PLANO DE ENTREGA

1. (RN_AVL_1) [PT;PE] A avaliação somente poderá ser realizada pelo superior imediatamente hierárquico ou por quem delegado através da atribuição de avaliador (no caso de consolidação o superior hierárquico é o gestor da unidade, substituto ou delegado, já para o plano de entrega o superior será o gestor, substituto ou delegado da unidade imediatamente superior). Deverá possuir tambem a capacidade MOD_PTR_CSLD_AVAL (consolidação do plano de trabalho), ou MOD_PENT_AVAL/MOD_PENT_AVAL_SUBORD (plano de entrega);
1. (RN_AVL_2) [PT] O usuário do plano de trabalho poderá recorrer da nota atribuida dentro do limites estabelecido pelo programa;
1. (RN_AVL_3) [PT] Após o recurso será realizado nova avaliação, podendo essa ser novamente recorrida dentro do mesmo prazo estabelecido no programa;

// Criar as regras de avaliação automática e colocar aqui

## REGRAS DE INTERFACE

1. (RI_AVL_1) [PT;PE] Caso a nota atribuida necessite de justificativa, será necessário selecionar ao menos uma justificativa no rol disponibilizado ou escrever no campo de justificativa
1. (RI_AVL_2) [PT;PE] O avaliador poderar optar por arquivar (as Atividades em caso de Plano de Trabalho, ou o próprio Plano de Entrega) após a avaliação

## FLUXO DA AVALIAÇÃO

~~~text

~~~


