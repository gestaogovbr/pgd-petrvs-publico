<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosTrabalhosEntregasAddCampos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table('planos_trabalhos_entregas', function (Blueprint $table) {
            //$table->foreignUuid('plano_entrega_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('Programa de gestão vinculado ao Plano de Entregas');
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
        //
    }
}
