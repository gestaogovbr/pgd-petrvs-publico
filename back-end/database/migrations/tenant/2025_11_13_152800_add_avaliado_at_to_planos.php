<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    public function up(): void
    {
        try {
            DB::beginTransaction();
            DB::statement('ALTER TABLE planos_trabalhos ADD COLUMN avaliado_at DATE DEFAULT NULL COMMENT "Data em que todos os planos_trabalhos_consolidacoes tiveram o status alterado para AVALIADO"');
            DB::statement('ALTER TABLE planos_entregas  ADD COLUMN avaliado_at DATE DEFAULT NULL COMMENT "Data em que o plano teve seu status alterado para AVALIADO"');
            DB::statement("UPDATE planos_trabalhos SET avaliado_at = COALESCE(DATE(updated_at), '". date("Y-m-d") . "') 
                        WHERE (
                                SELECT
                                    1
                                FROM
                                    planos_trabalhos_consolidacoes
                                WHERE
                                    planos_trabalhos_consolidacoes.plano_trabalho_id = planos_trabalhos.id
                                    AND planos_trabalhos_consolidacoes.status != 'AVALIADO'
                                    AND planos_trabalhos_consolidacoes.deleted_at is null
                                LIMIT 1) IS NULL");
            DB::statement("UPDATE planos_entregas  SET avaliado_at = COALESCE(DATE(updated_at), '". date("Y-m-d") . "') WHERE status = 'AVALIADO'");
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
        }
    }

    public function down(): void
    {
        try {
            DB::beginTransaction();
            DB::statement('ALTER TABLE planos_trabalhos DROP COLUMN avaliado_at');
            DB::statement('ALTER TABLE planos_entregas  DROP COLUMN avaliado_at');
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
        }
    }
};
