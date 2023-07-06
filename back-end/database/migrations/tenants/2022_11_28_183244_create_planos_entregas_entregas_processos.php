<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosEntregasEntregasProcessos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_entregas_entregas_processos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            // Chaves estrangeiras:
            $table->foreignUuid('processo_id')->constrained("cadeias_valores_processos")->onDelete('restrict')->onUpdate('cascade')->comment("Processo da Cadeia de Valores ao qual está vinculado este processo");
            $table->foreignUuid('plano_entrega_entrega_id')->constrained("planos_entregas_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Entrega do Plano de Entregas à qual está vinculado este processo");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos_entregas_entregas_processos');
    }
}
