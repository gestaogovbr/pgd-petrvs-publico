<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanejamentosObjetivosTableAddSequencia extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->integer('sequencia')->default(0)->comment("Sequencia utilizada para ordenar");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->dropColumn('sequencia');
        });
    }
}
