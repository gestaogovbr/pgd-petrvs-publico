# MÓDULO: PLANEJAMENTO INSTITUCIONAL

## CAPACIDADES  

~~~text
    MOD_PLAN_INST  
    MOD_PLAN_INST_CONS  
    MOD_PLAN_INST_INCL  
    MOD_PLAN_INST_INCL_UNID_INST  
    MOD_PLAN_INST_INCL_UNEX_LOTPRI  
    MOD_PLAN_INST_INCL_UNEX_QQLOT  
    MOD_PLAN_INST_INCL_UNEX_SUBORD  
    MOD_PLAN_INST_INCL_UNEX_QUALQUER  
    MOD_PLAN_INST_EDT  
    MOD_PLAN_INST_EXCL  
~~~

## BANCO DE DADOS

~~~text
Tabela: planejamentos

Campos obrigatórios:
    nome
    missao
    visao
    valores
    data_inicio
    entidade_id
    unidade_id
~~~

## REGRAS DE NEGÓCIO

(RN_PLAN_INST_A) Para a criação de um planejamento institucional são informações obrigatórias: nome, missão, visão, data de início, data de fim, unidade responsável e ao menos um dos valores institucionais.
(RN_PLAN_INST_B) Não pode existir mais de um planejamento institucional para uma mesma unidade em um mesmo período de tempo.
(RN_PLAN_INST_C) Um Planejamento Institucional pode ser ou não vinculado ao planejamento institucional de uma unidade hierarquicamente superior.
(RN_PLAN_INST_D) Cada objetivo de um Planejamento Institucional deve estar associado a um eixo temático.
(RN_PLAN_INST_E) Um objetivo de um Planejamento Institucional pode agrupar outros objetivos do mesmo Planejamento (um objetivo pode ser objetivo-pai de outros, dentro do mesmo Planejamento).
(RN_PLAN_INST_F) Quando um objetivo de um Planejamento Institucional é pai de outros, todos os seus filhos estarão obrigatoriamente vinculados ao mesmo eixo temático do objetivo-pai.
(RN_PLAN_INST_G) Quando um Planejamento Institucional possui vínculo com um Planejamento Institucional Superior, os objetivos daquele podem estar ou não vinculados aos objetivos deste.
(RN_PLAN_INST_H) Quando um objetivo de um Planejamento Institucional está vinculado a um objetivo de um Planejamento Institucional superior, o eixo temático daquele pode ser diverso do eixo temático deste.

(RN_PLAN_INST_) 
(RN_PLAN_INST_) 
(RN_PLAN_INST_) 
(RN_PLAN_INST_) 
(RN_PLAN_INST_) 
(\**) é obrigatória a existência de ao menos um valor institucional  
(\***) se o planejamento for de uma Unidade Executora, é obrigatória a definição do  
planejamento superior ao qual ele está vinculado  
## OBJETIVOS

(RN_PLAN_INST_OBJ_A) Quando o Planejamento é de uma Unidade Executora é obrigatório associar cada um dos seus objetivos a um objetivo do Planejamento Institucional superior!"
## QUESTÕES PENDENTES

- Definir se há ou não obrigatoriedade de um planejamento estar vinculado a outro superior. (vide RN_PLAN_INST_C)
- A data do início não pode ser maior que a data do fim;  
- Permissão do usuário para criar Planejamentos para a Unidade Instituidora (MOD_PLAN_INST_INCL_UNID_INST);  
- Permissão do usuário para criar Planejamentos para Unidades executoras quaisquer (MOD_PLAN_INST_INCL_UNEX_QUALQUER);  
- Permissão do usuário para criar Planejamentos para Unidades executoras subordinadas (MOD_PLAN_INST_INCL_UNEX_SUBORD);  
- Permissão do usuário para criar Planejamentos para qualquer Unidade executora das suas lotações (MOD_PLAN_INST_INCL_UNEX_QQLOT); 
 
- Permissão do usuário para criar Planejamentos para a Unidade executora de sua lotação principal (MOD_PLAN_INST_INCL_UNEX_LOTPRI);


- Tabela: planejamentos_objetivos

~~~text
    nome (*)                                    // nome do objetivo
    fundamentação (*)                           // justificativa para a existência do objetivo
    path                                        // IDs dos nós ascendentes separados por /, ou NULL caso seja um nó raiz
    sequencia (*)                               // Sequência utilizada para ordenar os objetivos
    (id/created_at/updated_at/deleted_at)
        planejamento_id (*)                     // Planejamento ao qual se refere o objetivo
        eixo_tematico_id (*)                    // Eixo temático ao qual se refere o objetivo
        objetivo_superior_id (**)               // Objetivo do planejamento superior ao qual está vinculado este objetivo, se for o caso
        objetivo_pai_id                         // Objetivo pai do objetivo (se for um nós raiz, este campo será NULL)

    (*) campo obrigatório
    (**) campo obrigatório somente se o planejamento for de uma Unidade Executora
~~~

### VALIDAÇÕES

***** REVER ESSA REGRA: Quando o Planejamento é de uma Unidade Executora é obrigatório associar cada um dos seus objetivos a um objetivo do Planejamento Institucional superior!  Se for assim, em um planejamento de unidade executora, não precisa ser exibido o campo eixo tematico
***** As datas de início e fim do planejamento da Unidade executora devem estar dentro do período do planejamento superior?
***** Quais unidades executoras devem aparecer na hora de escolher a unidade executora do planejamento?
***** Verificar: Na edição de um planejamento de uma unidade executora, o campo SELECIONE O PLANEJAMENTO SUPERIOR VINCULADO deve/não deve mais ser exibido, já que ele não pode ser alterado
***** No form de objetivos de planejamento não está aparecendo o nome do planejamento superior vinculado

### Exemplo de grid

 Nome: Planejamento Institucional do Biênio 2023-2024  
 Entidade:           Unidade:  
 Missão:  
 Visão:  
 Valores:  
 Inicio:         Fim:  
  
 -------------------------------------------  
     Objetivo       ObjSuperior      [ + ]
 EIXO TEMATICO 1  
&ensp;&ensp;Objetivo1      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ObjSup1  
&ensp;&ensp;Objetivo2      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ObjSup4  
  
 EIXO TEMATICO 2  
&ensp;&ensp;Objetivo1      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ObjSup7  
&ensp;&ensp;Objetivo2      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ObjSup7  
