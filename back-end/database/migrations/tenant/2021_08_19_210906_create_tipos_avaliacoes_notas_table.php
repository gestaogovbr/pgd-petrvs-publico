<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipos_avaliacoes_notas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->integer('sequencia')->comment("Sequencia da nota (serve para ordenar as notas de forma crescente)");
            $table->json('nota')->comment("Nota");
            $table->string('descricao')->comment("Descrição da nota");
            $table->string('pergunta')->comment("Pergunta motivacional");
            $table->tinyInteger('aprova')->comment("Se essa nota aprova, quando aplicável");
            $table->tinyInteger('justifica')->comment("Se é obrigatório justificar essa nota");
            $table->string('icone', 100)->comment("Classe do icone");
            $table->string('cor', 100)->comment("Código da cor em hex");
            $table->string('codigo', 50)->nullable()->comment("Código de integração");
            // Chaves estrangeiras:
            $table->foreignUuid('tipo_avaliacao_id')->constrained('tipos_avaliacoes')->onDelete('restrict')->onUpdate('cascade')->comment("Tipo avaliação");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipos_avaliacoes_notas');
    }
};
