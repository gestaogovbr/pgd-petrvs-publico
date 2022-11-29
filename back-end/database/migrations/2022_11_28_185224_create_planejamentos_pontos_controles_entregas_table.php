<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanejamentosPontosControlesEntregasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planejamentos_pontos_controles_entregas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            $table->json("meta")->comment("Meta para a entrega");
            $table->json("realizado")->nullable()->comment("Valor realizado");
            // Chaves estrangeiras:
            $table->foreignUuid('planejamento_ponto_controle_id')->constrained("planejamentos_pontos_controles")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('planejamento_entrega_id')->constrained("planejamentos_entregas")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planejamentos_pontos_controles_entregas');
    }
}
