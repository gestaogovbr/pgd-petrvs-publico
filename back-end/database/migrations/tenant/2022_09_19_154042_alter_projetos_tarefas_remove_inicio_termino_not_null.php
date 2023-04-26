<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterProjetosTarefasRemoveInicioTerminoNotNull extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE projetos_tarefas MODIFY inicio DATETIME DEFAULT NULL COMMENT 'Inicio da tarefa'");
        DB::statement("ALTER TABLE projetos_tarefas MODIFY termino DATETIME DEFAULT NULL COMMENT 'Termino da tarefa'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE projetos_tarefas MODIFY inicio DATETIME NOT NULL COMMENT 'Inicial da tarefa'");
        DB::statement("ALTER TABLE projetos_tarefas MODIFY termino DATETIME NOT NULL COMMENT 'Termino da tarefa'");
    }
}
