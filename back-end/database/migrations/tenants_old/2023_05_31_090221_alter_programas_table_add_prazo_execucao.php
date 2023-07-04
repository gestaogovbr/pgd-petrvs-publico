<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProgramasTableAddPrazoExecucao extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('programas', function (Blueprint $table) {
            $table->integer('prazo_execucao')->comment("Limite máximo de dias corridos para o plano de entregas (Zero para não limitar)");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('programas', function (Blueprint $table) {
            $table->dropColumn('prazo_execucao');
        });
    }
}
