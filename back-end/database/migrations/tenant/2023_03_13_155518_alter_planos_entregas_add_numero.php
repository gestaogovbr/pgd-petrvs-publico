<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosEntregasAddNumero extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->integer('numero')->default(0)->comment("Número do plano de entrega (Gerado pelo sistema)");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->dropColumn('numero');
        });
    }
}
