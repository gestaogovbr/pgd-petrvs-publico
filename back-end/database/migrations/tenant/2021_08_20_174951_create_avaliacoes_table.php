<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

class CreateAvaliacoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('avaliacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->json('nota')->comment("Nota da avaliação");
            $table->json('justificativas')->default(new Expression('(JSON_ARRAY())'))->comment("Justificativas");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_avaliacao_id')->nullable()->constrained('tipos_avaliacoes')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('avaliacoes');
    }
}
