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
        Schema::create('questionarios_perguntas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->tinyInteger('sequencia')->comment("Sequequencia dos numeros da pergunta no questionario");
            //$table->increments('numero')
            $table->text('pergunta')->comment("A pergunta do questionario");
            $table->enum('tipo', ["EMOJI", "SELECT", "MULTI_SELECT", "TEXT", "TEXT_AREA", "TIMER", "DATE_TIME", "NUMBER", "RATE", "SWITCH", "RADIO", "CHECK"])->comment("Tipos das respostas Sim/Nao, Multipla Escolha, Unica Escolha, etc");
            $table->integer('criado_versao')->comment("Versão do Questionario que foi criada a pergunta");
            $table->integer('deletado_versao')->nullable()->comment("Versão do Questionario que foi deletada a pergunta");
            $table->timestamp('deletedat')->nullable()->comment("Data que foi deletada a pergunta");
            $table->json('respostas')->nullable()->comment("Respostas possiveis para a pergunta");
            // Chaves estrangeiras:
            $table->foreignUuid('questionario_id')->constrained("questionarios")->onDelete('restrict')->onUpdate('cascade')->comment("FK Questionario ID");
            $table->foreignUuid('origem_id')->nullable()->constrained("questionarios_perguntas")->onDelete('restrict')->onUpdate('cascade')->comment("Origem, serve para vincular a mesma pergunta em suas várias versões, caso tenha modificado ou alterado a sequencia, o ID será do registro que foi deletado");
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
};
//LIVRE - Resposta Aberta (Texto Livre): Permite que os respondentes expressem suas opiniões em suas próprias palavras.

//LISTA UNICA - Resposta de Escolha Única: respondente seleciona uma única opção entre as fornecidas.

//LISTA_MULTIPLA - O respondente pode selecionar várias opções entre as fornecidas.

//CLASSIFICACAO - O respondente avalia sua concordância ou discordância em uma escala. 

//VISUAL - O respondente fornece uma classificação visual, como estrelas ou emojis.

//NUMERICA - O respondente fornece um valor numérico como resposta.

//SWITCH - O respondente escolhe entre verdadeiro ou falso, sim ou não.

//INTENSIDADE - O respondente indica o nível de intensidade de uma característica. Ex. Em uma escala de 1 a 10, quão importante...

//ORDENACAO - O respondente ordena itens de acordo com suas preferências.

//LACUNA - O respondente preenche espaços em branco em uma frase.

//SWITCH-Resposta de Escolha Única: respondente seleciona uma única opção entre SIM ou NÃO.