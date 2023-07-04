<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoricosAtividadesInternasCurriculumProfissionalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historicos_atividades_internas_curriculum_profissional', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();

            // Chaves estrangeiras:
            $table->foreignUuid('curriculum_profissional_id')->constrained("curriculums_profissionais")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('capacidade_tecnica_id')->constrained("capacidades_tecnicas")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historicos_atividades_internas_curriculum_profissional');
    }
}
