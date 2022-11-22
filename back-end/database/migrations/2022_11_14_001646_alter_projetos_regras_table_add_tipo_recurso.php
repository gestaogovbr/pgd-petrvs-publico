<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProjetosRegrasTableAddTipoRecurso extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projetos_regras', function (Blueprint $table) {
            $table->enum('tipo_recurso', ['HUMANO', 'MATERIAL', 'SERVICO', 'CUSTO', 'DEPARTAMENTO'])->default("MATERIAL")->comment('Tipo do recurso que se aplica a regra');
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
            $table->dropColumn('tipo_recurso');
        });
    }
}