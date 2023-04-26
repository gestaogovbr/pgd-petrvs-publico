<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosEntregasPontosControlesAlterNotaAtribuida extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("planos_entregas_pontos_controles", function(Blueprint $table) {
            $table->integer('nota_atribuida')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("planos_entregas_pontos_controles", function(Blueprint $table) {
            $table->integer('nota_atribuida')->comment("Nota da avaliação 0 - 10")->change();
        });
    }
}
