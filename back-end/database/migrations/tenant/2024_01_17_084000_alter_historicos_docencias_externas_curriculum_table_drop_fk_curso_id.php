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
        //DB::statement('ALTER TABLE curriculums_profissionais CHANGE ano_ingresso integer null;');
        Schema::table('historicos_docencias_externas_curriculum', function (Blueprint $table) {
            $table->dropForeign('fk_hist_docen_ext_id_curso_id');
            $table->dropColumn(['curso_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('historicos_docencias_externas_curriculum', function (Blueprint $table) {
            $table->uuid('curso_id');
            // Chaves estrangeiras:
            $table->foreign('curso_id', 'fk_hist_docen_ext_id_curso_id')->references('id')->on('cursos')->onDelete('restrict')->onUpdate('cascade')->comment("FK Curso ID");
        });
    }
};
