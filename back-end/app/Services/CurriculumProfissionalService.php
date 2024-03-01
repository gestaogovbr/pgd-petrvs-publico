<?php

namespace App\Services;

use App\Models\CurriculumProfissional;
use App\Services\ServiceBase;
use App\Models\Cidade;
use App\Models\Curriculum;
use App\Models\Curso;

class CurriculumProfissionalService extends ServiceBase
{

  public function proxyQuery($query, &$data)
  {
    $where = [];
    $usuarios_filtrados = [];
    foreach ($data['where'] as $condition) {
      if (is_array($condition) && $condition[0] == 'uf') {
        $curriculums_filtrados = Curriculum::select('id')->whereRelation('cidade', 'uf', $condition[2])->get()->toArray();
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'cidade_id') {
        $curriculums_filtrados = Curriculum::select('id')->where('cidade_id', $condition[2])->get()->toArray();
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'estado_civil') {
        $curriculums_filtrados = Curriculum::select('id')->where('estado_civil', $condition[2])->get()->toArray();
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'filhos') {
        $tem_filhos = $condition[2];
        $curriculums_filtrados = [];
        if ($tem_filhos) {
          $curriculums_filtrados = Curriculum::select('id')->where('quantidade_filhos', '>', 0)->get()->toArray();
        } else {
          $curriculums_filtrados = Curriculum::select('id')->where('quantidade_filhos', 0)->get()->toArray();
        }
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'idioma') {
        $curriculums_filtrados = Curriculum::select('id')->where('idiomas', $condition[2])->get()->toArray();
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'area_conhecimento_id') {
        $cursos_filtrados = Curso::select('id')->where('area_id', $condition[2])->get()->toArray();
        $curriculums_filtrados = Curriculum::select('id')->whereRelation('graduacoes', fn($q) => $q->whereIn('curso_id', $cursos_filtrados))->get()->toArray();
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'curso_id') {
        $curriculums_filtrados = Curriculum::select('id')->where('idiomas', $condition[2])->get()->toArray();
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'titulo_id') {
        $curriculums_filtrados = Curriculum::select('id')->where('idiomas', $condition[2])->get()->toArray();
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'grupo_especializado_id') {
        $curriculums_filtrados = Curriculum::select('id')->where('idiomas', $condition[2])->get()->toArray();
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'funcao_id') {
        $curriculums_filtrados = Curriculum::select('id')->where('idiomas', $condition[2])->get()->toArray();
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'area_tematica_id') {
        $curriculums_filtrados = Curriculum::select('id')->where('idiomas', $condition[2])->get()->toArray();
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'capacidade_tecnica_id') {
        $curriculums_filtrados = Curriculum::select('id')->where('idiomas', $condition[2])->get()->toArray();
        array_push($where, ['curriculum_id', 'in', $curriculums_filtrados]);
      } else {
        array_push($where, $condition);
      }
    }
    $data['where'] = $where;
    return $data;
  }
}
