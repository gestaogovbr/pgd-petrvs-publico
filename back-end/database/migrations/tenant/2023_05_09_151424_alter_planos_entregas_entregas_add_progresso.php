<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosEntregasEntregasAddProgresso extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planos_entregas_entregas', function (Blueprint $table) {
            $table->decimal('progresso_esperado', 5, 2)->nullable()->default(0)->comment("Percentual de progresso do Plano de Entregas esperado");
            $table->decimal('progresso_realizado', 5, 2)->nullable()->default(0)->comment("Percentual de progresso do Plano de Entregas realizado");
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('Demandante da entrega');
            $table->string('destinatario')->nullable()->comment("Destinatário da entrega");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planos_entregas_entregas', function (Blueprint $table) {
            $table->dropColumn('progresso_esperado');
            $table->dropColumn('progresso_realizado');
            $table->dropColumn('cliente');
            $table->dropColumn('destinatario');
            $table->dropForeign('unidade_id');
        });
    }
}
