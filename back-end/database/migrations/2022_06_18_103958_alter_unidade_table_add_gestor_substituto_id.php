<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUnidadeTableAddGestorSubstitutoId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('unidades', function (Blueprint $table) {
            $table->foreignUuid('gestor_substituto_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment('Usuário gestor substituto da unidade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('unidades', function (Blueprint $table) {
            $table->dropColumn('gestor_substituto_id');
        });
    }
}
