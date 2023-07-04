<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterEntidadeTableAddFormaContagemCargaHoraria extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('entidades', function (Blueprint $table) {
            $table->enum('forma_contagem_carga_horaria', ["DIA", "SEMANA", "MES"])->default("DIA")->comment("Forma de contagem padrão da carga horária");
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
            $table->dropColumn('forma_contagem_carga_horaria');
        });
    }
}
