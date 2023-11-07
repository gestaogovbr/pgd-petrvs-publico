<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterEixosTematicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('eixos_tematicos', function (Blueprint $table) {
            $table->text('descricao')
                ->comment("Descrição do eixo temático")
                ->change();
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
            $table->string('descricao', 256)
                ->comment("Descrição do eixo temático")
                ->change();
        });
    }
}
