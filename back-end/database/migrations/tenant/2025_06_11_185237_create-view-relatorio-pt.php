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
        ALGORITHM = UNDEFINED VIEW `view_relatorio_plano_trabalho` AS
        select
            `pt`.`id` AS `id`,
            `pt`.`numero` AS `numero`,
            `pt`.`status` AS `status`,
            CAST(`pt`.`data_inicio` AS DATE) AS `dataInicio`,
            CAST(`pt`.`data_fim` AS DATE) AS `dataFim`,
            `pt`.`unidade_id` AS `unidade_id`,
            `usu`.`nome` AS `participanteNome`,
            CONCAT(`fn_obter_unidade_hierarquia`(`pt`.`unidade_id`), '/', uni.sigla) AS `unidadeHierarquia`,
            `uni`.`sigla` AS `unidadeSigla`,
            `tm`.`nome` AS `tipoModalidadeNome`,
            nvl((
                SELECT sum(nvl(pte.forca_trabalho, 0) * 1)
                FROM planos_trabalhos_entregas pte
                WHERE pte.plano_trabalho_id = pt.id
                and pte.deleted_at is null
            ), 0) as chd,
            (SELECT count(*) from planos_trabalhos_consolidacoes ptc
            WHERE ptc.plano_trabalho_id = pt.id and ptc.deleted_at is null) as qtdePeriodosAvaliativos
        from
            (((`petrvs_mgi`.`planos_trabalhos` `pt`
        join `petrvs_mgi`.`usuarios` `usu` on
            (`usu`.`id` = `pt`.`usuario_id`))
        join `petrvs_mgi`.`unidades` `uni` on
            (`uni`.`id` = `pt`.`unidade_id`))
        join `petrvs_mgi`.`tipos_modalidades` `tm` on
            (`tm`.`id` = `pt`.`tipo_modalidade_id`))
        where
            `pt`.`deleted_at` is null;
        EOD);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
