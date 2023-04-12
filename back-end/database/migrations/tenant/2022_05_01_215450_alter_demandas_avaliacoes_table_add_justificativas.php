<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterDemandasAvaliacoesTableAddJustificativas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('demandas_avaliacoes', function (Blueprint $table) {
            $table->json('justificativas')->comment("Justificativas da avaliação");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('demandas_avaliacoes', function (Blueprint $table) {
            $table->dropColumn('justificativas');
        });
    }
}
