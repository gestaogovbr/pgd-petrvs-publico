<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntregasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entregas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome da entrega");
            $table->string("descricao")->comment("Descrição da entrega");
            $table->enum('tipo_indicador', ["QUANTIDADE", "VALOR", "PORCENTAGEM", "QUALITATIVO"])->comment("Tipo do indicador da entrega");
            $table->json('lista_qualitativos')->nullable()->comment("Lista de valores para entrega do tipo qualitativo");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entregas');

    }
}
