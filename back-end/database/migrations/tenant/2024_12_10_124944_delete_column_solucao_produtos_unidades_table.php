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
            $table->dropForeign(['unidade_id']);
            $table->dropColumn(['unidade_id','status', 'data_ativado', 'data_desativado']);
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('solucao_produtos_servicos', function (Blueprint $table) {
            $table->timestamp('data_ativado')->nullable(); 
            $table->timestamp('data_desativado')->nullable(); 
            $table->foreignUuid('unidade_id')->constrained('unidades')->onDelete('cascade');
            $table->integer('status')->default(0);
        });
    }
};
