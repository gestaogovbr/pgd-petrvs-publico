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
         Schema::table('unidades_integrantes', function (Blueprint $table) {
            $table->unique(['usuario_id', 'unidade_id'], 'ux_unidade_usuario');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('unidades_integrantes', function (Blueprint $table) {
            $table->dropUnique('ux_unidade_usuario');
        });
    }
};
