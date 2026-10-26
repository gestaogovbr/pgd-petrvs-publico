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
        Schema::create('planos_trabalhos_consolidacoes_contribuicoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('orgao', 256)->nullable()->comment("Órgão externo (quando vinculada a entrega de outro órgão)");
            $table->text('descricao')->nullable()->comment("Trabalho executado registrado neste período");
            $table->decimal('esforco_executado', 5, 2)->default(0)->comment("Percentual de CHD executado nesta contribuição no período");
            $table->dateTime('registrado_at')->nullable()->comment("Momento do primeiro registro de execução; null indica contribuição ainda não registrada");
            // Chaves estrangeiras:
            $table->uuid('plano_trabalho_consolidacao_id')->comment("Período avaliativo ao qual pertence a contribuição de execução");
            $table->uuid('plano_trabalho_entrega_id')->nullable()->comment("Entrega do planejamento que originou esta contribuição (rastro de origem)");
            $table->uuid('plano_entrega_entrega_id')->nullable()->comment("Entrega do Plano de Entregas vinculada a esta contribuição");

            $table->foreign('plano_trabalho_consolidacao_id', 'fk_ptcc_consolidacao_id')
                ->references('id')->on('planos_trabalhos_consolidacoes')->onDelete('restrict')->onUpdate('cascade');
            $table->foreign('plano_trabalho_entrega_id', 'fk_ptcc_entrega_id')
                ->references('id')->on('planos_trabalhos_entregas')->onDelete('restrict')->onUpdate('cascade');
            $table->foreign('plano_entrega_entrega_id', 'fk_ptcc_plano_entrega_entrega_id')
                ->references('id')->on('planos_entregas_entregas')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos_trabalhos_consolidacoes_contribuicoes');
    }
};
