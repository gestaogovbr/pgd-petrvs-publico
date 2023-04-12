<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterEntidadeTableAddGestores extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('entidades', function (Blueprint $table) {
            $table->foreignUuid('gestor_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment('Usuário gestor da entidade');
            $table->foreignUuid('gestor_substituto_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment('Usuário gestor substituto da entidade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('entidades', function (Blueprint $table) {
            $table->foreignUuid('gestor_id');
            $table->foreignUuid('gestor_substituto_id');
        });
    }
}
