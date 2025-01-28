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
        if (!Schema::hasTable('solucoes_unidades')) {
            Schema::create('solucoes_unidades', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->uuid('id_unidade');
                $table->uuid('id_solucao');
                $table->tinyInteger('status')->default(0);
                $table->softDeletes();
                $table->timestamps();

                $table->foreign('id_unidade')
                    ->references('id')
                    ->on('unidades')
                    ->onDelete('cascade');

                $table->foreign('id_solucao')
                    ->references('id')
                    ->on('solucao_produtos_servicos')
                    ->onDelete('cascade');

                $table->unique(['id_unidade', 'id_solucao'], 'unique_unidade_solucao');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solucoes_unidades');
    }
};
