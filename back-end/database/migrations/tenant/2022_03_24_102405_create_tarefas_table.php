<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTarefasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tarefas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->string('nome', 256)->comment("Nome da tarefa");
            $table->float('tempo_estimado')->comment("Tempo estimado para a execução da tarefa (Horas decimais)");
            $table->tinyInteger('documental')->comment("Se a entrega requer obrigatoriamente um documento");
            $table->text('comentario_predefinido')->nullable()->comment("Comentário predefinida para a tarefa");
            // Chaves estrangeiras:
            $table->foreignUuid('unidade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('entidade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tarefas');
    }
}
