<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTiposModalidadeAddComparecerPresencialmente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tipos_modalidades', function (Blueprint $table) {
            $table->tinyInteger('comparecer_presencialmente')->default(1)->comment("Se será necessário comparecer presencialmente quando convocado");
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
            $table->dropColumn('comparecer_presencialmente');
        });
    }
}
