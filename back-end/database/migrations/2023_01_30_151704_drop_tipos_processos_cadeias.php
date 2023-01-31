<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropTiposProcessosCadeias extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cadeias_valores_processos', function (Blueprint $table) {
            $table->dropForeign(['tipo_processo_id']);
            $table->dropColumn('tipo_processo_id');
        });        
        Schema::dropIfExists("tipos_processos_cadeias");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Irreversível
    }
}
