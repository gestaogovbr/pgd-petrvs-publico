<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosAvaliacoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_avaliacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            $table->integer('nota_atribuida')->comment("Nota da avaliação 0 - 10");
            $table->json('justificativas')->comment("Justificativas da avaliação");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('plano_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_avaliacao_id')->constrained('tipos_avaliacoes')->onDelete('restrict')->onUpdate('cascade');

            // Os campos plano_id e tipo_avaliacao_id foram definidos como NOT NULL, apesar
            // de os campos respectivos na migration 'create_demandas_avaliacoes' estarem como NULLABLE.
            // Não percebemos a necessidade desses campos poderem ser nulos.
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos_avaliacoes');
    }
}
