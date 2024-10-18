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
        Schema::create('produto_processo_cadeia_valor', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('produto_id');
            $table->uuid('cadeia_valor_processo_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('produto_id')->references('id')->on('produtos')->onDelete('cascade');
            $table->foreign('cadeia_valor_processo_id')->references('id')->on('cadeias_valores_processos')->onDelete('cascade');

            $table->unique(['produto_id', 'cadeia_valor_processo_id'])->name('fk_produto_processo_cadeia_valor_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produto_processo_cadeia_valor');
    }
};
