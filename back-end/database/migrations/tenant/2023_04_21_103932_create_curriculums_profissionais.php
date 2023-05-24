<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurriculumsProfissionais extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('curriculums_profissionais', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            
            //$table->tinytext('titulo')->comment("Titulo do curso, Graduacão, Pós, Mestrado, etc");
            $table->string('ano_ingresso')->default('')->comment("Ano de ingresso na PRF");
            $table->string('centro_treinamento')->default('')->comment("Centro de treinamento");
            $table->string('cargo')->default('')->comment("Cargo Exercido");
            $table->string('funcoes')->default('')->comment("Funções exercidas na PRF");
            $table->string('grupo_especializado')->default('')->comment("Grupo Especializado ao qual faz parte na PRF");
            $table->json('unidades_lotado')->nullable()->comment("Unidades que ja foi lotado na PRF");
            $table->string('lotacao_atual')->default('')->comment("Lotação atual na PRF");
           
            // Chaves estrangeiras:
            $table->foreignUuid('curriculum_id')->constrained("curriculums")->onDelete('restrict')->onUpdate('cascade');
            //$table->foreignUuid('area_conhecimento_id')->constrained("areas_conhecimentos")->onDelete('restrict')->onUpdate('cascade');
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
        Schema::dropIfExists('curriculums_profissionais');
    }
}
