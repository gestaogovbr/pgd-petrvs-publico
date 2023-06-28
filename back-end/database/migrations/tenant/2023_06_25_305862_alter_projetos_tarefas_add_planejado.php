<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProjetosTarefasTableAddPlanejados extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projetos_tarefas', function (Blueprint $table) {
            $table->dateTime('inicio_baseline')->nullable()->comment("Inicio do projeto (Baseline)");
            $table->dateTime('termino_baseline')->nullable()->comment("Fim do projeto (Baseline)");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projetos_tarefas', function (Blueprint $table) {
            $table->dropColumn('inicio_baseline');
            $table->dropColumn('termino_baseline');
        });
    }
}
