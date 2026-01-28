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
        Schema::create('projetos_alocacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('descricao', 256)->comment("Descrição");
            $table->float('quantidade')->comment("Quantidade do recurso");
            // Chaves estrangeiras:
            $table->foreignUuid('projeto_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Projeto");
            $table->foreignUuid('tarefa_id')->nullable()->constrained("projetos_tarefas")->onDelete('restrict')->onUpdate('cascade')->comment("Tarefa, somente será preenchido se não for alocação direto para o projeto ao invés de ser para uma tarefa");
            $table->foreignUuid('recurso_id')->constrained("projetos_recursos")->onDelete('restrict')->onUpdate('cascade')->comment("Recurso");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projetos_alocacoes');
    }
};
