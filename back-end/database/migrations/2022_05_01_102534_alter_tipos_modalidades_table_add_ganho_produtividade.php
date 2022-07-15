<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTiposModalidadesTableAddGanhoProdutividade extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tipos_modalidades', function (Blueprint $table) {
            $table->integer('ganho_produtividade')->default(0)->comment("Ganho de produtividade");
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
            $table->dropColumn('ganho_produtividade');
        });
    }
}
