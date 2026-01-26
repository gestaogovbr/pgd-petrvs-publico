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
        Schema::create('historicos_lotacoes_curriculum', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->uuid('curriculum_profissional_id');
            $table->uuid('unidade_id');
            // Chaves estrangeiras:
            $table->foreign('curriculum_profissional_id', 'fk_hist_lot_id_curriculum_prof_id')->references('id')->on('curriculums_profissionais')->onDelete('restrict')->onUpdate('cascade')->comment("FK Curriculum Profissional ID");
            $table->foreign('unidade_id', 'fk_hist_lot_id_unidade_id')->references('id')->on('unidades')->onDelete('restrict')->onUpdate('cascade')->comment("FK Unidades ID");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historicos_lotacoes_curriculum');
    }
};
