<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTipoModalidadeAddAvaliacaoPlano extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tipos_modalidades', function (Blueprint $table) {
            $table->tinyInteger('avaliacao_plano')->default(0)->comment("Se a avaliação vai ser realizada pelo plano ao invés das demandas individuais");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tipos_modalidades', function (Blueprint $table) {
            $table->dropColumn('avaliacao_plano');
        });
    }
}
