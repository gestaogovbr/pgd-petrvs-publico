<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTiposModalidadesAddExigeAssinaturas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tipos_modalidades', function (Blueprint $table) {
            $table->tinyInteger('exige_assinatura_gestor_unidade')->default(0)->comment("Exigir assinatura do gestor da unidade do plano");
            $table->tinyInteger('exige_assinatura_gestor_entidade')->default(0)->comment("Exigir assinatura do gestor da entidade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tipos_modalidades', function (Blueprint $table) {
            $table->dropColumn('exige_assinatura_gestor_unidade');
            $table->dropColumn('exige_assinatura_gestor_entidade');
        });
    }
}
