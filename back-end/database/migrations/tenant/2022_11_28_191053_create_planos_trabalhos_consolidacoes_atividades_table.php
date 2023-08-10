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
            // Chaves estrangeiras:
            $table->foreignUuid('plano_trabalho_consolidacao_id')->constrained("planos_trabalhos_consolidacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Consolidação do Plano de Trabalho à qual está associada esta entrega");
            $table->foreignUuid('plano_trabalho_entrega_id')->constrained("planos_trabalhos_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Entrega do Plano de Trabalho à qual está associada esta entrega");
            $table->foreignUuid('tipo_atividade_id')->nullable()->constrained("tipos_atividades")->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de atividade, caso se deseje especificar");
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
