<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurriculumsGraduacoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('curriculums_graduacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            
            $table->tinytext('titulo')->comment("Titulo do curso, Graduacão, Pós, Mestrado, etc");
            $table->tinyInteger('pretencao')->default(0)->comment("Pretende fazer o curso");
           
            // Chaves estrangeiras:
            $table->foreignUuid('curriculum_id')->constrained("curriculums")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('area_conhecimento_id')->constrained("areas_conhecimentos")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('curso_id')->constrained("cursos")->onDelete('restrict')->onUpdate('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('curriculums_graduacoes');
    }
}
