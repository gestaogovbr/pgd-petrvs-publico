<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoricoLotacoesCurriculumTable extends Migration
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
            $table->uuid('curriculum_profissional_id');
            $table->uuid('unidade_id');

            // Chaves estrangeiras:
            $table->foreign('curriculum_profissional_id', 'fk_hist_lot_id_curriculum_prof_id')->references('id')->on('curriculums_profissionais')->onDelete('restrict')->onUpdate('cascade');
            $table->foreign('unidade_id', 'fk_hist_lot_id_unidade_id')->references('id')->on('unidades')->onDelete('restrict')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('historicos_funcoes_curriculum');
        Schema::enableForeignKeyConstraints();
    }
}
