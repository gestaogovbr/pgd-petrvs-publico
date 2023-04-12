<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterComentariosTableModifyTipoAddTarefaAtividade extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE comentarios MODIFY tipo ENUM('COMENTARIO', 'TECNICO', 'GERENCIAL', 'AVALIACAO', 'TAREFA', 'ATIVIDADE') NOT NULL DEFAULT 'COMENTARIO' COMMENT 'Tipo do comentário'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE comentarios MODIFY tipo ENUM('COMENTARIO', 'TECNICO', 'GERENCIAL', 'AVALIACAO') NOT NULL DEFAULT 'COMENTARIO' COMMENT 'Tipo do comentário'");
    }
}
