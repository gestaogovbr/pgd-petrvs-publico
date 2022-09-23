<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetosTarefasDependencias extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projetos_tarefas_dependencias', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            // Chaves estrangeiras:
            $table->foreignUuid('tarefa_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('dependencia_id')->constrained('projetos_tarefas')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projetos_tarefas_dependencias');
    }
}
