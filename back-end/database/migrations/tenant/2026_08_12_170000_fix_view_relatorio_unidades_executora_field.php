<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement(<<<EOD
        ALTER VIEW `view_relatorio_unidades` AS
        WITH chefias AS (
            SELECT
                `ui`.`unidade_id` AS `unidade_id`,
                `ui`.`usuario_id` AS `usuario_id`
            FROM `unidades_integrantes` `ui`
            JOIN `unidades_integrantes_atribuicoes` `uia`
                ON `uia`.`unidade_integrante_id` = `ui`.`id`
                AND `uia`.`deleted_at` IS NULL
                AND `uia`.`atribuicao` COLLATE utf8mb4_unicode_ci = 'GESTOR'
            WHERE `ui`.`deleted_at` IS NULL
        ),
        contadores AS (
            SELECT
                `ui`.`unidade_id` AS `unidade_id`,
                COUNT(DISTINCT `ui`.`usuario_id`) AS `totalAgentes`,
                SUM(CASE WHEN `uia`.`atribuicao` COLLATE utf8mb4_unicode_ci = 'GESTOR_SUBSTITUTO' THEN 1 ELSE 0 END) AS `totalSubstitutos`,
                SUM(CASE WHEN `uia`.`atribuicao` COLLATE utf8mb4_unicode_ci = 'GESTOR_DELEGADO' THEN 1 ELSE 0 END) AS `totalDelegados`,
                SUM(CASE WHEN `uia`.`atribuicao` COLLATE utf8mb4_unicode_ci = 'COLABORADOR' THEN 1 ELSE 0 END) AS `totalVinculados`
            FROM `unidades_integrantes` `ui`
            LEFT JOIN `unidades_integrantes_atribuicoes` `uia`
                ON `uia`.`unidade_integrante_id` = `ui`.`id`
                AND `uia`.`deleted_at` IS NULL
            WHERE `ui`.`deleted_at` IS NULL
            AND `uia`.`atribuicao` IS NOT NULL
            GROUP BY `ui`.`unidade_id`
        ),
        pe_vigentes AS (
            SELECT
                `pe`.`unidade_id` AS `unidade_id`,
                `pe`.`id` AS `peVigenteId`,
                `pe`.`nome` AS `peVigenteNome`,
                ROW_NUMBER() OVER (PARTITION BY `pe`.`unidade_id` ORDER BY `pe`.`data_inicio` DESC) AS `rn`
            FROM `planos_entregas` `pe`
            WHERE `pe`.`status` = 'ATIVO'
              AND `pe`.`data_inicio` <= NOW()
              AND (`pe`.`data_fim` IS NULL OR `pe`.`data_fim` >= NOW())
              AND `pe`.`deleted_at` IS NULL
        )
        SELECT DISTINCT
            `uni`.`id` COLLATE utf8mb4_unicode_ci AS `id`,
            `uni`.`id` COLLATE utf8mb4_unicode_ci AS `unidade_id`,
            fn_obter_unidade_hierarquia(`uni`.`id`) COLLATE utf8mb4_unicode_ci AS `unidadeHierarquia`,
            `uni`.`nome` COLLATE utf8mb4_unicode_ci AS `nome`,
            `uni`.`sigla` COLLATE utf8mb4_unicode_ci AS `sigla`,
            `uni`.`codigo` COLLATE utf8mb4_unicode_ci AS `codigo`,
            CASE WHEN `uni`.`instituidora` = 1 THEN 'Sim' ELSE 'Não' END COLLATE utf8mb4_unicode_ci AS `instituidora`,
            CASE WHEN `uni`.`executora` = 1 THEN 'Sim' ELSE 'Não' END COLLATE utf8mb4_unicode_ci AS `executora`,
            `pe_vigentes`.`peVigenteId` COLLATE utf8mb4_unicode_ci AS `peVigenteId`,
            `pe_vigentes`.`peVigenteNome` COLLATE utf8mb4_unicode_ci AS `peVigenteNome`,
            `chefia`.`id` COLLATE utf8mb4_unicode_ci AS `chefiaId`,
            `chefia`.`nome` COLLATE utf8mb4_unicode_ci AS `chefiaNome`,
            `contadores`.`totalVinculados` AS `totalVinculados`,
            `contadores`.`totalSubstitutos` AS `totalSubstitutos`,
            `contadores`.`totalDelegados` AS `totalDelegados`
        FROM `unidades` `uni`
        LEFT JOIN chefias ON `chefias`.`unidade_id` = `uni`.`id`
        LEFT JOIN `usuarios` `chefia` ON `chefia`.`id` = `chefias`.`usuario_id`
        LEFT JOIN contadores ON `contadores`.`unidade_id` = `uni`.`id`
        LEFT JOIN pe_vigentes ON `pe_vigentes`.`unidade_id` = `uni`.`id` AND `pe_vigentes`.`rn` = 1
        WHERE `uni`.`deleted_at` IS NULL
        ORDER BY 2;
        EOD);
    }

    public function down(): void
    {
        DB::statement(<<<EOD
        ALTER VIEW `view_relatorio_unidades` AS
        WITH chefias AS (
            SELECT
                `ui`.`unidade_id` AS `unidade_id`,
                `ui`.`usuario_id` AS `usuario_id`
            FROM `unidades_integrantes` `ui`
            JOIN `unidades_integrantes_atribuicoes` `uia`
                ON `uia`.`unidade_integrante_id` = `ui`.`id`
                AND `uia`.`deleted_at` IS NULL
                AND `uia`.`atribuicao` COLLATE utf8mb4_unicode_ci = 'GESTOR'
            WHERE `ui`.`deleted_at` IS NULL
        ),
        contadores AS (
            SELECT
                `ui`.`unidade_id` AS `unidade_id`,
                COUNT(DISTINCT `ui`.`usuario_id`) AS `totalAgentes`,
                SUM(CASE WHEN `uia`.`atribuicao` COLLATE utf8mb4_unicode_ci = 'GESTOR_SUBSTITUTO' THEN 1 ELSE 0 END) AS `totalSubstitutos`,
                SUM(CASE WHEN `uia`.`atribuicao` COLLATE utf8mb4_unicode_ci = 'GESTOR_DELEGADO' THEN 1 ELSE 0 END) AS `totalDelegados`,
                SUM(CASE WHEN `uia`.`atribuicao` COLLATE utf8mb4_unicode_ci = 'COLABORADOR' THEN 1 ELSE 0 END) AS `totalVinculados`
            FROM `unidades_integrantes` `ui`
            LEFT JOIN `unidades_integrantes_atribuicoes` `uia`
                ON `uia`.`unidade_integrante_id` = `ui`.`id`
                AND `uia`.`deleted_at` IS NULL
            WHERE `ui`.`deleted_at` IS NULL
            AND `uia`.`atribuicao` IS NOT NULL
            GROUP BY `ui`.`unidade_id`
        ),
        pe_vigentes AS (
            SELECT
                `pe`.`unidade_id` AS `unidade_id`,
                `pe`.`id` AS `peVigenteId`,
                `pe`.`nome` AS `peVigenteNome`,
                ROW_NUMBER() OVER (PARTITION BY `pe`.`unidade_id` ORDER BY `pe`.`data_inicio` DESC) AS `rn`
            FROM `planos_entregas` `pe`
            WHERE `pe`.`status` = 'ATIVO'
              AND `pe`.`data_inicio` <= NOW()
              AND (`pe`.`data_fim` IS NULL OR `pe`.`data_fim` >= NOW())
              AND `pe`.`deleted_at` IS NULL
        )
        SELECT DISTINCT
            `uni`.`id` COLLATE utf8mb4_unicode_ci AS `id`,
            `uni`.`id` COLLATE utf8mb4_unicode_ci AS `unidade_id`,
            fn_obter_unidade_hierarquia(`uni`.`id`) COLLATE utf8mb4_unicode_ci AS `unidadeHierarquia`,
            `uni`.`nome` COLLATE utf8mb4_unicode_ci AS `nome`,
            `uni`.`sigla` COLLATE utf8mb4_unicode_ci AS `sigla`,
            `uni`.`codigo` COLLATE utf8mb4_unicode_ci AS `codigo`,
            CASE WHEN `uni`.`instituidora` = 1 THEN 'Sim' ELSE 'Não' END COLLATE utf8mb4_unicode_ci AS `instituidora`,
            CASE WHEN `uni`.`instituidora` = 1 THEN 'Não' ELSE 'Sim' END COLLATE utf8mb4_unicode_ci AS `executora`,
            `pe_vigentes`.`peVigenteId` COLLATE utf8mb4_unicode_ci AS `peVigenteId`,
            `pe_vigentes`.`peVigenteNome` COLLATE utf8mb4_unicode_ci AS `peVigenteNome`,
            `chefia`.`id` COLLATE utf8mb4_unicode_ci AS `chefiaId`,
            `chefia`.`nome` COLLATE utf8mb4_unicode_ci AS `chefiaNome`,
            `contadores`.`totalVinculados` AS `totalVinculados`,
            `contadores`.`totalSubstitutos` AS `totalSubstitutos`,
            `contadores`.`totalDelegados` AS `totalDelegados`
        FROM `unidades` `uni`
        LEFT JOIN chefias ON `chefias`.`unidade_id` = `uni`.`id`
        LEFT JOIN `usuarios` `chefia` ON `chefia`.`id` = `chefias`.`usuario_id`
        LEFT JOIN contadores ON `contadores`.`unidade_id` = `uni`.`id`
        LEFT JOIN pe_vigentes ON `pe_vigentes`.`unidade_id` = `uni`.`id` AND `pe_vigentes`.`rn` = 1
        WHERE `uni`.`deleted_at` IS NULL
        ORDER BY 2;
        EOD);
    }
};
