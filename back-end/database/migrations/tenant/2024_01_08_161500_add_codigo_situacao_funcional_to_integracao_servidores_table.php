<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->string('codigo_situacao_funcional', 50)
                ->nullable()
                ->comment("Registra Código da Situação Funcional informado pelo Siape.");
        });
        //
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->dropColumn('codigo_situacao_funcional');
        });
        //
    }
};
