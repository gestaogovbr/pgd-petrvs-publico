<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
          DB::statement(<<<EOD
        CREATE
        ALGORITHM = UNDEFINED VIEW `view_relatorio_plano_entrega` AS
        select
            `pe`.`id` AS `id`,
            `pe`.`numero` AS `numero`,
            `pe`.`status` AS `status`,
            pe.nome as entregaNome,
            CAST(`pe`.`data_inicio` AS DATE) AS `dataInicio`,
            CAST(`pe`.`data_fim` AS DATE) AS `dataFim`,
            `pe`.`unidade_id` AS `unidade_id`,
            `fn_obter_unidade_hierarquia`(`pe`.`unidade_id`) AS `unidadeHierarquia`,
            `uni`.`sigla` AS `unidadeSigla`,
            DATEDIFF(`pe`.`data_fim`, `pe`.`data_inicio`) + 1 AS `duracao`,
            CAST(a.data_avaliacao AS DATE) AS data_avaliacao,
            JSON_UNQUOTE(a.nota) AS nota,
            case when a.data_avaliacao is null
                then
                    CASE when CAST(a.data_avaliacao as date) <= DATE_ADD(now(), INTERVAL 10 DAY)
                    THEN 'Aguardando'
                    ELSE 'Atrasado' END
                else
                    CASE when cast(a.data_avaliacao as date) <= DATE_ADD(now(), INTERVAL 10 DAY)
                    THEN 'Registrado no período'
                    ELSE 'Registrado com atraso' END
                end as situacao_avaliacao
        from
            `planos_entregas` `pe`
        join `unidades` `uni` on
            (`uni`.`id` = `pe`.`unidade_id`)
        left join avaliacoes a on a.id = pe.avaliacao_id and a.deleted_at is null
        where pe.deleted_at is null;
        EOD);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS view_relatorio_plano_entrega');
    }
};
