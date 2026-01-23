<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unidades_integrantes_atribuicoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->set("atribuicao", ["AVALIADOR_PLANO_ENTREGA","AVALIADOR_PLANO_TRABALHO","HOMOLOGADOR_PLANO_ENTREGA","COLABORADOR","GESTOR","GESTOR_SUBSTITUTO","GESTOR_DELEGADO","LOTADO"])->comment("Vínculo que o servidor tem com a unidade");
            // Chaves estrangeiras:
            $table->foreignUuid('unidade_integrante_id')->constrained("unidades_integrantes")->onDelete('restrict')->onUpdate('cascade')->comment("Vínculo entre unidade/usuário ao qual se refere a atribuição");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unidades_integrantes_atribuicoes');
    }
};
