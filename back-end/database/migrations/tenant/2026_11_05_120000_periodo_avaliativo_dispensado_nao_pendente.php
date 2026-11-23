<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('DROP FUNCTION IF EXISTS `fn_periodo_avaliativo_dispensado`');

        DB::unprepared(<<<'SQL'
            CREATE FUNCTION `fn_periodo_avaliativo_dispensado`(
                p_usuario_id CHAR(36),
                p_data_inicio DATETIME,
                p_data_fim DATETIME
            ) RETURNS TINYINT
            DETERMINISTIC
            READS SQL DATA
            BEGIN
                DECLARE v_inicio DATE;
                DECLARE v_fim DATE;
                DECLARE v_cobre_inicio TINYINT DEFAULT 0;
                DECLARE v_lacuna TINYINT DEFAULT 0;

                IF p_usuario_id IS NULL OR p_data_inicio IS NULL OR p_data_fim IS NULL THEN
                    RETURN 0;
                END IF;

                SET v_inicio = DATE(p_data_inicio);
                SET v_fim = DATE(p_data_fim);

                SELECT EXISTS (
                    SELECT 1
                    FROM afastamentos af
                    INNER JOIN tipos_motivos_afastamentos tma
                        ON tma.id = af.tipo_motivo_afastamento_id
                        AND tma.deleted_at IS NULL
                    WHERE af.usuario_id = p_usuario_id
                      AND af.deleted_at IS NULL
                      AND tma.calculo <> 'ACRESCIMO'
                      AND DATE(af.data_inicio) <= v_inicio
                      AND DATE(af.data_fim) >= v_inicio
                ) INTO v_cobre_inicio;

                IF v_cobre_inicio = 0 THEN
                    RETURN 0;
                END IF;

                SELECT EXISTS (
                    SELECT 1
                    FROM afastamentos af
                    INNER JOIN tipos_motivos_afastamentos tma
                        ON tma.id = af.tipo_motivo_afastamento_id
                        AND tma.deleted_at IS NULL
                    WHERE af.usuario_id = p_usuario_id
                      AND af.deleted_at IS NULL
                      AND tma.calculo <> 'ACRESCIMO'
                      AND DATE(af.data_fim) >= v_inicio
                      AND DATE(af.data_inicio) <= v_fim
                      AND DATE(af.data_fim) < v_fim
                      AND NOT EXISTS (
                          SELECT 1
                          FROM afastamentos af2
                          INNER JOIN tipos_motivos_afastamentos tma2
                              ON tma2.id = af2.tipo_motivo_afastamento_id
                              AND tma2.deleted_at IS NULL
                          WHERE af2.usuario_id = p_usuario_id
                            AND af2.deleted_at IS NULL
                            AND tma2.calculo <> 'ACRESCIMO'
                            AND DATE(af2.data_inicio) <= DATE_ADD(DATE(af.data_fim), INTERVAL 1 DAY)
                            AND DATE(af2.data_fim) > DATE(af.data_fim)
                      )
                ) INTO v_lacuna;

                IF v_lacuna = 1 THEN
                    RETURN 0;
                END IF;

                RETURN 1;
            END
        SQL);

        DB::statement('DROP VIEW IF EXISTS view_relatorio_plano_trabalho_detalhado');

        DB::statement(<<<SQL
            CREATE ALGORITHM = UNDEFINED VIEW `view_relatorio_plano_trabalho_detalhado` AS
            select
                `ptc`.`id` COLLATE utf8mb4_unicode_ci AS `id`,
                `pt`.`id` COLLATE utf8mb4_unicode_ci AS `plano_trabalho_id`,
                `pt`.`numero` COLLATE utf8mb4_unicode_ci AS `numero`,
                `pt`.`status` COLLATE utf8mb4_unicode_ci AS `status`,
                cast(`pt`.`data_inicio` as date) AS `dataInicio`,
                cast(`pt`.`data_fim` as date) AS `dataFim`,
                `pt`.`unidade_id` COLLATE utf8mb4_unicode_ci AS `unidade_id`,
                `usu`.`nome` COLLATE utf8mb4_unicode_ci AS `participanteNome`,
                `fn_obter_unidade_hierarquia`(`pt`.`unidade_id`) COLLATE utf8mb4_unicode_ci AS `unidadeHierarquia`,
                `uni`.`sigla` COLLATE utf8mb4_unicode_ci AS `unidadeSigla`,
                `pt`.`modalidade_pgd` COLLATE utf8mb4_unicode_ci AS `modalidade_pgd`,
                `pt`.`modalidade_pgd` COLLATE utf8mb4_unicode_ci AS `tipo_modalidade_id`,
                CASE
                    WHEN `pt`.`modalidade_pgd` IS NULL OR `pt`.`modalidade_pgd` = '' THEN 'Não definida'
                    WHEN LOWER(`pt`.`modalidade_pgd`) = 'presencial' THEN 'Presencial'
                    WHEN LOWER(`pt`.`modalidade_pgd`) = 'parcial' THEN 'Teletrabalho (Parcial)'
                    WHEN LOWER(`pt`.`modalidade_pgd`) = 'integral' THEN 'Teletrabalho (Integral)'
                    WHEN LOWER(`pt`.`modalidade_pgd`) = 'no exterior substituicao' THEN 'Teletrabalho no exterior (substituição)'
                    WHEN LOWER(`pt`.`modalidade_pgd`) = 'no exterior' THEN 'Teletrabalho no exterior'
                    ELSE `pt`.`modalidade_pgd`
                END COLLATE utf8mb4_unicode_ci AS `tipoModalidadeNome`,
                to_days(`pt`.`data_fim`) - to_days(`pt`.`data_inicio`) + 1 AS `duracao`,
                ifnull((select sum(ifnull(`pte`.`forca_trabalho`, 0) * 1) from `planos_trabalhos_entregas` `pte` where `pte`.`plano_trabalho_id` = `pt`.`id` and `pte`.`deleted_at` is null), 0) AS `chd`,
                cast(`ptc`.`data_inicio` as date) AS `data_inicio_avaliativo`,
                cast(`ptc`.`data_fim` as date) AS `data_fim_avaliativo`,
                cast(`ptc`.`data_conclusao` as date) AS `data_conclusao`,
                cast(`aval_antiga`.`data_avaliacao` as date) AS `data_avaliacao`,
                json_unquote(`aval_antiga`.`nota`) `nota`,
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
                            and `ptc`.`status` not in ('CONCLUIDO', 'AVALIADO')
                        then case when curdate() <= cast(`ptc`.`data_fim` as date) + interval 10 day
                            then 'Aguardando'
                            else 'Atrasado'
                            end
                        else case
                                when `ptc`.`data_conclusao` is null
                                    or cast(`ptc`.`data_conclusao` as date) <= cast(`ptc`.`data_fim` as date) + interval 10 day
                                then 'Registrado no período'
                                else 'Registrado com atraso'
                            end
                        end
                    end
                collate utf8mb4_unicode_ci AS `situacao_execucao`,
                case when pt.status = 'CANCELADO'
                    then NULL
                    else
                        case
                            when `ptc`.`id` is not null
                                and `a`.`data_avaliacao` is null
                                and `fn_periodo_avaliativo_dispensado`(`pt`.`usuario_id`, `ptc`.`data_inicio`, `ptc`.`data_fim`) = 1
                            then 'Dispensado'
                            when `a`.`data_avaliacao` is null
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
                (((((`planos_trabalhos` `pt`
            join `usuarios` `usu` on
                (`usu`.`id` = `pt`.`usuario_id`))
            join `unidades` `uni` on
                (`uni`.`id` = `pt`.`unidade_id`))
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
                `pt`.`deleted_at` is null
        SQL);
    }

    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS view_relatorio_plano_trabalho_detalhado');

        DB::statement(<<<SQL
            CREATE ALGORITHM = UNDEFINED VIEW `view_relatorio_plano_trabalho_detalhado` AS
            select
                `ptc`.`id` COLLATE utf8mb4_unicode_ci AS `id`,
                `pt`.`id` COLLATE utf8mb4_unicode_ci AS `plano_trabalho_id`,
                `pt`.`numero` COLLATE utf8mb4_unicode_ci AS `numero`,
                `pt`.`status` COLLATE utf8mb4_unicode_ci AS `status`,
                cast(`pt`.`data_inicio` as date) AS `dataInicio`,
                cast(`pt`.`data_fim` as date) AS `dataFim`,
                `pt`.`unidade_id` COLLATE utf8mb4_unicode_ci AS `unidade_id`,
                `usu`.`nome` COLLATE utf8mb4_unicode_ci AS `participanteNome`,
                `fn_obter_unidade_hierarquia`(`pt`.`unidade_id`) COLLATE utf8mb4_unicode_ci AS `unidadeHierarquia`,
                `uni`.`sigla` COLLATE utf8mb4_unicode_ci AS `unidadeSigla`,
                `pt`.`modalidade_pgd` COLLATE utf8mb4_unicode_ci AS `modalidade_pgd`,
                `pt`.`modalidade_pgd` COLLATE utf8mb4_unicode_ci AS `tipo_modalidade_id`,
                CASE
                    WHEN `pt`.`modalidade_pgd` IS NULL OR `pt`.`modalidade_pgd` = '' THEN 'Não definida'
                    WHEN LOWER(`pt`.`modalidade_pgd`) = 'presencial' THEN 'Presencial'
                    WHEN LOWER(`pt`.`modalidade_pgd`) = 'parcial' THEN 'Teletrabalho (Parcial)'
                    WHEN LOWER(`pt`.`modalidade_pgd`) = 'integral' THEN 'Teletrabalho (Integral)'
                    WHEN LOWER(`pt`.`modalidade_pgd`) = 'no exterior substituicao' THEN 'Teletrabalho no exterior (substituição)'
                    WHEN LOWER(`pt`.`modalidade_pgd`) = 'no exterior' THEN 'Teletrabalho no exterior'
                    ELSE `pt`.`modalidade_pgd`
                END COLLATE utf8mb4_unicode_ci AS `tipoModalidadeNome`,
                to_days(`pt`.`data_fim`) - to_days(`pt`.`data_inicio`) + 1 AS `duracao`,
                ifnull((select sum(ifnull(`pte`.`forca_trabalho`, 0) * 1) from `planos_trabalhos_entregas` `pte` where `pte`.`plano_trabalho_id` = `pt`.`id` and `pte`.`deleted_at` is null), 0) AS `chd`,
                cast(`ptc`.`data_inicio` as date) AS `data_inicio_avaliativo`,
                cast(`ptc`.`data_fim` as date) AS `data_fim_avaliativo`,
                cast(`ptc`.`data_conclusao` as date) AS `data_conclusao`,
                cast(`aval_antiga`.`data_avaliacao` as date) AS `data_avaliacao`,
                json_unquote(`aval_antiga`.`nota`) `nota`,
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
                            and `ptc`.`status` not in ('CONCLUIDO', 'AVALIADO')
                        then case when curdate() <= cast(`ptc`.`data_fim` as date) + interval 10 day
                            then 'Aguardando'
                            else 'Atrasado'
                            end
                        else case
                                when `ptc`.`data_conclusao` is null
                                    or cast(`ptc`.`data_conclusao` as date) <= cast(`ptc`.`data_fim` as date) + interval 10 day
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
                (((((`planos_trabalhos` `pt`
            join `usuarios` `usu` on
                (`usu`.`id` = `pt`.`usuario_id`))
            join `unidades` `uni` on
                (`uni`.`id` = `pt`.`unidade_id`))
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
                `pt`.`deleted_at` is null
        SQL);

        DB::statement('DROP FUNCTION IF EXISTS `fn_periodo_avaliativo_dispensado`');
    }
};
