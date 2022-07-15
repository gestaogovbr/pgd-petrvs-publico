<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterSequenceTableAddPlanoNumero extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sequence', function (Blueprint $table) {
            $table->integer('plano_numero')->default(1)->comment("Sequencia numeria do número do plano");
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
            $table->dropColumn('plano_numero');
        });
    }
}
