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
            if (Schema::hasColumn('integracao_servidores', 'nome_jornada')) {
                $table->dropColumn('nome_jornada');
            }
            if (Schema::hasColumn('integracao_servidores', 'cod_jornada')) {
                $table->dropColumn('cod_jornada');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->string('nome_jornada', 100)->nullable(); 
            $table->integer('cod_jornada')->nullable(); 
        });
    }
};
