<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosPontosControlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_pontos_controles', function (Blueprint $table) {
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
            $table->foreignUuid('plano_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('avaliador_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade');
            $table->uuid('tipo_avaliacao_id')->nullable();
            $table->foreign('tipo_avaliacao_id', 'fk_planos_p_contr_tipo_aval_id')->nullable()->references('id')->on('tipos_avaliacoes')->onDelete('restrict')->onUpdate('cascade');
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
        Schema::dropIfExists('planos_pontos_controles');
        Schema::enableForeignKeyConstraints();
    }
}
