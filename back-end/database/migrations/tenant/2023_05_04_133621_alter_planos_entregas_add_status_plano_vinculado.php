<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosEntregasAddStatusPlanoVinculado extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->enum('status', ['INCLUINDO', 'HOMOLOGANDO', 'ATIVO', 'CONCLUIDO', 'AVALIADO', 'SUSPENSO'])->comment("Status do plano de entrega");
            $table->foreignUuid('plano_entrega_id')->nullable()->constrained("planos_entregas")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropForeign(['plano_entrega_id']);
            $table->dropColumn('plano_entrega_id');
        });
        Schema::enableForeignKeyConstraints();
    }
}
