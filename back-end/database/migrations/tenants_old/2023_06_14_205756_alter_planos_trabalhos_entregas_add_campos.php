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
            $table->dropForeign(['entrega_id']);
            $table->dropColumn('entrega_id');
        });
        Schema::table('planos_trabalhos_entregas', function (Blueprint $table) {
            $table->foreignUuid('plano_entrega_entrega_id')->nullable()->constrained("planos_entregas_entregas")->onDelete('restrict')->onUpdate('cascade')->comment('Entrega do Plano de Entregas vinculada a esta entrega do Plano de Trabalho.');
            $table->foreignUuid('entrega_id')->nullable()->constrained("entregas")->onDelete('restrict')->onUpdate('cascade')->comment('Entrega do Cadastro de Entregas vinculada a esta entrega do Plano de Trabalho.');
            $table->string('descricao', 256)->comment("Detalhamento da entrega");
            $table->decimal('forca_trabalho', 5, 2)->default(0)->comment("Percentual da força de trabalho");
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
        Schema::disableForeignKeyConstraints();
        Schema::table('planos_trabalhos_entregas', function (Blueprint $table) {
            $table->dropForeign(['entrega_id']);
            $table->dropForeign(['plano_entrega_entrega_id']);
            $table->dropColumn(['entrega_id','plano_entrega_entrega_id', 'descricao', 'forca_trabalho']);
        });
        Schema::table('planos_trabalhos_entregas', function (Blueprint $table) {
            $table->foreignUuid('entrega_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('');
        });
        Schema::enableForeignKeyConstraints();
    }
}
