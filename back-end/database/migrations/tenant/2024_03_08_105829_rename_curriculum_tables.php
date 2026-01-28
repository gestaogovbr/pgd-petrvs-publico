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
        Schema::rename('historicos_lotacoes_curriculum','historicos_lotacoes');
        Schema::rename('historicos_funcoes_curriculum','historicos_funcoes');
        Schema::rename('historicos_docencias_internas_curriculum','historicos_docencias_internas');
        Schema::rename('historicos_docencias_externas_curriculum','historicos_docencias_externas');
        Schema::rename('historicos_cursos_internos_curriculum','historicos_cursos_internos');
        Schema::rename('historicos_cursos_externos_curriculum','historicos_cursos_externos');
        Schema::rename('historicos_atividades_internas_curriculum','historicos_atividades_internas');
        Schema::rename('atividades_externas_curriculum','historicos_atividades_externas');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::rename('historicos_lotacoes', 'historicos_lotacoes_curriculum');
      Schema::rename('historicos_funcoes', 'historicos_funcoes_curriculum');
      Schema::rename('historicos_docencias_internas', 'historicos_docencias_internas_curriculum');
      Schema::rename('historicos_docencias_externas', 'historicos_docencias_externas_curriculum');
      Schema::rename('historicos_cursos_internos', 'historicos_cursos_internos_curriculum');
      Schema::rename('historicos_cursos_externos', 'historicos_cursos_externos_curriculum');
      Schema::rename('historicos_atividades_internas', 'historicos_atividades_internas_curriculum');
      Schema::rename('historicos_atividades_externas', 'atividades_externas_curriculum');
    }
};
