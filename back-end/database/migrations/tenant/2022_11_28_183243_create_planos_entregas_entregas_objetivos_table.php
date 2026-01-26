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
        Schema::create('planos_entregas_entregas_objetivos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();

            $table->uuid('planejamento_objetivo_id')
                ->comment("Objetivo do Planejamento institucional ao qual está vinculado este objetivo");
            $table->uuid('entrega_id')
                ->comment("Entrega do Plano de Entregas à qual está vinculado este objetivo");

            // Campos:
            // Chaves estrangeiras:
            $table->foreign('planejamento_objetivo_id', 'fk_plan_entr_entr_obj_id_planej_obj_id')
                ->references('id')
                ->on('planejamentos_objetivos')
                ->constrained('planejamentos_objetivos')
                ->onDelete('restrict')
                ->onUpdate('cascade')
                ->comment('Objetivo do Planejamento institucional ao qual está vinculado este objetivo');
            
            $table->foreign('entrega_id', 'fk_plan_ent_ent_id_plan_entr_entr_obj_id')
                ->references('id')
                ->on('planos_entregas_entregas')
                ->constrained('planos_entregas_entregas')
                ->onDelete('restrict')
                ->onUpdate('cascade')
                ->comment('Entrega do Plano de Entregas à qual está vinculado este objetivo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos_entregas_entregas_objetivos');
    }
};
