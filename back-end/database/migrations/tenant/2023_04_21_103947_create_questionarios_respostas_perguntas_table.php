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
        Schema::create('questionarios_respostas_perguntas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->json('resposta')->nullable()->comment("Resposta do questionário");
            $table->uuid('questionario_pergunta_id');
            $table->uuid('questionario_resposta_id');
            // Chaves estrangeiras:
            //$table->foreignUuid('questionario_pergunta_id')->constrained("questionarios_perguntas")->onDelete('restrict')->onUpdate('cascade')->comment("FK QuestionarioPerguntaa ID");
            $table->foreign('questionario_pergunta_id', 'fk_questionario_perg_id')->references('id')->on('questionarios_perguntas')->onDelete('restrict')->onUpdate('cascade')->comment("FK Questionario Pergunta ID");
            //$table->foreignUuid('questionario_resposta_id')->constrained("questionarios_respostas")->onDelete('restrict')->onUpdate('cascade')->comment("FK QuestionarioResposta ID");
            $table->foreign('questionario_resposta_id', 'fk_questionario_resp_id')->references('id')->on('questionarios_respostas')->onDelete('restrict')->onUpdate('cascade')->comment("FK Questionario Resposta ID");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questionarios_respostas_perguntas');
    }
};
