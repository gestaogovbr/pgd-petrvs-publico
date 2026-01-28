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
        Schema::create('curriculums_profissionais', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->tinyInteger('ano_ingresso')->default(0)->comment("Ano de ingresso");
            $table->string('lotacao_atual')->nullable()->comment("Lotação atual");
            $table->json('especifique_habilidades')->nullable()->comment("Especifique suas habilidades: (Ex: Desenvolvo em JavaScript)");
            $table->tinyInteger('viagem_nacional')->default(0)->comment("Já fez viagem nacional a trabalho");
            $table->tinyInteger('viagem_internacional')->default(0)->comment("Já fez viagem internacional a trabalho");
            $table->tinyInteger('interesse_bnt')->default(0)->comment("Você tem interesse na participação do Banco Nacional de Talentos");
            $table->string('pgd_inserido')->nullable()->comment("Você está inserido no programa de gestão da Instituição");
            $table->string('pgd_interesse')->nullable()->comment("Você tem interesse em participar do programa de gestão da Instituição");
            $table->string('telefone',64)->nullable()->comment("Telefone do chefe imediato");
            $table->tinyInteger('remocao')->default(0)->comment("Você tem interesse em remoção");
            // Chaves estrangeiras:
            $table->foreignUuid('curriculum_id')->constrained("curriculums")->onDelete('restrict')->onUpdate('cascade')->comment("FK Curriculum ID");
            $table->foreignUuid('centro_treinamento_id')->constrained("centros_treinamentos")->onDelete('restrict')->onUpdate('cascade')->comment("FK Centro de Treinamento ID");
            $table->foreignUuid('cargo_id')->constrained("cargos")->onDelete('restrict')->onUpdate('cascade')->comment("FK Cargos");
            $table->foreignUuid('grupo_especializado_id')->constrained("grupos_especializados")->onDelete('restrict')->onUpdate('cascade')->comment("FK Grupo Especializado ID");
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
};
