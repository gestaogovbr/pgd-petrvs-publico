#   Planejamento Institucional

-   Video da modelagem técnica
https://drive.google.com/file/d/1rzUzlzU26MVcvnGwVA2BVUgEzW_sUXqV/view
início: 4min30s

-   O cadastramento do planejamento institucional e da cadeia de valor deve ser feito por usuário com perfil administrador/gestor indicado pelo chefe da unidade instituidora (ou pelo chefe de gabinete da unidade instituidora).

##  Eixos Temáticos (Grupo de objetivos)
-   Tabela: eixos_tematicos
~~~   
    Nome
    Icone
    Cor
    Descrição
    (id/created_at/updated_at/data_inicio/data_fim)
~~~

##  Planejamento Institucional
-   Tabela: planejamentos
~~~
    Nome
    Missão
    Visão
    Valores
    inicio
    fim
    (id/created_at/updated_at/data_inicio/data_fim)
        entidade_id
        unidade_id
~~~

##  Objetivos
-   Tabela: planejamentos_objetivos
~~~
    nome
    fundamentação
    (id/created_at/updated_at/data_inicio/data_fim)
        planejamento_id
        eixo_tematico_id
        objetivo_pai_id
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
    Objetivo2      ObjSup2

EIXO TEMATICO 2
    Objetivo1      ObjSup1
    Objetivo1    
~~~