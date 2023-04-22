<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRxCursosGraduacoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rx_cursos_graduacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->string('nome_curso', 256)->comment("Nome do curso");
            // Chaves estrangeiras:
            $table->foreignUuid('area_curso_id')->constrained("rx_areas_graduacoes")->onDelete('restrict')->onUpdate('cascade');
            //$table->foreignUuid('entrega_id')->constrained("planos_entregas_entregas")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rx_cursos_graduacoes');
    }
}
