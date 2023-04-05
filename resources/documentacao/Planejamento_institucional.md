#   Módulo: Planejamento Institucional

##  Acessos  
-   válidos para *'planejamento institucional'* e *'eixos temáticos'*
~~~
    MOD_PLAN_INST_CONS
    MOD_PLAN_INST_INCL
    MOD_PLAN_INST_EDT
    MOD_PLAN_INST_EXCL
~~~

-   Video da modelagem técnica  
    https://drive.google.com/file/d/1rzUzlzU26MVcvnGwVA2BVUgEzW_sUXqV/view  
    início: 4min30s
    continuação: 46min15s

-   O cadastramento do planejamento institucional e da cadeia de valor deve ser feito por usuário com perfil  
    administrador/gestor indicado pelo chefe da unidade instituidora (ou pelo chefe de gabinete da unidade instituidora).

##  Eixos Temáticos (Grupo de objetivos)
-   Tabela: eixos_tematicos
~~~   
    Nome (*)
    Icone (*)
    Cor (*)
    Descrição (*)
    (id/created_at/updated_at/data_inicio/data_fim)

    (*) campo obrigatório
~~~

##  Planejamento Institucional
-   Tabela: planejamentos
~~~
    Nome (*)
    Missão (*)
    Visão (*)
    Valores
    inicio (*)
    fim
    (id/created_at/updated_at/data_inicio/data_fim)
        entidade_id (*)
        unidade_id

    (*) campo obrigatório
~~~

##  Objetivos
-   Tabela: planejamentos_objetivos
~~~
    nome
    fundamentação
    (id/created_at/updated_at/data_inicio/data_fim)
        planejamento_id
        eixo_tematico_id
        objetivo_superior_id
~~~

### Exemplo de grid
~~~
Nome: Planejamento Institucional do Biênio 2023-2024
Entidade:           Unidade:
Missão:
Visão:
Valores:
Inicio:         Fim:
-------------------------------------------
    Objetivo       ObjSuperior      [ + ]
----------+--------------------------------
EIXO TEMATICO 1
    Objetivo1      ObjSup1
    Objetivo2      ObjSup4

EIXO TEMATICO 2
    Objetivo1      ObjSup7
    Objetivo2      ObjSup7
~~~