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
        Schema::table('avaliacoes', function (Blueprint $table) {
            $table->foreignUuid('tipo_avaliacao_nota_id')
            ->nullable()
            ->references('id')
            ->on('tipos_avaliacoes_notas')
            ->constrained('tipos_avaliacoes_notas')
            ->comment("Tipo de avaliação da nota atribuída");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('avaliacoes', function (Blueprint $table) {
            $table->dropForeign(['tipo_avaliacao_nota_id']);
            $table->dropColumn('tipo_avaliacao_nota_id');
        });
    }
};
