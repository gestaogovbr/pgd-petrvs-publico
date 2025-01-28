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
        if (!Schema::hasTable('produtos_solucoes')) {
            Schema::create('produtos_solucoes', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->uuid('produto_id');
                $table->uuid('solucao_id');
                $table->timestamps();
                $table->softDeletes();

                $table->foreign('produto_id')
                    ->references('id')
                    ->on('produtos')
                    ->onDelete('cascade');

                $table->foreign('solucao_id')
                    ->references('id')
                    ->on('solucao_produtos_servicos')
                    ->onDelete('cascade');

                $table->unique(['produto_id', 'solucao_id']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos_solucoes');
    }
};
