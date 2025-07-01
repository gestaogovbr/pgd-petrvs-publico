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
        ALGORITHM = UNDEFINED VIEW `view_relatorio_plano_trabalho_detalhado` AS
        select
            `ptc`.`id` AS `id`,
            `pt`.`id` AS `plano_trabalho_id`,
            `pt`.`numero` AS `numero`,
            `pt`.`status` AS `status`,
            CAST(`pt`.`data_inicio` AS DATE) AS `dataInicio`,
            CAST(`pt`.`data_fim` AS DATE) AS `dataFim`,
            `pt`.`unidade_id` AS `unidade_id`,
            `usu`.`nome` AS `participanteNome`,
            CONCAT(`fn_obter_unidade_hierarquia`(`pt`.`unidade_id`), '/', uni.sigla) AS `unidadeHierarquia`,
            `uni`.`sigla` AS `unidadeSigla`,
            `pt`.`tipo_modalidade_id`,
            `tm`.`nome` AS `tipoModalidadeNome`,
            DATEDIFF(`pt`.`data_fim`, `pt`.`data_inicio`) + 1 AS `duracao`,
            nvl((
                SELECT sum(nvl(pte.forca_trabalho, 0) * 1)
                FROM planos_trabalhos_entregas pte
                WHERE pte.plano_trabalho_id = pt.id
                and pte.deleted_at is null
            ), 0) as chd,
            CAST(ptc.data_inicio AS DATE) as data_inicio_avaliativo,
            CAST(ptc.data_fim AS DATE)as data_fim_avaliativo,
            CAST(ptc.data_conclusao AS DATE) as data_conclusao,
            CAST(aval_antiga.data_avaliacao AS DATE) AS data_avaliacao,
            JSON_UNQUOTE(aval_antiga.nota) AS nota,
            (case when a.id = aval_antiga.id then NULL else CAST(a.data_avaliacao AS DATE) END) as data_reavaliacao,
            (case when a.id = aval_antiga.id then NULL else JSON_UNQUOTE(a.nota) END) as nota_reavaliacao,
            case when ptc.data_conclusao is null
                then
                    CASE when CURDATE() <= DATE_ADD(ptc.data_fim, INTERVAL 10 DAY)
                    THEN 'Aguardando'
                    ELSE 'Atrasado' END
                else
                    CASE when CURDATE() <= DATE_ADD(ptc.data_fim, INTERVAL 10 DAY)
                    THEN 'Registrado no período'
                    ELSE 'Registrado com atraso' END
                end as situacao_execucao,
            case when a.data_avaliacao is null
                then
                    CASE when a.data_avaliacao <= DATE_ADD(ptc.data_conclusao, INTERVAL 10 DAY)
                    THEN 'Aguardando'
                    ELSE 'Atrasado' END
                else
                    CASE when a.data_avaliacao <= DATE_ADD(ptc.data_conclusao, INTERVAL 10 DAY)
                    THEN 'Registrado no período'
                    ELSE 'Registrado com atraso' END
                end as situacao_avaliacao
        from
            (((`petrvs_mgi`.`planos_trabalhos` `pt`
        join `petrvs_mgi`.`usuarios` `usu` on
            (`usu`.`id` = `pt`.`usuario_id`))
        join `petrvs_mgi`.`unidades` `uni` on
            (`uni`.`id` = `pt`.`unidade_id`))
        join `petrvs_mgi`.`tipos_modalidades` `tm` on
            (`tm`.`id` = `pt`.`tipo_modalidade_id`))
        left join planos_trabalhos_consolidacoes ptc ON ptc.plano_trabalho_id = pt.id and ptc.deleted_at IS NULL
        left join avaliacoes a on a.id = ptc.avaliacao_id and a.deleted_at is null
        LEFT JOIN (
            SELECT a1.*
            FROM (
                SELECT *,
                    ROW_NUMBER() OVER (PARTITION BY plano_trabalho_consolidacao_id ORDER BY data_avaliacao ASC) AS rn
                FROM avaliacoes
                WHERE deleted_at IS NULL
            ) a1
            WHERE a1.rn = 1
        ) aval_antiga ON aval_antiga.plano_trabalho_consolidacao_id = ptc.id
        where
            `pt`.`deleted_at` is null;
        EOD);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS view_relatorio_plano_trabalho_detalhado');
    }
};
