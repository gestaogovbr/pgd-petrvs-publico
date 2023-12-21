# Módulo: Consolidações do Plano de Trabalho

## Acessos  

~~~text
    MOD_PTR_CSLD - Módulo de consolidações do Plano de Trabalho
    MOD_PTR_CSLD_EDT - Permite editar a consolidação do planos de trabalho
    MOD_PTR_CSLD_EXCL - Permite excluir a consolidação do planos de trabalho
    MOD_PTR_CSLD_INCL - Permite incluir a consolidação do planos de trabalho
    MOD_PTR_CSLD_CONCL - Permite a conclusão da consolidação do planos de trabalho
    MOD_PTR_CSLD_DES_CONCL - Permite desfazer conclusão da consolidação do planos de trabalho
~~~

## REGRAS DE NEGÓCIO APLICADAS AS CONSOLIDAÇÕES

1. (RN_CSLD_1) Após criado ou alterado um plano de trabalho, os períodos de consolidação são automaticamente gerados ou recriados com base na periodicidade configurada no programa;
2. (RN_CSLD_2) O plano de trabalho somente poderá ser alterado: se a nova data de início não for superior a algum perído já CONCLUIDO ou AVALIADO, ou até o limite da primeira ocorrência ou atividade já lançados; e se a nova data de fim não for inferior a algum perído já CONCLUIDO ou AVALIADO, ou até o limite da última ocorrência ou atividade já lançados;  
3. Caso o plano seja alterado:
    1. (RN_CSLD_3) Caso exista uma ocorrência que faça interseção no período e tenha data_fim maior que a calculada, a data_fim do período irá crescer;
    2. (RN_CSLD_4) Caso exista períodos iguais, o período existente será mantido (para este perído nada será feito, manterá a mesma ID);
    3. Se houver intersecção do período gerado com um existente que esteja com status CONCLUIDO ou AVALIADO:
        1. (RN_CSLD_5) Se as datas de início forem iguais o periodo existente será mantido;
        2. (RN_CSLD_6) Se as datas de início forem diferente, então será criado um novo perído entre o novo início e o início do período CONCLUIDO/AVALIADO, e o período CONCLUIDO/AVALIADO será mantido.
    4. (RN_CSLD_7) Ocorrências e Atividades devem ser transferiadas para os novos perídos.
4. (RN_CSLD_8) Após a data fim, e passado-se os dias determinado na Tolerância determinada no programa para lançamento da consolidação, o sistema automaticamente irá alterar o status de INCLUIDO para CONCLUIDO;
5. (RN_CSLD_9) Se uma atividade for iniciada em uma outra consolidação anterior (CONCLUIDO ou AVALIADO), não poderá mais retroceder nem editar o inicio (Exemplo.: Retroceder de INICIADO para INCLUIDO, ou de CONCLUIDO para INICIADO);
6. (RN_CSLD_10) A atividade já iniciado so não pode pausar com data retroativa da última consolidação CONCLUIDO ou AVALIADO;
7. (RN_CSLD_11) Não pode concluir a consolidação antes que a anterior não esteja concluida, e não pode retornar status da consolidação se a posterior estiver a frente (em status);
8. (RN_CSLD_12) Tarefas concluidas de atividades em consolidação CONCLUIDO ou AVALIADO não poderão mais ser alteradas/excluidas, nem Remover conclusão;
9. (RN_CSLD_13) Tarefas de atividades em consolidação CONCLUIDO ou AVALIADO não poderão mais ser alteradas/excluidas, somente a opção de Concluir ficará disponível;
10. (RN_CSLD_14) Não será possível lançar novas atividades em períodos já CONCLUIDO ou AVALIADO.

## REGRAS DE INTERFACE

1. (RI_CSLD_1) Após a data fim da consolidação, e estando dentro da Tolerância determinada no programa para lançamento da consolidação, o sistema deve avisar ao usuário no grid quantos dias restam para ele lançar as consolidações;
2. (RI_CSLD_2) Apenas será expansível (mostrando os períodos de consolidação) os planos de trabalho que não estiverem com status de "INCLUIDO";
3. (RI_CSLD_3) Apenas será permitido realizar lançamentos para planos de trabalho "ATIVO";
4. (RI_CSLD_4) Apenas será permitido realizar lançamentos para periodos de consolidação com status de "INCLUIDO";
5. (RI_CSLD_5) Ao concluir a consolidação deixar somente o botão de consultar nas atividades.

## FLUXO DOS PLANOS DE TRABALHO  

~~~text
* Inicia sempre no status INCLUIDO
    - O usuário poderá lançar suas atividades; ocorrências; afastamentos, e então informar que os lançamentos foram concluídos alterando o status para CONCLUIDO
    - Após passado a data fim mais a tolerância definida no programa, o status irá automaticamente para CONCLUIDO
*  Entrando no status CONCLUIDO
    - O usuário que tiver o acesso ao MOD_PTR_CSLD_DES_CONCL poderá retornar para o status de INCLUIDO, independente de extrapolado a tolerância, mas neste caso o sistema irá retornar para CONCLUIDO novamente já na próxima execução das RotinasDiarias (Provavelmente agendado para às 0h do dia seguinte)
    - O Chefe do setor ou que tenha atribuição para avaliar planos na unidade poderá realizar a avaliação, e o status irá para AVALIADO
* Entrando no status AVALIADO
    - Somente quem tem prerrogativas para avaliar, poderá retornar para o status de CONCLUIDO
~~~

