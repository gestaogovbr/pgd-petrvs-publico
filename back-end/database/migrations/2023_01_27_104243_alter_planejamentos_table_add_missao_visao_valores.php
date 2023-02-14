<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanejamentosTableAddMissaoVisaoValores extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planejamentos', function (Blueprint $table) {
            $table->text('missao')->comment("Missão");
            $table->text('visao')->comment("Visão");
            $table->json('valores')->comment("Valores");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planejamentos', function (Blueprint $table) {
            $table->dropColumn('missao');
            $table->dropColumn('visao');
            $table->dropColumn('valores');
        });
    }
}
