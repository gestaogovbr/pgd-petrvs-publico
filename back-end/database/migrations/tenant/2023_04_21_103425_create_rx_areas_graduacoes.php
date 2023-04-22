<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRxAreasGraduacoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rx_areas_graduacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->string('nome_area', 256)->comment("Nome da área da graduação");
           
            // Chaves estrangeiras:
            //$table->foreignUuid('plano_id')->constrained("planos")->onDelete('restrict')->onUpdate('cascade');
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
        Schema::dropIfExists('rx_areas_graduacoes');
    }
}
