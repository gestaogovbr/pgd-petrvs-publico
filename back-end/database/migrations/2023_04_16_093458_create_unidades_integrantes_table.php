<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnidadesIntegrantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unidades_integrantes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            $table->enum("tipo", ["AVALIADOR_DEMANDAS"])->comment("Tipo do vinculo");
            // Chaves estrangeiras:
            $table->foreignUuid('unidade_id')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('usuario_id')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unidades_integrantes');
    }
}
