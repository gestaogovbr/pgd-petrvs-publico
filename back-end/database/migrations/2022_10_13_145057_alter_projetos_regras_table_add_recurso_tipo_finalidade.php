<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProjetosRegrasTableAddRecursoTipoFinalidade extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projetos_regras', function (Blueprint $table) {
            $table->enum('recurso_tipo', ['HUMANO', 'MATERIAL', 'SERVICO', 'CUSTO', 'DEPARTAMENTO'])->comment("Tipo do recurso");
            $table->enum('finalidade', ['OUTRA', 'ESCRITORIO_PROJETO', 'GERENTE_PROJETO', 'GERENTE_RISCO', 'GERENTE_COMUNICACAO', 'GERENTE_RECURSO', 'PATROCINADOR', 'GESTOR_NEGOCIAL', 'MEMBRO'])->comment("Finalidade/Papel");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projetos_regras', function (Blueprint $table) {
            $table->dropColumn('recurso_tipo');
            $table->dropColumn('finalidades');
        });
    }
}
