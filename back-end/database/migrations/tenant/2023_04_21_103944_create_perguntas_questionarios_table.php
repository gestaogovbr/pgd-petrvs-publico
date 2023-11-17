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
        Schema::create('perguntas_questionarios', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->tinyint('numero')->comment("Numero da pergunta no questionario");
            //$table->increments('numero')
            $table->string('pergunta',256)->comment("A pergunta do questionario");
            $table->enum('tipo', ["VISUAL", "LISTA_UNICA", "LISTA_MULTIPLA","LIVRE", "TEMPO", "NUMERICA", "CLASSIFICACAO", "SWICTH", "NUMERICA", "INTENSIDADE", "ORDENACAO", "LACUNA"])->comment("Tipos das respostas Sim/Nao, Multipla Escolha, Unica Escolha, etc");
            $table->string('codigo',256)->comment("Código do questionario");
            $table->json('resposta')->nullable()->comment("Respostas possiveis para a pergunta");
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
        Schema::dropIfExists('perguntas_questionarios');
    }
}
