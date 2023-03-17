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

## Entregas do Plano de Entregas
-   Tabela: planos_entregas_entregas
~~~   
    inicio (*)
    fim
    descricao (*)
    cliente (*)
    homologado (*)
    meta (*)
    realizado
    situacao
    (id/created_at/updated_at/data_inicio/data_fim)
        plano_entrega_id (*)
        entrega_id (*)
        entrega_pai_id

    (*) campo obrigatório
~~~

## Pontos de Controle do Plano de Entregas
-   Tabela: planos_entregas_pontos_controles
~~~   
    inicio (*)
    fim
    descricao (*)
    cliente (*)
    homologado (*)
    meta (*)
    realizado
    situacao
    (id/created_at/updated_at/data_inicio/data_fim)
        plano_entrega_id (*)
        entrega_id (*)
        entrega_pai_id

    (*) campo obrigatório
~~~

## Regras de Negócio

-   As entregas que compõem um Plano de Entregas pertencem todas à Unidade Executora do Plano;  
-   O gestor da Unidade Executora e o gestor da Unidade hierarquicamente superior a ela podem iniciar a elaboração de Planos de Entrega da Unidade Executora;  
-   Ao criar um Plano de Entregas deve-se inserir ao menos uma entrega;  
-   As entregas incluídas/alteradas na criação/edição de um Plano de Entregas precisam ser homologadas pelo Chefe da Unidade hierarquicamente superior;
-   O superior hierarquico pode apenas aprovar ou realizar ajustes no Plano de Entregas;
-   O Plano de Entregas somente pode ser elaborado pelo Chefe da unidade para sua própria unidade ou para aquelas subordinadas a ele;
-   Aprovado o plano de entregas, ou seja, todas as suas entregas estão homologadas, esta fase está encerrada. Com o plano de entregas aprovado a unidade está em PGD.  
-   O superior hierárquico deve poder visualizar o conjunto dos planos de entregas das unidades hierarquicamente a ele subordinadas. Esse conjunto será o seu plano de entregas, se for o caso.
-   Os planos de entregas vão gerar dados que serão enviados ao órgão central;  
-   O Plano de Entregas tem 6 status:
```
    -   rascunho
    -   enviado para aceite
    -   em execução
    -   reprovado
    -   finalizado
    -   avaliado
```  
-   A unidade de execução poderá ter mais de um plano de entrega com status 'enviado para aceite' e 'em execução', desde que sejam para períodos diferentes;
-   O participante conseguirá visualizar o Plano de Entregas da sua Unidade de Execução de forma automática, mas poderá navegar pela estrutura organizacional para visualizar planos de entregas de outras unidades que utilizam o mesmo sistema.

<details>
<summary>REGRAS DE NEGÓCIO A SEREM DISCUTIDAS (clique aqui para ver detalhes)</summary>
-   O chefe da unidade de execução **deverá também cadastrar, quando da elaboração do Plano de Entregas,** os tipos de "ocorrência" (ocorrências tradicionais, férias, cursos, etc) que não possuem meta, prazo ou cliente. Essas ocorrências poderão ser selecionadas pelos participantes quando da elaboração do plano de trabalho, com respectiva alocação, ao selecionar a opção: Não vinculada a entrega.
</details>

## Exemplos de grids
-   exemplo 1
Plano de Entregas
   Unidade (Setor)
   Planejamento_estrategico_id
   Cadeia_valor_id
   Entregas
            Inicio     Fim        Indicador (vem do cadastro entrega) Metal geral Realizado Objetivos* Processos*    Atividades*          Cliente      Hmg
      Ent1: 01/01/2022 -          Quantidade                          1000        200       Ob1, Ob1   Proc1, Proc2  Tip.Ativ1, Tip.Atv2  uOrg1, uOrg2 S
      Ent2: 01/01/2022 30/12/2022 %                                   100         70        Ob2                                                        S
      Ent3: 01/01/2022 30/12/2024 Qualitativo                         Excelente   Bom                                                                  S      Ent4: 09/12/2022 30/12/2022 ...                                                                                                                  N
   Ponto de controle
      [01/01/2023][30/01/2023]:
          Responsável: Genisson
          Entregas:
                    Indicador (vem do cadastro entrega) Meta do Mês  Realizado  
          Ent1:     Quantidade                          100          90
          Ent3:     Qualitativo                         Satisfatório Ruim
      [01/02/2023][30/02/2023]:
          Responsável: Paiva
          Entregas:
                    Indicador (vem do cadastro entrega) Meta         Realizado
          Ent1:     Quantidade                          110          110
          Ent2:     %                                   70           70
          Ent3:     Qualitativo                         Excelente    Bom
* Deverá haver pelo menos 1

- exemplo 2
Nome                         Data Inicio Data Fim
XXXXXXXXXXXXXXXXXXXXXXXXXXXX xx/xx/xxxx  xx/xx/xxxx
Planejamento institucional      Cadeia de valor
[XXXXXXXXXXXXXXXXXXXXXX (v)]    [XXXXXXXXXXXXXXXXXXXXXX (v)]
Entregas ------------------------------------------------------------------------------------------
        Data Inicio                                      Objetivos/
Entrega Data Fim    Indicador   Meta geral  Realizado    Processos/Atividades   Cliente  Hmg  
-------+-----------+-----------+-----------+------------+----------------------+--------+----+-----
XXXXXX  XX/XX/XXXX   XXXXXXXXX   9999999     9999999      (XXXXX)(XXXX)(XXXXX)  XXXXXXX  (OK) 
XXXXXX  XX/XX/XXXX                                        (XXX)(XXXXX)                        [...]
                                                                                        | Alterar  |
                                                                                        | Excluir  |
                                                                                        | Homologar|





