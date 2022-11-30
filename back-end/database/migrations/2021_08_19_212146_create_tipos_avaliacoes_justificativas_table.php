<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTiposAvaliacoesJustificativasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipos_avaliacoes_justificativas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Chaves estrangeiras:
            $table->foreignUuid('tipo_avaliacao_id')->constrained('tipos_avaliacoes')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_justificativa_id')->constrained('tipos_justificativas')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipos_avaliacoes_justificativas');
    }
}
