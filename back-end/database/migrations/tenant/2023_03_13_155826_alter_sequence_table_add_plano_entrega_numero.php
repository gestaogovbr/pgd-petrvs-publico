<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterSequenceTableAddPlanoEntregaNumero extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sequence', function (Blueprint $table) {
            $table->integer('plano_entrega_numero')->default(1)->comment("Sequencia numerica do número do plano de entrega");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sequence', function (Blueprint $table) {
            $table->dropColumn('plano_entrega_numero');
        });
    }
}
