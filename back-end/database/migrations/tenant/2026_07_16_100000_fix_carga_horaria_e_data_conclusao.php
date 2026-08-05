<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const RELEASE_DATE = '2025-06-08';

    public function up(): void
    {
        $this->corrigirCargaHorariaPTs();
        $this->corrigirDataConclusaoConsolidacoes();
    }

    private function corrigirCargaHorariaPTs(): void
    {
        DB::statement(<<<SQL
            UPDATE planos_trabalhos pt
            INNER JOIN usuarios u ON u.id = pt.usuario_id
            SET pt.carga_horaria = CASE
                WHEN u.cod_jornada IS NULL OR u.cod_jornada = 99 THEN 8
                ELSE u.cod_jornada / 5
            END
            WHERE pt.carga_horaria = 0
              AND pt.created_at >= ?
              AND pt.deleted_at IS NULL
        SQL, [self::RELEASE_DATE]);
    }

    private function corrigirDataConclusaoConsolidacoes(): void
    {
        // Consolidações concluídas pelo servidor
        DB::statement(<<<SQL
            UPDATE planos_trabalhos_consolidacoes ptc
            INNER JOIN planos_trabalhos pt ON pt.id = ptc.plano_trabalho_id
            INNER JOIN (
                SELECT plano_trabalho_consolidacao_id, MAX(created_at) AS data_conclusao
                FROM status_justificativas
                WHERE justificativa LIKE 'Período concluído pelo servidor%'
                  AND deleted_at IS NULL
                GROUP BY plano_trabalho_consolidacao_id
            ) sj ON sj.plano_trabalho_consolidacao_id = ptc.id
            SET ptc.data_conclusao = sj.data_conclusao
            WHERE ptc.status IN ('CONCLUIDO', 'AVALIADO')
              AND ptc.data_conclusao IS NULL
              AND pt.created_at >= ?
              AND ptc.deleted_at IS NULL
        SQL, [self::RELEASE_DATE]);

        // Consolidações concluídas por encerramento antecipado do plano
        DB::statement(<<<SQL
            UPDATE planos_trabalhos_consolidacoes ptc
            INNER JOIN planos_trabalhos pt ON pt.id = ptc.plano_trabalho_id
            INNER JOIN (
                SELECT plano_trabalho_id, MAX(created_at) AS data_conclusao
                FROM status_justificativas
                WHERE justificativa LIKE 'Plano encerrado antecipadamente%'
                  AND deleted_at IS NULL
                GROUP BY plano_trabalho_id
            ) sj ON sj.plano_trabalho_id = pt.id
            SET ptc.data_conclusao = sj.data_conclusao
            WHERE ptc.status IN ('CONCLUIDO', 'AVALIADO')
              AND ptc.data_conclusao IS NULL
              AND pt.created_at >= ?
              AND ptc.deleted_at IS NULL
        SQL, [self::RELEASE_DATE]);
    }

    public function down(): void
    {
        // Não reversível: dados corrigidos não podem ser "descorrigidos"
    }
};
