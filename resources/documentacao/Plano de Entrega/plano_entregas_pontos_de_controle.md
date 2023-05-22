# Módulo: Plano de Entregas

##  Acessos  
~~~
    MOD_PENT_CONS
    MOD_PENT_INCL
    MOD_PENT_EDT
    MOD_PENT_EXCL
~~~

## Planos de Entrega
-   Tabela: planos_entregas
~~~   
    numero (*)
    nome (*)
    inicio (*)
    fim
    (id/created_at/updated_at/data_inicio/data_fim)
        unidade_id (*)
        cadeia_valor_id
        planejamento_id

    (*) campo obrigatório
~~~
