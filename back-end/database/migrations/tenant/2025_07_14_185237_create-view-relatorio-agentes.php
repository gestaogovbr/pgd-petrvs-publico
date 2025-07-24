<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         DB::statement(<<<EOD
        CREATE OR REPLACE
        ALGORITHM = UNDEFINED VIEW `view_relatorio_agentes` AS
        SELECT distinct `u`.`id` AS `id`,
            `u`.`nome` AS `nome`,
            `u`.`matricula` AS `matricula`,
            '' AS `jornada`,
            u.perfil_id,
            `p`.`nome` AS `perfil`,
            `u`.`situacao_funcional` AS `situacao_funcional`,
            `programa_ultimo`.`programanome` AS `programaNome`,
            `uni`.`id` AS `unidade_id`,
            `uni`.`sigla` AS `unidadeNome`,
            `fn_obter_unidade_hierarquia`(`uni`.`id`) AS `unidadeHierarquia`,
            `pt_ultimo_pactuado`.`tipo_modalidade_id` AS `tipo_modalidade_id`,
            `tm`.`nome` AS `tipoModalidadeNome`,
            u.data_inicial_pedagio,
            u.data_final_pedagio,
            u.tipo_pedagio
        from
            (((((((`usuarios` `u`
        left join (
            select
                `pp1`.`usuario_id` AS `usuario_id`,
                `pp1`.`programanome` AS `programanome`,
                `pp1`.`rn` AS `rn`
            from
                (
                select
                    `pp`.`usuario_id` AS `usuario_id`,
                    `p`.`nome` AS `programanome`,
                    row_number() over ( partition by `pp`.`usuario_id`
                order by
                    `pp`.`created_at` desc) AS `rn`
                from
                    (`programas_participantes` `pp`
                join `programas` `p` on
                    (`p`.`id` = `pp`.`programa_id`
                        and `p`.`deleted_at` is null))
                where
                    `pp`.`deleted_at` is null) `pp1`
            where
                `pp1`.`rn` = 1) `programa_ultimo` on
            (`programa_ultimo`.`usuario_id` = `u`.`id`))
        left join (
            select
                `pt`.`usuario_id` AS `usuario_id`,
                `pt`.`id` AS `id`,
                `pt`.`tipo_modalidade_id` AS `tipo_modalidade_id`
            from
                `planos_trabalhos` `pt`
            where
                `pt`.`deleted_at` is null
                and `pt`.`status` in ('ATIVO', 'CONCLUIDO', 'AVALIADO', 'SUSPENSO')
                    and (`pt`.`data_inicio`,
                    `pt`.`id`) = (
                    select
                        `pt2`.`data_inicio`,
                        max(`pt2`.`id`)
                    from
                        `planos_trabalhos` `pt2`
                    where
                        `pt2`.`usuario_id` = `pt`.`usuario_id`
                        and `pt2`.`deleted_at` is null
                        and `pt2`.`status` in ('ATIVO', 'CONCLUIDO', 'AVALIADO', 'SUSPENSO')
                    group by
                        `pt2`.`data_inicio`
                    order by
                        `pt2`.`data_inicio` desc
                    limit 1)) `pt_ultimo_pactuado` on
            (`pt_ultimo_pactuado`.`usuario_id` = `u`.`id`))
        left join `unidades_integrantes` `ui` on
            (`ui`.`usuario_id` = `u`.`id`
                and `ui`.`deleted_at` is null))
        left join `unidades_integrantes_atribuicoes` `uia` on
            (`uia`.`unidade_integrante_id` = `ui`.`id`
                and `uia`.`deleted_at` is null
                and `uia`.`atribuicao` = 'LOTADO'))
        left join `unidades` `uni` on
            (`uni`.`id` = `ui`.`unidade_id`
                and `uni`.`deleted_at` is null
                and `uia`.`atribuicao` = 'LOTADO'))
        left join `perfis` `p` on
            (`p`.`id` = `u`.`perfil_id`))
        left join `tipos_modalidades` `tm` on
            (`tm`.`id` = `pt_ultimo_pactuado`.`tipo_modalidade_id`))
        where
            `u`.`deleted_at` is null
        order by
            `u`.`nome`
        EOD);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS view_relatorio_agentes');
    }
};
