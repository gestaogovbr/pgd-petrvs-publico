<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosTrabalhosEntregasDropNome extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planos_trabalhos_entregas', function (Blueprint $table) {
            $table->dropColumn('nome');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planos_trabalhos_entregas', function (Blueprint $table) {
            $table->string('nome', 256)->comment("Nome da entrega");
        });
    }
}
