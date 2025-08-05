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
            `uni`.`sigla` AS `sigla`,
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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS view_relatorio_unidades');
    }
};
