<?php

namespace App\Services;

use App\Models\Curriculum;
use App\Models\Unidade;
use App\Models\Funcao;
use App\Models\Cargo;
use App\Models\CentroTreinamento;
use App\Models\CurriculumProfissional;
use App\Models\GrupoEspecializado;
use App\Services\ServiceBase;
use App\Models\Curso;
use App\Models\HistoricoFuncao;
use App\Models\HistoricoAtividadeInterna;
use App\Models\QuestionarioPergunta;
use App\Models\QuestionarioPerguntaResposta;
use App\Models\QuestionarioPreenchimento;

class CurriculumService extends ServiceBase
{

  public function lookupsCurriculum(): array
  {
    $unidades = Unidade::all()->map(fn ($u) => ["key" => $u->id, "value" => $u->sigla])->toArray();
    $funcoes = Funcao::all()->map(fn ($u) => ["key" => $u->id, "value" => $u->nome])->toArray();
    $grupos = GrupoEspecializado::all()->map(fn ($u) => ["key" => $u->id, "value" => $u->nome])->toArray();
    $ct = CentroTreinamento::all()->map(fn ($u) => ["key" => $u->id, "value" => $u->nome])->toArray();
    $cargos = Cargo::all()->map(fn ($u) => ["key" => $u->id, "value" => $u->nome])->toArray();
    return ["unidades" => $unidades, "funcoes" => $funcoes, "grupos" => $grupos, "ct" => $ct, "cargos" => $cargos];
  }

  public function proxyStore($data, $unidade, $action)
  {
    if ($action == ServiceBase::ACTION_INSERT) {
    }
    foreach ($data["graduacoes"] as $graduacao) {
    }
    return $data;
  }

  public function proxyQuery($query, &$data)
  {
    $where = [];
    foreach ($data['where'] as $condition) {
      if (is_array($condition) && $condition[0] == 'uf') {
        $curriculums_filtrados = Curriculum::select('id')->whereRelation('cidade', 'uf', $condition[2])->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'cidade_id') {
        $curriculums_filtrados = Curriculum::select('id')->where('cidade_id', $condition[2])->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'estado_civil') {
        $curriculums_filtrados = Curriculum::select('id')->where('estado_civil', $condition[2])->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'filhos') {
        $tem_filhos = $condition[2];
        $curriculums_filtrados = [];
        if ($tem_filhos) {
          $curriculums_filtrados = Curriculum::select('id')->where('quantidade_filhos', '>', 0)->get()->toArray();
        } else {
          $curriculums_filtrados = Curriculum::select('id')->where('quantidade_filhos', 0)->get()->toArray();
        }
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'idioma') {
        $curriculums_filtrados = Curriculum::select('id')->whereRaw("JSON_SEARCH(idiomas, 'one', '" . $condition[2] . "', null, '$[*].idioma')")->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'area_conhecimento_id') {
        $cursos_filtrados = Curso::select('id')->where('area_id', $condition[2])->get()->toArray();
        $curriculums_filtrados = Curriculum::select('id')->whereRelation('graduacoes', fn ($q) => $q->whereIn('curso_id', $cursos_filtrados))->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'curso_id') {
        $curriculums_filtrados = Curriculum::select('id')->whereRelation('graduacoes', 'curso_id', $condition[2])->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'grupo_especializado_id') {
        $grupos_filtrados = GrupoEspecializado::select('id')->where('id', $condition[2])->get()->toArray();
        $curriculums_filtrados = Curriculum::select('id')->whereRelation('curriculum_profissional', fn ($q) => $q->whereIn('grupo_especializado_id', $grupos_filtrados))->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'funcao_id') {
        $funcoes_cv_filtrados = HistoricoFuncao::select('curriculum_profissional_id')->where('funcao_id', $condition[2])->get()->toArray();
        $curriculums_filtrados = Curriculum::select('id')->whereRelation('curriculum_profissional', fn ($q) => $q->whereIn('id', $funcoes_cv_filtrados))->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'area_tematica_id') {
        $historicos_filtrados = HistoricoAtividadeInterna::select('id')->whereRelation('capacidadeTecnica', 'area_tematica_id', $condition[2])->get()->toArray();
        $curriculums_filtrados = CurriculumProfissional::select('curriculum_id')->whereRelation('historicosAtividadesInternas', fn ($q) => $q->whereIn('id', $historicos_filtrados))->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'capacidade_tecnica_id') {
        $historicos_filtrados = HistoricoAtividadeInterna::select('id')->where('capacidade_tecnica_id', $condition[2])->get()->toArray();
        $curriculums_filtrados = CurriculumProfissional::select('curriculum_id')->whereRelation('historicosAtividadesInternas', fn ($q) => $q->whereIn('id', $historicos_filtrados))->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'soft_id') {
        $pergunta_filtrada = QuestionarioPergunta::select('id')->where('pergunta', $condition[2])->get()->toArray();
        $resposta_filtrada = QuestionarioPerguntaResposta::select('questionario_preenchimento_id')->whereIn('questionario_pergunta_id', $pergunta_filtrada)->where('resposta', '>=', $condition[3])->get()->toArray();
        $usuario_filtrado = QuestionarioPreenchimento::select('usuario_id')->whereIn('id', $resposta_filtrada)->get()->toArray();
        $curriculums_filtrados = Curriculum::select('id')->whereIn('usuario_id', $usuario_filtrado)->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'interesse_pgd') {
        $curriculums_filtrados = CurriculumProfissional::select('curriculum_id')->where('pgd_interesse', $condition[2])->get()->toArray();
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'interesse_bnt') {
        $tem_interesse = $condition[2];
        $curriculums_filtrados = [];
        if ($tem_interesse) {
          $curriculums_filtrados = CurriculumProfissional::select('curriculum_id')->where('interesse_bnt', 1)->get()->toArray();
        } else {
          $curriculums_filtrados = CurriculumProfissional::select('curriculum_id')->where('interesse_bnt', 0)->get()->toArray();
        }
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else if (is_array($condition) && $condition[0] == 'remocao') {
        $tem_interesse = $condition[2];
        $curriculums_filtrados = [];
        if ($tem_interesse) {
          $curriculums_filtrados = CurriculumProfissional::select('curriculum_id')->where('remocao', 1)->get()->toArray();
        } else {
          $curriculums_filtrados = CurriculumProfissional::select('curriculum_id')->where('remocao', 0)->get()->toArray();
        }
        array_push($where, ['id', 'in', $curriculums_filtrados]);
      } else {
        array_push($where, $condition);
      }
    }
    $data['where'] = $where;
    return $data;
  }

  public function filtroBigFive () {
  
  }
}