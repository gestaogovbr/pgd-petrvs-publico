<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanejamentosObjetivosDeleteSequenciaPath extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planejamentos_objetivos', function(Blueprint $table) {
            $table->dropColumn('sequencia');
            $table->dropColumn('path');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planejamentos_objetivos', function(Blueprint $table) {
            $table->integer('sequencia')->default(0)->comment("Sequencia dentro do grupo");
            $table->text('path')->nullable()->comment('Path dos nós pais separados por /, ou null caso seja um nó raiz');
        });
    }
}
