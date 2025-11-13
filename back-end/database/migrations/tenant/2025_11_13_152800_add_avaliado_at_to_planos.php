<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('ALTER TABLE planos_trabalhos ADD COLUMN avaliado_at DATE DEFAULT NULL');
        DB::statement('ALTER TABLE planos_entregas  ADD COLUMN avaliado_at DATE DEFAULT NULL');
        DB::statement("UPDATE planos_trabalhos SET avaliado_at = COALESCE(DATE(updated_at), CURDATE()) WHERE status = 'AVALIADO'");
        DB::statement("UPDATE planos_entregas  SET avaliado_at = COALESCE(DATE(updated_at), CURDATE()) WHERE status = 'AVALIADO'");
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE planos_trabalhos DROP COLUMN avaliado_at');
        DB::statement('ALTER TABLE planos_entregas  DROP COLUMN avaliado_at');
    }
};
