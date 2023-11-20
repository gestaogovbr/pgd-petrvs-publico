<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerguntasQuestionariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questionarios_perguntas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->tinyint('sequencia')->comment("Sequequencia dos numeros da pergunta no questionario");
            //$table->increments('numero')
            $table->text('pergunta')->comment("A pergunta do questionario");
            $table->enum('tipo', ["VISUAL", "LISTA_UNICA", "LISTA_MULTIPLA","LIVRE", "TEMPO", "NUMERICA", "CLASSIFICACAO", "SWICTH", "NUMERICA", "INTENSIDADE", "ORDENACAO", "LACUNA"])->comment("Tipos das respostas Sim/Nao, Multipla Escolha, Unica Escolha, etc");
            $table->json('respostas')->nullable()->comment("Respostas possiveis para a pergunta");
            // Chaves estrangeiras:
            $table->foreignUuid('questionario_id')->constrained("questionarios")->onDelete('restrict')->onUpdate('cascade')->comment("FK Questionario ID");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questionarios_perguntas');
    }
}
