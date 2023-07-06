<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoricoDocenciasExternasCurriculumTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historicos_docencias_externas_curriculum', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            
            $table->uuid('curriculum_profissional_id');
            $table->uuid('curso_id');
            $table->uuid('area_atividade_externa_id');

            // Chaves estrangeiras:
            $table->foreign('curriculum_profissional_id', 'fk_hist_docen_ext_id_curriculum_prof_id')->references('id')->on('curriculums_profissionais')->onDelete('restrict')->onUpdate('cascade');
            $table->foreign('curso_id', 'fk_hist_docen_ext_id_curso_id')->references('id')->on('cursos')->onDelete('restrict')->onUpdate('cascade');
            $table->foreign('area_atividade_externa_id', 'fk_hist_docen_ext_id_area_ativ_ext_id')->references('id')->on('areas_atividades_externas')->onDelete('restrict')->onUpdate('cascade');
         

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historicos_docencias_externas_curriculum');
    }
}
