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
      // Quando o chefe conclui a consolidação do plano de trabalho, ele deve informar a justificativa da conclusão.
      DB::statement("ALTER TABLE planos_trabalhos_consolidacoes ADD justificativa_conclusao TEXT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      DB::statement("ALTER TABLE planos_trabalhos_consolidacoes DROP justificativa_conclusao");
    }
};
