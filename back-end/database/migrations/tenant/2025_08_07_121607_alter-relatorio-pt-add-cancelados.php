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
        DB::statement("DROP VIEW IF EXISTS `view_relatorio_plano_trabalho_detalhado`");

        DB::statement(<<<EOD
        CREATE ALGORITHM = UNDEFINED VIEW `view_relatorio_plano_trabalho_detalhado` AS
        select
            `ptc`.`id` AS `id`,
            `pt`.`id` AS `plano_trabalho_id`,
            `pt`.`numero` AS `numero`,
            `pt`.`status` AS `status`,
            cast(`pt`.`data_inicio` as date) AS `dataInicio`,
            cast(`pt`.`data_fim` as date) AS `dataFim`,
            `pt`.`unidade_id` AS `unidade_id`,
            `usu`.`nome` AS `participanteNome`,
            `fn_obter_unidade_hierarquia`(`pt`.`unidade_id`) AS `unidadeHierarquia`,
            `uni`.`sigla` AS `unidadeSigla`,
            `pt`.`tipo_modalidade_id` AS `tipo_modalidade_id`,
            `tm`.`nome` AS `tipoModalidadeNome`,
            to_days(`pt`.`data_fim`) - to_days(`pt`.`data_inicio`) + 1 AS `duracao`,
            ifnull((select sum(ifnull(`pte`.`forca_trabalho`, 0) * 1) from `planos_trabalhos_entregas` `pte` where `pte`.`plano_trabalho_id` = `pt`.`id` and `pte`.`deleted_at` is null), 0) AS `chd`,
            cast(`ptc`.`data_inicio` as date) AS `data_inicio_avaliativo`,
            cast(`ptc`.`data_fim` as date) AS `data_fim_avaliativo`,
            cast(`ptc`.`data_conclusao` as date) AS `data_conclusao`,
            cast(`aval_antiga`.`data_avaliacao` as date) AS `data_avaliacao`,
            json_unquote(`aval_antiga`.`nota`) AS `nota`,
            `aval_antiga`.`data_recurso` AS `data_recurso`,
            case
                when `a`.`id` = `aval_antiga`.`id` then NULL
                else cast(`a`.`data_avaliacao` as date)
            end AS `data_reavaliacao`,
            case
                when `a`.`id` = `aval_antiga`.`id` then NULL
                else json_unquote(`a`.`nota`)
            end AS `nota_reavaliacao`,
            case when pt.status = 'CANCELADO'
                then NULL
                else
                    case when `ptc`.`data_conclusao` is null
                    then case when curdate() <= cast(`ptc`.`data_fim` as date) + interval 10 day
                        then 'Aguardando'
                        else 'Atrasado'
                        end
                    else case
                            when cast(`ptc`.`data_conclusao` as date) <= cast(`ptc`.`data_fim` as date) + interval 10 day
                            then 'Registrado no período'
                            else 'Registrado com atraso'
                        end
                    end
                end
            collate utf8mb4_unicode_ci AS `situacao_execucao`,
            case when pt.status = 'CANCELADO'
                then NULL
                else
                    case when `a`.`data_avaliacao` is null
                        then
                            case when `a`.`data_avaliacao` <= cast(`ptc`.`data_conclusao` as date) + interval 20 day
                                then 'Aguardando'
                                else 'Atrasado'
                            end
                        else
                            case when `a`.`data_avaliacao` <= cast(`ptc`.`data_conclusao` as date) + interval 20 day
                                then 'Registrado no período'
                                else 'Registrado com atraso'
                            end
                        end
                end
            collate utf8mb4_unicode_ci AS `situacao_avaliacao`
        from
            ((((((`planos_trabalhos` `pt`
        join `usuarios` `usu` on
            (`usu`.`id` = `pt`.`usuario_id`))
        join `unidades` `uni` on
            (`uni`.`id` = `pt`.`unidade_id`))
        join `tipos_modalidades` `tm` on
            (`tm`.`id` = `pt`.`tipo_modalidade_id`))
        left join `planos_trabalhos_consolidacoes` `ptc` on
            (`ptc`.`plano_trabalho_id` = `pt`.`id`
                and `ptc`.`deleted_at` is null))
        left join `avaliacoes` `a` on
            (`a`.`id` = `ptc`.`avaliacao_id`
                and `a`.`deleted_at` is null))
        left join (
            select
                `a1`.`id` AS `id`,
                `a1`.`data_avaliacao` AS `data_avaliacao`,
                `a1`.`nota` AS `nota`,
                `a1`.`plano_trabalho_consolidacao_id` AS `plano_trabalho_consolidacao_id`,
                `a1`.`data_recurso` AS `data_recurso`,
                `a1`.`rn` AS `rn`
            from
                (
                select
                    `avaliacoes`.`id` AS `id`,
                    `avaliacoes`.`data_avaliacao` AS `data_avaliacao`,
                    `avaliacoes`.`nota` AS `nota`,
                    `avaliacoes`.`data_recurso` AS `data_recurso`,
                    `avaliacoes`.`plano_trabalho_consolidacao_id` AS `plano_trabalho_consolidacao_id`,
                    row_number() over ( partition by `avaliacoes`.`plano_trabalho_consolidacao_id`
                order by
                    `avaliacoes`.`data_avaliacao`) AS `rn`
                from
                    `avaliacoes`
                where
                    `avaliacoes`.`deleted_at` is null
                group by `avaliacoes`.`id`,
                    `avaliacoes`.`data_avaliacao`,
                    `avaliacoes`.`nota`,
                    `avaliacoes`.`data_recurso`,
                    `avaliacoes`.`plano_trabalho_consolidacao_id`
            ) `a1`
            where
                `a1`.`rn` = 1) `aval_antiga` on
            (`aval_antiga`.`plano_trabalho_consolidacao_id` = `ptc`.`id`))
        where
            `pt`.`deleted_at` is null;
        EOD);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_relatorio_plano_trabalho_detalhado`");

        DB::statement(<<<EOD
        CREATE
        ALGORITHM = UNDEFINED VIEW `view_relatorio_plano_trabalho_detalhado` AS
        select
            `ptc`.`id` AS `id`,
            `pt`.`id` AS `plano_trabalho_id`,
            `pt`.`numero` AS `numero`,
            `pt`.`status` AS `status`,
            cast(`pt`.`data_inicio` as date) AS `dataInicio`,
            cast(`pt`.`data_fim` as date) AS `dataFim`,
            `pt`.`unidade_id` AS `unidade_id`,
            `usu`.`nome` AS `participanteNome`,
            `fn_obter_unidade_hierarquia`(`pt`.`unidade_id`) AS `unidadeHierarquia`,
            `uni`.`sigla` AS `unidadeSigla`,
            `pt`.`tipo_modalidade_id` AS `tipo_modalidade_id`,
            `tm`.`nome` AS `tipoModalidadeNome`,
            to_days(`pt`.`data_fim`) - to_days(`pt`.`data_inicio`) + 1 AS `duracao`,
            ifnull((select sum(ifnull(`pte`.`forca_trabalho`, 0) * 1) from `planos_trabalhos_entregas` `pte` where `pte`.`plano_trabalho_id` = `pt`.`id` and `pte`.`deleted_at` is null), 0) AS `chd`,
            cast(`ptc`.`data_inicio` as date) AS `data_inicio_avaliativo`,
            cast(`ptc`.`data_fim` as date) AS `data_fim_avaliativo`,
            cast(`ptc`.`data_conclusao` as date) AS `data_conclusao`,
            cast(`aval_antiga`.`data_avaliacao` as date) AS `data_avaliacao`,
            json_unquote(`aval_antiga`.`nota`) AS `nota`,
            `aval_antiga`.`data_recurso` AS `data_recurso`,
            case
                when `a`.`id` = `aval_antiga`.`id` then NULL
                else cast(`a`.`data_avaliacao` as date)
            end AS `data_reavaliacao`,
            case
                when `a`.`id` = `aval_antiga`.`id` then NULL
                else json_unquote(`a`.`nota`)
            end AS `nota_reavaliacao`,
            case
                when pt.status = 'CANCELADO' then NULL
                else
                    case
                        when `ptc`.`data_conclusao` is null then case
                            when curdate()  <= cast(`ptc`.`data_fim` as date) + interval 10 day then 'Aguardando'
                            else 'Atrasado'
                        end
                        else case
                            when cast(`ptc`.`data_conclusao` as date) <= cast(`ptc`.`data_fim` as date) + interval 10 day then 'Registrado no período'
                            else 'Registrado com atraso'
                        end
                    end
                end AS `situacao_execucao`,
            CASE
                WHEN pt.status = 'CANCELADO' THEN NULL
                ELSE case
                    when `a`.`data_avaliacao` is null
                        then case
                            when `a`.`data_avaliacao` <= cast(`ptc`.`data_conclusao` as date) + interval 20 day
                                then 'Aguardando'
                                else 'Atrasado'
                            end
                        else case
                                when `a`.`data_avaliacao` <= cast(`ptc`.`data_conclusao` as date) + interval 20 day
                                then 'Registrado no período'
                                else 'Registrado com atraso'
                            end
                    END
                END AS `situacao_avaliacao`
        from
            ((((((`planos_trabalhos` `pt`
        join `usuarios` `usu` on
            (`usu`.`id` = `pt`.`usuario_id`))
        join `unidades` `uni` on
            (`uni`.`id` = `pt`.`unidade_id`))
        join `tipos_modalidades` `tm` on
            (`tm`.`id` = `pt`.`tipo_modalidade_id`))
        left join `planos_trabalhos_consolidacoes` `ptc` on
            (`ptc`.`plano_trabalho_id` = `pt`.`id`
                and `ptc`.`deleted_at` is null))
        left join `avaliacoes` `a` on
            (`a`.`id` = `ptc`.`avaliacao_id`
                and `a`.`deleted_at` is null))
        left join (
            select
                `a1`.`id` AS `id`,
                `a1`.`created_at` AS `created_at`,
                `a1`.`updated_at` AS `updated_at`,
                `a1`.`deleted_at` AS `deleted_at`,
                `a1`.`data_avaliacao` AS `data_avaliacao`,
                `a1`.`nota` AS `nota`,
                `a1`.`justificativa` AS `justificativa`,
                `a1`.`justificativas` AS `justificativas`,
                `a1`.`recurso` AS `recurso`,
                `a1`.`avaliador_id` AS `avaliador_id`,
                `a1`.`plano_trabalho_consolidacao_id` AS `plano_trabalho_consolidacao_id`,
                `a1`.`plano_entrega_id` AS `plano_entrega_id`,
                `a1`.`tipo_avaliacao_id` AS `tipo_avaliacao_id`,
                `a1`.`tipo_avaliacao_nota_id` AS `tipo_avaliacao_nota_id`,
                `a1`.`data_recurso` AS `data_recurso`,
                `a1`.`rn` AS `rn`
            from
                (
                select
                    `avaliacoes`.`id` AS `id`,
                    `avaliacoes`.`created_at` AS `created_at`,
                    `avaliacoes`.`updated_at` AS `updated_at`,
                    `avaliacoes`.`deleted_at` AS `deleted_at`,
                    `avaliacoes`.`data_avaliacao` AS `data_avaliacao`,
                    `avaliacoes`.`nota` AS `nota`,
                    `avaliacoes`.`justificativa` AS `justificativa`,
                    `avaliacoes`.`justificativas` AS `justificativas`,
                    `avaliacoes`.`recurso` AS `recurso`,
                    `avaliacoes`.`data_recurso` AS `data_recurso`,
                    `avaliacoes`.`avaliador_id` AS `avaliador_id`,
                    `avaliacoes`.`plano_trabalho_consolidacao_id` AS `plano_trabalho_consolidacao_id`,
                    `avaliacoes`.`plano_entrega_id` AS `plano_entrega_id`,
                    `avaliacoes`.`tipo_avaliacao_id` AS `tipo_avaliacao_id`,
                    `avaliacoes`.`tipo_avaliacao_nota_id` AS `tipo_avaliacao_nota_id`,
                    row_number() over ( partition by `avaliacoes`.`plano_trabalho_consolidacao_id`
                order by
                    `avaliacoes`.`data_avaliacao`) AS `rn`
                from
                    `avaliacoes`
                where
                    `avaliacoes`.`deleted_at` is null) `a1`
            where
                `a1`.`rn` = 1) `aval_antiga` on
            (`aval_antiga`.`plano_trabalho_consolidacao_id` = `ptc`.`id`))
        where
            `pt`.`deleted_at` is null;
        EOD);
    }
};
