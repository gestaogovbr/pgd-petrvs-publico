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
        Schema::create('tipos_tarefas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome do tipo de tarefa");
            $table->float('tempo_estimado')->comment("Tempo estimado para a execução do tipo de tarefa (Horas decimais)");
            $table->tinyInteger('documental')->comment("Se o tipo de tarefa requer obrigatoriamente um documento");
            $table->text('comentario')->nullable()->comment("Comentário predefinida para o tipo de tarefa");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipos_tarefas');
    }
};
