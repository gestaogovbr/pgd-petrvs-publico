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
        Schema::create('cadeias_valores_processos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->integer('sequencia')->default(0)->comment("Sequência do processo dentro do grupo");
            $table->text('path')->nullable()->comment('Path dos nós pais separados por /, ou NULL caso sejam nós raiz');
            $table->string('nome', 256)->comment("Nome do processo");
            // Chaves estrangeiras:
            $table->foreignUuid('cadeia_valor_id')->constrained("cadeias_valores")->onDelete('restrict')->onUpdate('cascade')->comment("Cadeia de valores à qual se refere o processo");
            $table->foreignUuid('processo_pai_id')->nullable()->constrained("cadeias_valores_processos")->onDelete('restrict')->onUpdate('cascade')->comment("Processo pai ao qual se refere o processo");
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
};
