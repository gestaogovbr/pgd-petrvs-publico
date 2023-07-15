<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnidadesIntegrantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unidades_integrantes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->set("atribuicao", ["AVALIADOR_PLANO_ENTREGA","AVALIADOR_PLANO_TRABALHO","HOMOLOGADOR_PLANO_ENTREGA","LOTADO","COLABORADOR","GESTOR","GESTOR_SUBSTITUTO"])->comment("Vínculo que o servidor tem com a unidade");
            // Chaves estrangeiras:
            $table->foreignUuid('unidade_id')->onDelete('restrict')->onUpdate('cascade')->comment("Unidade participante do vínculo");
            $table->foreignUuid('usuario_id')->onDelete('restrict')->onUpdate('cascade')->comment("Servidor participante do vínculo");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unidades_integrantes');
    }
}
