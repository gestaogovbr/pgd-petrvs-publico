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
        Schema::table('programas_participantes', function (Blueprint $table) {
            $table->foreignUuid('documento_id')
            ->nullable()
            ->references('id')
            ->on('documentos')
            ->constrained('documentos')
            ->comment("TCR - Documento do participante");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('programas_participantes', function (Blueprint $table) {
            $table->dropForeign(['documento_id']);
            $table->dropColumn('documento_id');
        });
    }
};
