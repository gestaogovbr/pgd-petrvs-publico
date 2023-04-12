<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCadeiasValoresProcessos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cadeias_valores_processos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicio da vigência do registro");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência do registro");
            $table->integer('sequencia')->default(0)->comment("Sequencia dentro do grupo");
            $table->text('path')->nullable()->comment('Path dos nós pais separados por /, ou null caso sejam nós raiz');
            $table->string('nome', 256)->comment("Nome");
            // Chaves estrangeiras:
            $table->foreignUuid('cadeia_valor_id')->constrained("cadeias_valores")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_processo_id')->constrained("tipos_processos_cadeias")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('processo_pai_id')->nullable()->constrained("cadeias_valores_processos")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cadeias_valores_processos');
    }
}
