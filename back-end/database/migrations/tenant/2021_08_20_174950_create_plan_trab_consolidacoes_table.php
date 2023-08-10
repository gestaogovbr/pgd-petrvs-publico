<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanTrabConsolidacoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_trab_consolidacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->date('data_inicio')->comment("Data inicial da consolidacão");
            $table->date('data_fim')->comment("Data final da consolidação");
            // Chaves estrangeiras:
            $table->foreignUuid('plano_trabalho_id')->constrained("planos_trabalhos")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de Trabalho ao qual se refere a consolidação");
            //$table->foreignUuid('status_id')->constrained("status")->onDelete('restrict')->onUpdate('cascade')->comment("Status da consolidacao"); //Será criado na tabela de status
            // $table->foreignUuid('avaliacao_id')->nullable()->constrained("avaliacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Usuário que realizou a avaliação da consolidação");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plan_trab_consolidacoes');
    }
}
