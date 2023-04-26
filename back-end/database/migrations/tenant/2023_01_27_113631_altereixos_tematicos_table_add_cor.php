<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AltereixosTematicosTableAddCor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('eixos_tematicos', function (Blueprint $table) {
            if(!Schema::hasColumn('eixos_tematicos', 'icone')) $table->string('icone', 100)->comment("Class do icone relacionado ao afastamento"); // class="fa fa-icone"
            if(!Schema::hasColumn('eixos_tematicos', 'cor')) $table->string('cor', 100)->comment("Código da cor em formato hex"); // style="color: #AABBCC00"
            if(!Schema::hasColumn('eixos_tematicos', 'descricao')) $table->string('descricao', 256)->comment("Descrição");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('eixos_tematicos', function (Blueprint $table) {
            $table->dropColumn('icone');
            $table->dropColumn('cor');
            $table->dropColumn('descricao');
        });
    }
}
