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
        Schema::create('historicos_atividades_internas_curriculum', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->uuid('curriculum_profissional_id');
            $table->uuid('capacidade_tecnica_id');
            // Chaves estrangeiras:
            $table->foreign('curriculum_profissional_id', 'fk_hist_ativ_int_id_curriculum_prof_id')->references('id')->on('curriculums_profissionais')->onDelete('restrict')->onUpdate('cascade')->comment("FK Curriculum Profissional ID");
            $table->foreign('capacidade_tecnica_id', 'fk_capac_tec_id_curriculum_prof_id')->references('id')->on('capacidades_tecnicas')->onDelete('restrict')->onUpdate('cascade')->comment("Nome do curso")->comment("FK Capacidade Tecnica ID");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historicos_atividades_internas_curriculum');
    }
};
