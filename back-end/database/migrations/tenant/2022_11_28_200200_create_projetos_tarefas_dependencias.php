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
        Schema::create('projetos_tarefas_dependencias', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            // Chaves estrangeiras:
            $table->foreignUuid('tarefa_id')->constrained("projetos_tarefas")->onDelete('restrict')->onUpdate('cascade')->comment("Tarefa que depende de outras");
            $table->foreignUuid('dependencia_id')->constrained('projetos_tarefas')->onDelete('restrict')->onUpdate('cascade')->comment("Outra tarefa ao qual esta tarefa depende");
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
};
