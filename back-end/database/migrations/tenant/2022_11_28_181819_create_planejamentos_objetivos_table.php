<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanejamentosObjetivosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planejamentos_objetivos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            $table->integer('sequencia')->default(0)->comment("Sequencia dentro do grupo");
            $table->text('path')->nullable()->comment('Path dos nós pais separados por /, ou null caso seja um nó raiz');
            $table->string('nome', 256)->comment("Nome do objetivo");
            // Chaves estrangeiras:
            $table->foreignUuid('planejamento_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('eixo_tematico_id')->constrained("eixos_tematicos")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('objetivo_pai_id')->nullable()->constrained("planejamentos_objetivos")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planejamentos_objetivos');
    }
}
