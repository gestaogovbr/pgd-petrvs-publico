<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTiposModalidadesAddAdesao extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tipos_modalidades', function (Blueprint $table) {
            $table->tinyInteger('exige_adesao')->default(1)->comment("Se será necessário o participante realiza a adesão");
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
            $table->dropColumn('exige_adesao');
        });
    }
}
