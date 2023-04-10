<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosEntregasProcessosTableAddContraint extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planos_entregas_processos', function (Blueprint $table) {
            $table->foreignUuid('plano_entrega_entrega_id')->constrained("planos_entregas_entregas")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planos_entregas_processos', function (Blueprint $table) {
            $table->dropForeign(['plano_entrega_entrega_id']);
            $table->dropColumn('plano_entrega_entrega_id');
        });
    }
}
