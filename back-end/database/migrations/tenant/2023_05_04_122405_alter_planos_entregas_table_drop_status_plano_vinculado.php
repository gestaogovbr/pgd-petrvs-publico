<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosEntregasTableDropStatusPlanoVinculado extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropForeign('planos_entregas_plano_entrga_id_foreign');
            $table->dropColumn('plano_entrga_id');
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->enum('status', ['INCLUIDO', 'HOMOLOGANDO', 'ATIVO', 'SUSPENSO', 'CANCELADO'])->comment("Status do projeto");
            $table->foreignUuid('plano_entrga_id')->nullable()->constrained("planos_entregas")->onDelete('restrict')->onUpdate('cascade');
        });
    }
}
