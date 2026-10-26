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
        // Justificativa exigida apenas na conclusão do período quando o esforço executado
        // diverge do esforço planejado. Vive no período avaliativo, não no planejamento.
        DB::statement("ALTER TABLE planos_trabalhos_consolidacoes ADD justificativa_carga_horaria TEXT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE planos_trabalhos_consolidacoes DROP justificativa_carga_horaria");
    }
};
