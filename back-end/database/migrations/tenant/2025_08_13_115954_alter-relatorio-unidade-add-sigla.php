<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_relatorio_unidades`");

        DB::statement(<<<EOD
        CREATE OR REPLACE VIEW `view_relatorio_unidades` AS
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
        )
        SELECT DISTINCT
            `uni`.`id` COLLATE utf8mb4_unicode_ci AS `id`,
            `uni`.`id` COLLATE utf8mb4_unicode_ci AS `unidade_id`,
            fn_obter_unidade_hierarquia(`uni`.`id`) COLLATE utf8mb4_unicode_ci AS `unidadeHierarquia`,
            `uni`.`nome` COLLATE utf8mb4_unicode_ci AS `nome`,
            `uni`.`sigla` COLLATE utf8mb4_unicode_ci AS `sigla`,
            `uni`.`codigo` COLLATE utf8mb4_unicode_ci AS `codigo`,
            CASE
                WHEN `uni`.`instituidora` = 1 THEN 'Instituidora' COLLATE utf8mb4_unicode_ci
                ELSE 'Executora' COLLATE utf8mb4_unicode_ci
            END AS `tipo`,
            `chefia`.`id`  COLLATE utf8mb4_unicode_ci AS `chefiaId`,
            `chefia`.`nome` COLLATE utf8mb4_unicode_ci AS `chefiaNome`,
            `contadores`.`totalVinculados` AS `totalVinculados`,
            `contadores`.`totalSubstitutos` AS `totalSubstitutos`,
            `contadores`.`totalDelegados` AS `totalDelegados`
        FROM `unidades` `uni`
        LEFT JOIN chefias ON `chefias`.`unidade_id` = `uni`.`id`
        LEFT JOIN `usuarios` `chefia` ON `chefia`.`id` = `chefias`.`usuario_id`
        LEFT JOIN contadores ON `contadores`.`unidade_id` = `uni`.`id`
        WHERE `uni`.`deleted_at` IS NULL
        ORDER BY 2;
        EOD);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_relatorio_unidades`");

        DB::statement(<<<EOD
        CREATE OR REPLACE
        ALGORITHM = UNDEFINED VIEW `view_relatorio_unidades` AS with chefias as (
        select
            `ui`.`unidade_id` AS `unidade_id`,
            `ui`.`usuario_id` AS `usuario_id`
        from
            (`unidades_integrantes` `ui`
        join `unidades_integrantes_atribuicoes` `uia` on
            (`uia`.`unidade_integrante_id` = `ui`.`id`
                and `uia`.`deleted_at` is null
                and `uia`.`atribuicao` = 'GESTOR'))
        where
            `ui`.`deleted_at` is null),
        contadores as (
        select
            `ui`.`unidade_id` AS `unidade_id`,
            count(distinct `ui`.`usuario_id`) AS `totalAgentes`,
            sum(case when `uia`.`atribuicao` = 'GESTOR_SUBSTITUTO' then 1 else 0 end) AS `totalSubstitutos`,
            sum(case when `uia`.`atribuicao` = 'GESTOR_DELEGADO' then 1 else 0 end) AS `totalDelegados`,
            sum(case when `uia`.`atribuicao` = 'COLABORADOR' then 1 else 0 end) AS `totalVinculados`
        from
            (`unidades_integrantes` `ui`
        left join `unidades_integrantes_atribuicoes` `uia` on
            (`uia`.`unidade_integrante_id` = `ui`.`id`
                and `uia`.`deleted_at` is null))
        where
            `ui`.`deleted_at` is null
            and `uia`.`atribuicao` is not null
        group by
            `ui`.`unidade_id`
        )select
            distinct `uni`.`id` AS `id`,
            `uni`.`id` AS `unidade_id`,
            `fn_obter_unidade_hierarquia`(`uni`.`id`) AS `unidadeHierarquia`,
            `uni`.`nome` AS `nome`,
            `uni`.`codigo` AS `codigo`,
            case
                when `uni`.`instituidora` = 1 then 'Instituidora'
                else 'Executora'
            end collate utf8mb4_unicode_ci AS `tipo`,
            `chefia`.`id` AS `chefiaId`,
            `chefia`.`nome` AS `chefiaNome`,
            `contadores`.`totalVinculados` AS `totalVinculados`,
            `contadores`.`totalSubstitutos` AS `totalSubstitutos`,
            `contadores`.`totalDelegados` AS `totalDelegados`
        from
            (((`unidades` `uni`
        left join `chefias` on
            (`chefias`.`unidade_id` = `uni`.`id`))
        left join `usuarios` `chefia` on
            (`chefia`.`id` = `chefias`.`usuario_id`))
        left join `contadores` on
            (`contadores`.`unidade_id` = `uni`.`id`))
        where
            `uni`.`deleted_at` is null
        order by
            2;
        EOD);

    }
};
