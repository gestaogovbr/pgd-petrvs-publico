<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionariosRespostasPerguntasTable extends Migration
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
            $table->json('resposta')->nullable()->comment("Respostas do questionário");
            // Chaves estrangeiras:
            $table->foreignUuid('questionario_pergunta_id')->constrained("questionarios_perguntas")->onDelete('restrict')->onUpdate('cascade')->comment("FK QuestionarioPerguntaa ID");
            $table->foreignUuid('questionario_resposta_id')->constrained("questionarios_respostas")->onDelete('restrict')->onUpdate('cascade')->comment("FK QuestionarioResposta ID");
           
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
}
