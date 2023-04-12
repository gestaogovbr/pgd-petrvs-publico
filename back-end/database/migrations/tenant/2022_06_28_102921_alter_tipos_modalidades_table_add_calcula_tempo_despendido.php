<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTiposModalidadesTableAddCalculaTempoDespendido extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tipos_modalidades', function (Blueprint $table) {
            $table->tinyInteger('calcula_tempo_despendido')->default(1)->comment("Se calcula tempo despendido");
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
            $table->dropColumn('calcula_tempo_despendido');
        });
    }
}
