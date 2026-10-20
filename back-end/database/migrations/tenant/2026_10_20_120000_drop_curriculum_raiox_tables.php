<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $codigos = [
            'MENU_RX_CURRICULUM_ACESSO',
            'MENU_RX_OPORTUNIDADES_ACESSO',
            'MENU_RX_PESQUISAS_ACESSO',
            'MENU_RX_QUEST_DINAMICOS_ACESSO',
            'MENU_RX_CADASTROS_ACESSO',
        ];

        if (Schema::hasTable('tipos_capacidades')) {
            $ids = DB::table('tipos_capacidades')->whereIn('codigo', $codigos)->pluck('id');
            if ($ids->isNotEmpty() && Schema::hasTable('capacidades')) {
                DB::table('capacidades')->whereIn('tipo_capacidade_id', $ids)->delete();
            }
            DB::table('tipos_capacidades')->whereIn('codigo', $codigos)->delete();
        }

        Schema::disableForeignKeyConstraints();
        foreach ([
            'questionarios_perguntas_respostas',
            'questionarios_preenchimentos',
            'questionarios_perguntas',
            'questionarios',
            'historicos_atividades_externas',
            'historicos_atividades_internas',
            'historicos_cursos_externos',
            'historicos_cursos_internos',
            'historicos_docencias_externas',
            'historicos_docencias_internas',
            'historicos_funcoes',
            'historicos_lotacoes',
            'curriculuns_graduacoes',
            'curriculuns_profissionais',
            'curriculuns',
            'disciplinas',
            'cursos',
            'tipos_cursos',
            'areas_conhecimentos',
            'areas_atividades_externas',
            'capacidades_tecnicas',
            'areas_tematicas',
            'cargos',
            'centros_treinamentos',
            'funcoes',
            'grupos_especializados',
        ] as $table) {
            Schema::dropIfExists($table);
        }
        Schema::enableForeignKeyConstraints();
    }

    public function down(): void
    {
    }
};
