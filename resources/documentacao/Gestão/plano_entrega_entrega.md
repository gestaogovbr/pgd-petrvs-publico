# Entregas do Plano de Entregas

- Tabela: planos_entregas_entregas

~~~text
    inicio (*)
    fim
    descricao (*)
    homologado (*)
    meta (*)
    realizado
    progresso_esperado
    progresso_realizado
    destinatario
    (id/created_at/updated_at/deleted_at)
        plano_entrega_id (*)
        entrega_id (*)
        entrega_pai_id
        unidade_id (*)

    (*) campo obrigatório
~~~

## Regras de Negócio aplicadas às entregas de um Plano de Entregas

1. ENTREGAS DO PLANO DE ENTREGA
    1. (RN_ENT_PENT_1_1) As entregas que compõem um Plano de Entregas pertencem todas à Unidade Executora do Plano;
    2. (RN_ENT_PENT_1_2) As entregas incluídas/alteradas na criação/edição de um Plano de Entregas precisam ser homologadas pelo gestor da unidade hierarquicamente superior;
    3. (RN_ENT_PENT_1_3) As entregas incluídas/alteradas na criação/edição de um Plano de Entregas precisam estar dentro do prazo de execução de um plano de entregas;

Quando um Plano de Entregas for CANCELADO, suas entregas automaticamente também o serão;
A entregas de planos de entregas canceladas não poderão mais ser adicionados novas atividades;
Na alteração de uma entrega do plano de entregas, deve-se limitar o período a ser editado, impedindo que a alteração afete qualquer entrega de plano de trabalho a ela vinculada; e não permitir editar a entrega do catálogo à qual ela se vinculou;
Na exclusão de uma entrega do plano de entregas, apenas marcá-la como cancelada caso ela já tenha sido utilizada, criando um novo TCR para os planos de trabalho afetados, e excluí-la de fato caso ainda não tenha sido utilizada em nenhum plano de trabalho;
A inclusão de novas entregas em um plano de entregas não afeta as entregas dos planos de trabalho relacionados;

## REGRAS DE INTERFACE

1. (RI_ENT_PENT_1) O botão Aderir, na toolbar, deverá ser exibido sempre, mas para ficar habilitado:
    - as abas de objetivos e processos na tela de inserção das entregas apenas serão exibidas se o usuário selecionar o planejamento e/ou a cadeia de valor na tela anterior ;

## REGRAS A SEREM DISCUTIDAS

- O gestor da unidade de execução **deverá também cadastrar, quando da elaboração do Plano de Entregas,** os tipos de "ocorrência" (ocorrências tradicionais, férias, cursos, etc) que não possuem meta, prazo ou cliente. Essas ocorrências poderão ser selecionadas pelos participantes quando da elaboração do plano de trabalho, com respectiva alocação, ao selecionar a opção: Não vinculada a entrega.
