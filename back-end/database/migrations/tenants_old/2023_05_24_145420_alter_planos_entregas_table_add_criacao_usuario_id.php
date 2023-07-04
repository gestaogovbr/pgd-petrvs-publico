<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosEntregasTableAddCriacaoUsuarioId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->foreignUuid('criacao_usuario_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade');
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
            $table->dropForeign(['criacao_usuario_id']);
            $table->dropColumn('criacao_usuario_id');
        });
    }
}
