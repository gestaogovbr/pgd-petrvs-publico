<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosTrabalhosConsolidacoesAtividadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_trabalhos_consolidacoes_atividades', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->float('esforco')->nullable()->comment("Esforço (tempo) empregado na execução da atividade");
            $table->json('realizado')->nullable()->comment("Valor realizado da meta");
            $table->text('descricao')->comment("Assunto da atividade");
            $table->uuid('plano_trabalho_consolidacao_id')->comment("Consolidação do Plano de Trabalho à qual está associada esta entrega");
            $table->uuid('plano_trabalho_entrega_id')->comment("Entrega do Plano de Trabalho à qual está associada esta entrega");
            $table->uuid('tipo_atividade_id')->nullable()->comment("Tipo de atividade, caso se deseje especificar");
            // Chaves estrangeiras:
            $table->foreign('plano_trabalho_consolidacao_id', 'fk_plan_trab_cons_id_plan_trab_cons_atv_id')->references('id')->on("planos_trabalhos_consolidacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Consolidação do Plano de Trabalho à qual está associada esta entrega");
            $table->foreign('plano_trabalho_entrega_id', 'fk_plan_trab_entrega_id_plan_trab_entrega_id')->references('id')->on("planos_trabalhos_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Entrega do Plano de Trabalho à qual está associada esta entrega");
            $table->foreign('tipo_atividade_id', 'fk_plan_trab_tipo_atv_id_tipo_atv_id')->references('id')->on("tipos_atividades")->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de atividade, caso se deseje especificar");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos_trabalhos_consolidacoes_atividades');
    }
}
