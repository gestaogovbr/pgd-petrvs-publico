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
        Schema::create('planos_trabalhos_consolidacoes_ocorrencias', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicial da consolidacão");
            $table->dateTime('data_fim')->comment("Data final da consolidação");
            $table->text('descricao')->comment("Descrição da ocorrência");
            $table->uuid('plano_trabalho_consolidacao_id')->comment("Consolidação do Plano de Trabalho à qual está associada esta entrega");
            // Chaves estrangeiras:
            $table->foreign('plano_trabalho_consolidacao_id', 'fk_plan_trab_cons_id_plan_trab_cons_ocor_id')->references('id')->on("planos_trabalhos_consolidacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Consolidação do Plano de Trabalho à qual está associada esta entrega");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos_trabalhos_consolidacoes_ocorrencias');
    }
};
