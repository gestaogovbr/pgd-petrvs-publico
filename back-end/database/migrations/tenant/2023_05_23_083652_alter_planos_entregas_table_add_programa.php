<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosEntregasTableAddPrograma extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->foreignUuid('programa_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('Progarama de gestão vinculado ao Plano de Entregas');
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
            $table->dropForeign('programa_id');
        });
    }
}
