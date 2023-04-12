<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProjetosRegrasAddPerfis extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projetos_regras', function (Blueprint $table) {
            $table->json('perfis')->nullable()->comment("Perfis de capacidade aplicáveis a quem possuir a regra");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projetos_regras', function (Blueprint $table) {
            $table->dropColumn('perfis');
        });
    }
}
