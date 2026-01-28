# Documentação da Lógica de Atualização de Gestores (IntegracaoGestorService)

## Objetivo
Simplificar e tornar robusta a lógica de atualização de gestores, garantindo a correta atribuição de chefias baseada nas informações de integração (SIAPE).

## Fluxo do Processo

O método `montarArrayChefias` deve retornar um array de arrays contendo `['id_unidade' => ..., 'id_chefe' => ...]`.

### 1. Obtenção das Unidades e Chefes
Iterar sobre a tabela `integracao_unidades`. Para cada registro:

1.  **Verificar CPF do Chefe**:
    -   Campo: `cpf_titular_autoridade_uorg`.
    -   Se nulo ou vazio:
        -   Significa que a unidade não tem chefe definido.
        -   Adicionar ao array de retorno: `['id_unidade' => {id_unidade}, 'id_chefe' => null]`.
    -   Se preenchido:
        -   Prosseguir para a busca do usuário.

### 2. Busca do Usuário (Chefe)
Como um CPF pode ter mais de um usuário (vínculos diferentes), a busca deve ser precisa:

1.  **Consultar `integracao_servidores`**:
    -   Filtrar pelo CPF (`cpf`).
    -   Filtrar onde `codigo_servo_exercicio` (código da unidade de exercício no SIAPE) seja igual ao `codigo_siape` da unidade sendo processada (`integracao_unidades.codigo_siape`).
    -   Isso garante que estamos pegando o servidor que está *lotado* naquela unidade específica.

2.  **Consultar `usuarios`**:
    -   Com os dados encontrados em `integracao_servidores` (especificamente a matrícula ou o CPF validado), buscar o usuário correspondente na tabela `usuarios`.
    -   Se não encontrar usuário:
        -   Logar aviso no `SiapeLog` informando CPF e unidade, explicando que o usuário não foi encontrado no sistema.
        -   Pular para a próxima unidade.

### 3. Validação e Correção da Lotação
O chefe *deve* estar lotado na unidade onde exerce a chefia.

1.  **Verificar Lotação Atual**:
    -   Utilizar o relacionamento `lotacao()` do modelo `Usuario` ou consulta SQL direta para obter a unidade onde o usuário está atualmente lotado.
    -   Consulta SQL de referência:
        ```sql
        SELECT un.codigo FROM usuarios AS u
        INNER JOIN unidades_integrantes AS ui ON u.id = ui.usuario_id
        INNER JOIN unidades_integrantes_atribuicoes AS uia ON ui.id = uia.unidade_integrante_id
        INNER JOIN unidades AS un ON ui.unidade_id = un.id
        WHERE uia.atribuicao = 'LOTADO' AND uia.deleted_at IS NULL AND ui.deleted_at IS NULL
        AND u.id = '{id do usuario}'
        ```

2.  **Corrigir Lotação (se necessário)**:
    -   Se a unidade de lotação atual for diferente da unidade de chefia (`id_unidade`):
        -   Invocar `UnidadeIntegranteService->salvarIntegrantes` para criar o vínculo de lotação.
        -   Formato do vínculo:
            ```php
            [
                'usuario_id' => $idUsuario,
                'unidade_id' => $unidadeExercicioId,
                'atribuicoes' => ['LOTADO'] // Ou manter atribuições existentes e adicionar LOTADO
            ]
            ```

### 4. Verificação de Chefia Existente
Evitar reprocessamento desnecessário se o usuário já for o chefe da unidade.

1.  **Verificar Chefia Atual**:
    -   Utilizar o relacionamento `gerenciaTitular()` do modelo `Usuario` ou consulta SQL.
    -   Consulta SQL de referência:
        ```sql
        SELECT un.codigo FROM usuarios AS u
        INNER JOIN unidades_integrantes AS ui ON u.id = ui.usuario_id
        INNER JOIN unidades_integrantes_atribuicoes AS uia ON ui.id = uia.unidade_integrante_id
        INNER JOIN unidades AS un ON ui.unidade_id = un.id
        WHERE uia.atribuicao = 'GESTOR' AND uia.deleted_at IS NULL AND ui.deleted_at IS NULL
        AND u.id = '{id do usuario}'
        ```
    -   Se o usuário já possui a atribuição 'GESTOR' *nesta mesma unidade*, não é necessário incluí-lo no array de retorno (pois já está correto).

### 5. Consolidação
-   O array final deve conter:
    -   Casos onde a chefia deve ser removida (`id_chefe` => null).
    -   Casos onde a chefia deve ser atribuída/atualizada (usuário encontrado e validado, e que ainda não é chefe na unidade).

## Regras e Padrões
-   Seguir estritamente `.traerules`.
-   Usar `SiapeLog` para todos os logs de processo.
-   Manter compatibilidade com código existente onde possível.
