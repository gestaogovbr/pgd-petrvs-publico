<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProjetosAlocacoesRemoveEnvolvidos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projetos_alocacoes', function (Blueprint $table) {
            $table->dropColumn('envolvido');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projetos_alocacoes', function (Blueprint $table) {
            $table->tinyInteger('envolvido')->default(0)->comment("Se a alocação HUMANO ou DEPARTAMENTAL representa um stakeholder");
        });
    }
}
