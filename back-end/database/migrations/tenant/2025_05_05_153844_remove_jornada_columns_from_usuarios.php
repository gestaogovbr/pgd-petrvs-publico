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
        Schema::table('usuarios', function (Blueprint $table) {
            if (Schema::hasColumn('usuarios', 'nome_jornada')) {
                $table->dropColumn('nome_jornada');
            }
            if (Schema::hasColumn('usuarios', 'cod_jornada')) {
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
        Schema::table('usuarios', function (Blueprint $table) {
            $table->string('nome_jornada', 100)->nullable(); 
            $table->integer('cod_jornada')->nullable(); 
        });
    }
};