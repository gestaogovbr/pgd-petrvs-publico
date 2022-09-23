<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterComentariosTableAddProjetoTarefa extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comentarios', function (Blueprint $table) {
            $table->foreignUuid('projeto_id')->nullable()->constrained("projetos")->onDelete('restrict')->onUpdate('cascade')->comment("Projeto");
            $table->foreignUuid('projeto_tarefa_id')->nullable()->constrained("projetos_tarefas")->onDelete('restrict')->onUpdate('cascade')->comment("Tarefa do projeto");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('comentarios', function (Blueprint $table) {
            $table->dropColumn('projeto_id');
            $table->dropColumn('projeto_tarefa_id');
        });
    }
}
