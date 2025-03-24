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
        Schema::dropIfExists('produto_produto');

        Schema::create('produtos_insumos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('produto_id');
            $table->enum('origem', ['interno', 'externo']);
            $table->uuid('unidade_id')->nullable();
            $table->uuid('produto_insumo_id')->nullable();
            $table->uuid('cliente_id')->nullable();
            $table->string('descricao', 1000)->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('produto_id')->references('id')->on('produtos')->onDelete('cascade');
            $table->foreign('produto_insumo_id')->references('id')->on('produtos')->onDelete('restrict');
            $table->foreign('unidade_id')->references('id')->on('unidades')->onDelete('restrict');
            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('produto_produto', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('produto_base_id');
            $table->uuid('produto_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('produto_base_id')->references('id')->on('produtos')->onDelete('cascade');
            $table->foreign('produto_id')->references('id')->on('produtos')->onDelete('cascade');

            $table->unique(['produto_base_id', 'produto_id']);
        });
    }
};
