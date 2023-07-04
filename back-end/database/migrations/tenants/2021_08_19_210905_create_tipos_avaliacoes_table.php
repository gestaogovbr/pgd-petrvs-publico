<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTiposAvaliacoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipos_avaliacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->integer('nota_atribuida')->nullable()->comment("Nota atribuida de 0 a 10");
            $table->string('nome', 256)->comment("Descrição da nota atribuida");
            $table->tinyInteger('aceita_entrega')->default('1')->comment("Se a entrega vai ser aceita e as horas pactuadas serão homologadas");
            $table->text('pergunta')->comment("Pergunta motivacional, o porque você selecionou essa nota");
            $table->string('icone', 100)->comment("Classe do icone relacionado a avaliação");
            $table->string('cor', 100)->comment("Código da cor em hex");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipos_avaliacoes');
    }
}
