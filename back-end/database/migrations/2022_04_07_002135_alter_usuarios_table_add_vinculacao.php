<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUsuariosTableAddVinculacao extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->enum("vinculacao", ["SERVIDOR_EFETIVO", "SERVIDOR_COMISSIONADO", "EMPREGADO", "CONTRATADO_TEMPORARIO"])->default("SERVIDOR_EFETIVO")->comment("Vinculo do usuário com a administração");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn("vinculacao");
        });
    }
}
