<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanTrabConsolidOcorrTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_trab_consolid_ocorr', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicial da consolidacão");
            $table->dateTime('data_fim')->comment("Data final da consolidação");
            $table->text('descricao')->comment("Descrição da ocorrência");
            // Chaves estrangeiras:
            $table->foreignUuid('plano_trabalho_consolidacao_id')->constrained("plan_trab_consolidacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Consolidação do Plano de Trabalho à qual está associada esta entrega");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plan_trab_consolid_ocorr');
    }
}
