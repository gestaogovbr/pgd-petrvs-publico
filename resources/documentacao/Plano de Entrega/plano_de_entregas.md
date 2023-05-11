~~~  
  * Ao aderir fica com o status "APROVANDO"

  * Estando no status "APROVANDO"
        dynamicButtons: 
            - se o usuário logado for gestor da unidade imediatamente superior à do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a 
              capacidade "MOD_PENT_APROV_SUBORD", apresentar o botão Aprovar (vai para ATIVO);
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_EDT", Editar Plano de Entrega (alguns campos!);
            - se o usuário logado for um usuário comum, exibir o botão Consultar;

  * Estando no status "ATIVO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_CONCLUIR", exibir o botão Concluir (vai para o status CONCLUIDO);
            - caso contrário, exibir o botão Consultar;
        dynamicOptions:
            - se o usuário logado for gestor da unidade imediatamente superior à do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a 
              capacidade "MOD_PENT_CANC_APROV_SUBORD", apresentar o botão Cancelar Aprovação (volta para o status APROVANDO);
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_SUSP", exibir o botão Suspender (vai para o status SUSPENSO);

  * Estando no status "CONCLUIDO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade imediatamente superior à do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a capacidade
              "MOD_PENT_AVAL_SUBORD", exibir o botão Avaliar (vai para o status AVALIADO);
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_CANC_CONCL", exibir o botão Cancelar Conclusão 
              (vai para o status ATIVO);

  * Estando no status "SUSPENSO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_REATIVAR", exibir o 
              botão Reativar (vai para o status ATIVO);

  * Estando no status "AVALIADO"
        dynamicButtons:
            - se o usuário logado for gestor da unidade imediatamente superior à do plano, ou for lotado em alguma unidade da sua linha hierárquica ascendente e ele possuir a capacidade
              "MOD_PENT_CANC_AVAL_SUBORD", exibir o botão Cancelar Avaliação (vai para o status CONCLUIDO);
            - caso contrário, exibir o botão Consultar;
        dynamicOptions:
            - se o plano não estiver arquivado: 
                - se o usuário logado for gestor da unidade, ou se ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_ARQ", exibir o botão Arquivar;
~~~~ 

## Entregas do Plano de Entregas

- Tabela: planos_entregas_entregas

~~~
    inicio (*)
    fim
    descricao (*)
    cliente (*)
    homologado (*)
    meta (*)
    realizado
    (id/created_at/updated_at/data_inicio/data_fim)
        plano_entrega_id (*)
        entrega_id (*)
        entrega_pai_id

    (*) campo obrigatório
~~~

## Regras de Negócio aplicadas às entregas de um Plano de Entregas

- As entregas que compõem um Plano de Entregas pertencem todas à Unidade Executora do Plano;  
- As entregas incluídas/alteradas na criação/edição de um Plano de Entregas precisam ser homologadas pelo gestor da unidade hierarquicamente superior;

<details>
<summary>REGRAS DE NEGÓCIO A SEREM DISCUTIDAS (clique aqui para ver detalhes)</summary>
-   O gestor da unidade de execução **deverá também cadastrar, quando da elaboração do Plano de Entregas,** os tipos de "ocorrência" (ocorrências tradicionais, férias, cursos, etc) que não possuem meta, prazo ou cliente. Essas ocorrências poderão ser selecionadas pelos participantes quando da elaboração do plano de trabalho, com respectiva alocação, ao selecionar a opção: Não vinculada a entrega.
</details>

## Exemplos de grids

- exemplo 1

~~~
Plano de Entregas
   Unidade (Setor)
   Planejamento_estrategico_id
   Cadeia_valor_id
   Entregas
            Inicio     Fim        Indicador (vem do cadastro entrega) Metal geral Realizado Objetivos* Processos*    Atividades*          Cliente      Hmg
      Ent1: 01/01/2022 -          Quantidade                          1000        200       Ob1, Ob1   Proc1, Proc2  Tip.Ativ1, Tip.Atv2  uOrg1, uOrg2 S
      Ent2: 01/01/2022 30/12/2022 %                                   100         70        Ob2                                                        S
      Ent3: 01/01/2022 30/12/2024 Qualitativo                         Excelente   Bom                                                                  S      Ent4: 09/12/2022 30/12/2022 ...                                                                                                                  N
* Deverá haver pelo menos 1
~~~  

- exemplo 2

~~~
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
~~~  
