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
            $table->tinyInteger('ano_ingresso')->default(0)->comment("Ano de ingresso");
            $table->json('funcoes')->nullable()->comment("Funções exercidas e que exerce");
            $table->json('unidades_lotado')->nullable()->comment("Unidades que ja foi lotado");
            $table->string('lotacao_atual')->default('')->comment("Lotação atual");
            $table->json('atividades_fora')->nullable()->comment("Quais atividades você desempenhou fora e que podem contribuir para a instituição");
            $table->json('atividades_internas')->nullable()->comment("Quais atividades você desempenhou internamente que podem contribuir para a instituição");
            $table->json('docencia_fora')->nullable()->comment("Você já realizou algum trabalho de docência fora da Instituição");
            $table->json('docencia_interna')->nullable()->comment("Você é docente ou instrutor da Instituição");
            $table->json('curso_fora')->nullable()->comment("Quais cursos você já fez e quais pretende fazer fora da Instituição");
            $table->json('curso_interno')->nullable()->comment("Quais os principais cursos que você já fez e pretende fazer na Instituição");
            $table->tinyInteger('viagem_nacional')->default(0)->comment("Já fez viagem nacional a trabalho");
            $table->tinyInteger('viagem_internacional')->default(0)->comment("Já fez viagem internacional a trabalho");
            $table->tinyInteger('interesse_bnt')->default(0)->comment("Você tem interesse na participação do Banco Nacional de Talentos");
            $table->string('pgd_inserido')->default('')->comment("Você está inserido no programa de gestão da Instituição");
            $table->string('pgd_interesse')->default('')->comment("Você tem interesse em participar do programa de gestão da Instituição");
            $table->string('telefone',64)->nullable()->comment("Telefone do chefe imediato");
            $table->tinyInteger('remocao')->default(0)->comment("Você tem interesse em remoção");
            // Chaves estrangeiras:
            $table->foreignUuid('curriculum_id')->constrained("curriculums")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('centro_treinamento_id')->constrained("centros_treinamentos")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('cargo_id')->constrained("cargos")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('grupo_especializado_id')->constrained("grupos_especializados")->onDelete('restrict')->onUpdate('cascade');
            //$table->foreignUuid('materia_id')->constrained("materias")->onDelete('restrict')->onUpdate('cascade');
            //$table->foreignUuid('curso_id')->constrained("cursos")->onDelete('restrict')->onUpdate('cascade');
           
            
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
