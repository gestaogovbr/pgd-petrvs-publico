<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProjetosAlocacoesTableAddEnvolvido extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projetos_alocacoes', function (Blueprint $table) {
            $table->tinyInteger('envolvido')->comment("Se a alocação HUMANO ou DEPARTAMENTAL representa um stakeholder");
            $table->dropForeign(['regra_id']);
            $table->dropColumn('regra_id');
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
            $table->foreignUuid('regra_id')->nullable()->constrained("projetos_regras")->onDelete('restrict')->onUpdate('cascade');            
            $table->dropColumn('envolvido');
        });
    }
}
