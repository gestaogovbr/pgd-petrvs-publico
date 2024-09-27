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
        Schema::table('solucao_produtos_servicos', function (Blueprint $table) {
            $table->dropForeign(['responsavel_id']);
            $table->dropColumn('responsavel_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('solucao_produtos_servicos', function (Blueprint $table) {
            $table->foreignUuid('responsavel_id')->constrained('usuarios')->onDelete('cascade');
        });
    }
};
