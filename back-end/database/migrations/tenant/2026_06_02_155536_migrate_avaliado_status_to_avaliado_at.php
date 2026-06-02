<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Backup dos valores anteriores
        DB::statement("
            CREATE TABLE IF NOT EXISTS _backup_migrate_avaliado_status AS
            SELECT id, status, avaliado_at
            FROM planos_trabalhos
            WHERE deleted_at IS NULL
              AND (status = 'AVALIADO'
                OR (avaliado_at IS NULL
                    AND EXISTS (
                        SELECT 1 FROM planos_trabalhos_consolidacoes c
                        WHERE c.plano_trabalho_id = planos_trabalhos.id
                          AND c.deleted_at IS NULL
                          AND c.status = 'AVALIADO'
                    )
                )
              )
        ");

        // Para PTs com status AVALIADO: definir avaliado_at e mudar status para CONCLUIDO
        DB::statement("
            UPDATE planos_trabalhos pt
            SET
                pt.avaliado_at = COALESCE(
                    pt.avaliado_at,
                    (SELECT MAX(DATE(a.created_at))
                     FROM planos_trabalhos_consolidacoes c
                     JOIN avaliacoes a ON a.plano_trabalho_consolidacao_id = c.id AND a.deleted_at IS NULL
                     WHERE c.plano_trabalho_id = pt.id AND c.deleted_at IS NULL)
                ),
                pt.status = 'CONCLUIDO'
            WHERE pt.status = 'AVALIADO'
              AND pt.deleted_at IS NULL
        ");

        // Para PTs com consolidações todas AVALIADO mas avaliado_at NULL (e status != AVALIADO)
        DB::statement("
            UPDATE planos_trabalhos pt
            SET pt.avaliado_at = COALESCE(
                pt.avaliado_at,
                (SELECT MAX(DATE(a.created_at))
                 FROM planos_trabalhos_consolidacoes c
                 JOIN avaliacoes a ON a.plano_trabalho_consolidacao_id = c.id AND a.deleted_at IS NULL
                 WHERE c.plano_trabalho_id = pt.id AND c.deleted_at IS NULL)
            )
            WHERE pt.avaliado_at IS NULL
              AND pt.deleted_at IS NULL
              AND NOT EXISTS (
                  SELECT 1 FROM planos_trabalhos_consolidacoes c
                  WHERE c.plano_trabalho_id = pt.id
                    AND c.deleted_at IS NULL
                    AND c.status != 'AVALIADO'
                    AND (pt.encerrado_at IS NULL OR c.data_inicio <= pt.encerrado_at)
              )
              AND EXISTS (
                  SELECT 1 FROM planos_trabalhos_consolidacoes c
                  WHERE c.plano_trabalho_id = pt.id
                    AND c.deleted_at IS NULL
                    AND c.status = 'AVALIADO'
              )
        ");
    }

    public function down(): void
    {
        DB::statement("
            UPDATE planos_trabalhos pt
            JOIN _backup_migrate_avaliado_status bk ON bk.id = pt.id
            SET pt.status = bk.status, pt.avaliado_at = bk.avaliado_at
        ");

        DB::statement("DROP TABLE IF EXISTS _backup_migrate_avaliado_status");
    }
};
