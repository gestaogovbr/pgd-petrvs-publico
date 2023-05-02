# Módulo: Planejamento Institucional  

## ACESSOS  

> MOD_PLAN_INST  
> MOD_PLAN_INST_CONS  
> MOD_PLAN_INST_INCL  
> MOD_PLAN_INST_INCL_UNID_INST  
> MOD_PLAN_INST_INCL_UNEX_LOTPRI  
> MOD_PLAN_INST_INCL_UNEX_QQLOT  
> MOD_PLAN_INST_INCL_UNEX_SUBORD  
> MOD_PLAN_INST_INCL_UNEX_QUALQUER  
> MOD_PLAN_INST_EDT  
> MOD_PLAN_INST_EXCL  

- Video da modelagem técnica  
    <https://drive.google.com/file/d/1rzUzlzU26MVcvnGwVA2BVUgEzW_sUXqV/view>  
    início: 4min30s  
    continuação: 46min15s

## ENTIDADE: Eixos Temáticos

- Tabela: eixos_tematicos

> Nome (\*)  
> Icone (\*)  
> Cor (\*)  
> Descrição (\*)  
> (id/created_at/updated_at/data_inicio/data_fim)  
>  
> (*) campo obrigatório

## ENTIDADE: Planejamento Institucional

- Tabela: planejamentos

> Nome (\*)  
> Missão (\*)  
> Visão (\*)  
> Valores (\**)  
> inicio (\*)  
> fim  
> (id/created_at/updated_at/data_inicio/data_fim)  
> &ensp;&ensp;&ensp;&ensp;entidade_id (\*)  
> &ensp;&ensp;&ensp;&ensp;unidade_id (\***)  
> &ensp;&ensp;&ensp;&ensp;planejamento_superior_id (***)  
>  
> (\*) campo obrigatório  
> (\**) é obrigatória a existência de ao menos um valor institucional  
> (\***) se o planejamento for de uma Unidade Executora, é obrigatória a definição do  
> planejamento superior ao qual ele está vinculado  

### VALIDAÇÕES

- A data do início não pode ser maior que a data do fim;  
- Permissão do usuário para criar Planejamentos para a Unidade Instituidora (MOD_PLAN_INST_INCL_UNID_INST);  
- Permissão do usuário para criar Planejamentos para Unidades executoras quaisquer (MOD_PLAN_INST_INCL_UNEX_QUALQUER);  
- Permissão do usuário para criar Planejamentos para Unidades executoras subordinadas (MOD_PLAN_INST_INCL_UNEX_SUBORD);  
- Permissão do usuário para criar Planejamentos para qualquer Unidade executora das suas lotações (MOD_PLAN_INST_INCL_UNEX_QQLOT);  
- Permissão do usuário para criar Planejamentos para a Unidade executora de sua lotação principal (MOD_PLAN_INST_INCL_UNEX_LOTPRI);

## ENTIDADE: Objetivos

- Tabela: planejamentos_objetivos

> nome (\*)  
> fundamentação (\*)  
> (id/created_at/updated_at/data_inicio/data_fim)
> planejamento_id (\*)  
> &ensp;&ensp;&ensp;&ensp;eixo_tematico_id (\*)  
> &ensp;&ensp;&ensp;&ensp;objetivo_superior_id  
>
> (\*) campo obrigatório

### VALIDAÇÕES

- Quando o Planejamento é de uma Unidade Executora é obrigatório associar cada um dos seus objetivos a um objetivo do Planejamento Institucional superior!  

# Exemplo de grid

> Nome: Planejamento Institucional do Biênio 2023-2024  
> Entidade:           Unidade:  
> Missão:  
> Visão:  
> Valores:  
> Inicio:         Fim:  
>  
> -------------------------------------------  
>     Objetivo       ObjSuperior      [ + ]
> EIXO TEMATICO 1  
>&ensp;&ensp;Objetivo1      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ObjSup1  
>&ensp;&ensp;Objetivo2      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ObjSup4  
>  
> EIXO TEMATICO 2  
>&ensp;&ensp;Objetivo1      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ObjSup7  
>&ensp;&ensp;Objetivo2      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ObjSup7  
