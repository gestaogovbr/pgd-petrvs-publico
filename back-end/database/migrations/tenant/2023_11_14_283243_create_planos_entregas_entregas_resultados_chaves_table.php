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
        Schema::create('planos_entregas_entregas_resultados_chaves', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->uuid('okr_objetivo_resultado_chave_id')->comment("Resultado chave do OKR");
            $table->uuid('entrega_id')->comment("Entrega do Plano de Entregas à qual está vinculado");
            // Chaves estrangeiras:
            $table->foreign('okr_objetivo_resultado_chave_id', 'fk_plan_entr_entr_okr_id_resultado_chave')
                ->references('id')
                ->on('okrs_objetivos_resultados_chaves')
                ->constrained('okrs_objetivos_resultados_chaves')
                ->onDelete('restrict')
                ->onUpdate('cascade');
            $table->foreign('entrega_id', 'fk_plan_ent_ent_id_plan_entr_entr_okr_id')
                ->references('id')
                ->on('planos_entregas_entregas')
                ->constrained('planos_entregas_entregas')
                ->onDelete('restrict')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos_entregas_entregas_resultados_chaves');
    }
};