<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('solucao_produtos_servicos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nome', 250);
            $table->string('sigla', 20);
            $table->foreignUuid('unidade_id')->constrained('unidades')->onDelete('cascade');
            $table->foreignUuid('responsavel_id')->constrained('usuarios')->onDelete('cascade');
            $table->text('descricao');
            $table->string('url', 250);
            $table->integer('status')->default(0);
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solucao_produtos_servicos');
    }
};
