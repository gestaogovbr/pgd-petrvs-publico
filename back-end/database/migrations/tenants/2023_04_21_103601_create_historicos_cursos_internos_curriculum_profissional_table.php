<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoricoCursosInternosCurriculumProfissionalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historicos_cursos_internos_curriculum_profissional', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();

            $table->tinyInteger('pretensao')->default(0)->comment("Pretende ou não fazer o curso");

            // Chaves estrangeiras:
            $table->foreignUuid('curriculum_profissional_id')->constrained("curriculums_profissionais")->onDelete('restrict')->onUpdate('cascade');
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
        Schema::dropIfExists('historicos_cursos_internos_curriculum_profissional');
    }
}
