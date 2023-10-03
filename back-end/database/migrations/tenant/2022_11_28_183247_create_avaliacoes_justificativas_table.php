<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

class CreateAvaliacoesJustificativasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('avaliacoes_justificativas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            // Chaves estrangeiras:
            $table->foreignUuid('avaliacao_id')->constrained("avaliacoes")->onDelete('restrict')->onUpdate('cascade')->comment('Avaliação');
            $table->foreignUuid('tipo_justificativa_id')->constrained('tipos_justificativas')->onDelete('restrict')->onUpdate('cascade')->comment("Tipos justificativas");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('avaliacoes_justificativas');
    }
}
