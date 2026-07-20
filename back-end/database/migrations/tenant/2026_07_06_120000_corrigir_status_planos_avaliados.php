<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Corrige consolidações com avaliação registrada mas status desatualizado
        DB::statement("
            UPDATE planos_trabalhos_consolidacoes c
            SET c.status = 'AVALIADO'
            WHERE c.deleted_at IS NULL
              AND c.status != 'AVALIADO'
              AND EXISTS (
                  SELECT 1 FROM avaliacoes a
                  WHERE a.plano_trabalho_consolidacao_id = c.id
                    AND a.deleted_at IS NULL
              )
              AND (
                  (SELECT COUNT(*) FROM avaliacoes a
                   WHERE a.plano_trabalho_consolidacao_id = c.id
                     AND a.deleted_at IS NULL) >= 2
                  OR NOT EXISTS (
                      SELECT 1 FROM avaliacoes a
                      WHERE a.plano_trabalho_consolidacao_id = c.id
                        AND a.deleted_at IS NULL
                        AND a.recurso IS NOT NULL
                  )
              )
        ");

        // Corrige planos ATIVO cujas consolidações vigentes já estão todas avaliadas
        DB::statement("
            UPDATE planos_trabalhos pt
            SET
                pt.status = 'CONCLUIDO',
                pt.avaliado_at = COALESCE(
                    pt.avaliado_at,
                    (SELECT MAX(DATE(a.created_at))
                     FROM planos_trabalhos_consolidacoes c
                     JOIN avaliacoes a ON a.plano_trabalho_consolidacao_id = c.id AND a.deleted_at IS NULL
                     WHERE c.plano_trabalho_id = pt.id AND c.deleted_at IS NULL)
                )
            WHERE pt.status = 'ATIVO'
              AND pt.deleted_at IS NULL
              AND EXISTS (
                  SELECT 1 FROM planos_trabalhos_consolidacoes c
                  WHERE c.plano_trabalho_id = pt.id
                    AND c.deleted_at IS NULL
              )
              AND NOT EXISTS (
                  SELECT 1 FROM planos_trabalhos_consolidacoes c
                  WHERE c.plano_trabalho_id = pt.id
                    AND c.deleted_at IS NULL
                    AND c.status != 'AVALIADO'
                    AND (pt.encerrado_at IS NULL OR c.data_inicio <= pt.encerrado_at)
              )
        ");
    }

    public function down(): void
    {
        // Correção de dados históricos; reversão não é segura sem backup.
    }
};
