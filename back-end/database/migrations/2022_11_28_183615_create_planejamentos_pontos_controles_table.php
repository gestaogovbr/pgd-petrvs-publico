<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanejamentosPontosControlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planejamentos_pontos_controles', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            $table->dateTime('inicio')->comment("Data inicio");
            $table->dateTime('fim')->comment("Data fim");   
            // campos avaliação
            $table->integer('nota_atribuida')->comment("Nota da avaliação 0 - 10");
            $table->json('justificativas')->nullable()->comment("Justificativas da avaliação");
            $table->text('comentarios')->nullable()->comment("Comentário referente a nota");
            // Chaves estrangeiras:
            $table->foreignUuid('planejamento_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('gestor_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('avaliador_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade');
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
        Schema::dropIfExists('planejamentos_pontos_controles');
    }
}
