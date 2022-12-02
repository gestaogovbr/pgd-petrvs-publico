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
            $table->uuid('planejamento_id');
            $table->foreign('planejamento_id', 'fk_planej_p_contr_planej_id')->references('id')->on('planejamentos')->onDelete('restrict')->onUpdate('cascade');
            $table->uuid('gestor_id')->nullable();
            $table->foreign('gestor_id', 'fk_planej_p_contr_gestor_id')->nullable()->references('id')->on('usuarios')->onDelete('restrict')->onUpdate('cascade');
            $table->uuid('avaliador_id')->nullable();
            $table->foreign('avaliador_id', 'fk_planej_p_contr_avaliador_id')->nullable()->references('id')->on('usuarios')->onDelete('restrict')->onUpdate('cascade');
            $table->uuid('tipo_avaliacao_id')->nullable();
            $table->foreign('tipo_avaliacao_id', 'fk_planej_p_contr_tipo_avaliacao_id')->nullable()->references('id')->on('tipos_avaliacoes')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('planejamentos_pontos_controles');
        Schema::enableForeignKeyConstraints();
    }
}
