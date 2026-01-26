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
        Schema::create('historicos_funcoes_curriculum', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->uuid('curriculum_profissional_id');
            $table->uuid('funcao_id');
            // Chaves estrangeiras:
            $table->foreign('curriculum_profissional_id', 'fk_hist_func_id_curriculum_prof_id')->references('id')->on('curriculums_profissionais')->onDelete('restrict')->onUpdate('cascade')->comment("FK Curriculum Profissional ID");
            $table->foreign('funcao_id', 'fk_hist_func_id_funcao_id')->references('id')->on('funcoes')->onDelete('restrict')->onUpdate('cascade')->comment("FK Funcoes ID");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historicos_funcoes_curriculum');
    }
};
