<?php

namespace App\Services;

use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\Afastamento;
use App\Services\ServiceBase;
use App\Services\CalendarioService;
use App\Services\UtilService;
use App\Exceptions\ServerException;
use App\Models\Documento;
use Illuminate\Support\Facades\DB;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Programa;
use Carbon\Carbon;
use DateTime;
use Throwable;
use Illuminate\Database\Eloquent\Collection;

class PlanoTrabalhoService extends ServiceBase
{
  public $documentoId;

  /**
   * Retorna todos os Planos de Trabalho de um determinado usuário, que ainda se encontram dentro da vigência
   *
   * @param   string  $usuario_id
   * @return  Illuminate\Database\Eloquent\Collection      
   */
  public function planosAtivos($usuario_id): Collection
  {
    return PlanoTrabalho::where("usuario_id", $usuario_id)->where("data_inicio", "<=", now())->where("data_fim", ">=", now())->get();
    // adicionar no gitlab para considerar o fuso horário
  }

  /**
   * Retorna um array com todos os Planos de Trabalho de um determinado Usuário, cuja vigência encontra-se dentro do período estabelecido.
   * 
   * @param   string $data_inicial  Data inicial do período.
   * @param   string $data_final    Data final do período.
   * @param   string $usuario_id    O ID do Usuário.
   * @return  Illuminate\Database\Eloquent\Collection
   */
  public function planosAtivosPorData($data_inicial, $data_final, $usuario_id): Collection
  {
    return PlanoTrabalho::where("usuario_id", $usuario_id)
      ->where("data_inicio", "<=", $data_final)
      ->where("data_fim", ">=", $data_inicial)->get();
  }

  public function proxyQuery($query, &$data)
  {
    $where = [];
    foreach ($data["where"] as $condition) {
      if (is_array($condition) && $condition[0] == "data_filtro") {
        $dataInicio = $this->getFilterValue($data["where"], "data_filtro_inicio");
        $dataFim = $this->getFilterValue($data["where"], "data_filtro_fim");
        switch ($condition[2]) {
          case "VIGENTE":
            $where[] = ["data_inicio", "<=", $dataFim];
            $where[] = ["data_fim", ">=", $dataInicio];
            break;
          case "NAOVIGENTE":;
            $where[] = ["OR", ["data_inicio", ">", $dataFim], ["data_fim", "<", $dataInicio]];
            break;
          case "INICIAM":;
            $where[] = ["data_inicio", ">=", $dataInicio];
            $where[] = ["data_inicio", "<=", $dataFim];
            break;
          case "FINALIZAM":;
            $where[] = ["data_fim", ">=", $dataInicio];
            $where[] = ["data_fim", "<=", $dataFim];
            break;
        }
      } else if (!(is_array($condition) && in_array($condition[0], ["data_filtro_inicio", "data_filtro_fim"]))) {
        array_push($where, $condition);
      }
    }
    $data["where"] = $where;
  }

  public function proxyStore($plano, $unidade, $action)
  {
    $plano["criacao_usuario_id"] = parent::loggedUser()->id;
    $this->documentoId = $plano["documento_id"];
    $plano["documento_id"] = null;
    return $plano;
  }

  public function afterStore($planoTrabalho, $action)
  {
    // (RN_PTR_A) Quando um Plano de Trabalho é criado adquire automaticamente o status INCLUIDO;
    if ($action == ServiceBase::ACTION_INSERT) $this->status->atualizaStatus($planoTrabalho, 'INCLUIDO', 'O Plano de Trabalho foi criado nesta data.');
  }

  public function validateStore($data, $unidade, $action)
  {
    $unidade_id = $data["unidade_id"];
    $usuario = Usuario::with("areasTrabalho")->find($data["usuario_id"]);
    $criador = Usuario::with("areasTrabalho")->find(parent::loggedUser()->id);
    $usuario_lotacoes_ids = $usuario->areasTrabalho->map(function ($item, $key) {
      return $item->unidade_id;
    })->all();
    $criador_lotacoes_ids = $criador->areasTrabalho->map(function ($item, $key) {
      return $item->unidade_id;
    })->all();
    if (!count(array_intersect($usuario_lotacoes_ids, $criador_lotacoes_ids)) && !parent::loggedUser()->hasPermissionTo('MOD_PTR_USERS_INCL')) {
      throw new ServerException("ValidatePlanoTrabalho", "Usuário do plano fora das lotações de quem está lançando o plano (MOD_PTR_USERS_INCL)");
    }
    if (!in_array($unidade_id, $usuario_lotacoes_ids) && !parent::loggedUser()->hasPermissionTo('MOD_PTR_INCL_SEM_LOT')) {
      throw new ServerException("ValidatePlanoTrabalho", "Usuário não lotado na unidade do plano (MOD_PTR_INCL_SEM_LOT)");
    }
    $planos = PlanoTrabalho::where("usuario_id", $data["usuario_id"])->where("usuario_id", $data["unidade_id"])->where("tipo_modalidade_id", $data["tipo_modalidade_id"])->get();
    foreach ($planos as $plano) {
      if (
        UtilService::intersect($plano->data_inicio, $plano->data_fim, $data["data_inicio"], $data["data_fim"]) &&
        UtilService::valueOrNull($data, "id") != $plano->id && !parent::loggedUser()->hasPermissionTo('MOD_PTR_INTSC_DATA')
      ) {
        throw new ServerException("ValidatePlanoTrabalho", "O plano de trabalho #" . $plano->numero . " (" . UtilService::getDateTimeFormatted($plano->data_inicio) . " à " . UtilService::getDateTimeFormatted($plano->data_fim) . ") possui período conflitante para a mesma modalidade (MOD_PTR_INTSC_DATA)");
      }
    }
    if ($action == ServiceBase::ACTION_EDIT) {
      $plano = PlanoTrabalho::find($data["id"]);
      /*  (RN_PTR_1)
          Após criado um plano de trabalho, o sua unidade e programa não podem mais ser alterados. Em consequência dessa regra, os seguintes campos 
          não poderão mais ser alterados: unidade_id, programa_id;
      */
      if ($data["unidade_id"] != $plano->unidade_id) throw new ServerException("ValidatePlanoTrabalho", "Depois de criado um Plano de Trabalho, não é possível alterar a sua Unidade.");
      if ($data["programa_id"] != $plano->programa_id) throw new ServerException("ValidatePlanoTrabalho", "Depois de criado um Plano de Trabalho, não é possível alterar o seu Programa.");
      /* (RN_CSLD_2) 
          O plano de trabalho somente poderá ser alterado: se a nova data de início não for superior a algum período já CONCLUIDO ou AVALIADO, ou até o limite da primeira ocorrência ou atividade já lançados; 
          e se a nova data de final não for inferior a algum período já CONCLUIDO ou AVALIADO, ou até o limite da última ocorrência ou atividade já lançados;
      */
      $maxInicio = $this->dataFinalMinimaConsolidacao($plano);
      $minFim = $this->dataFinalMinimaConsolidacao($plano);
      $dataInicioVigencia = date("Y-m-d", strtotime($data["data_inicio"])); /* Transforma de datetime para date */
      $dataFimVigencia = date("Y-m-d", strtotime($data["data_fim"])); /* Transforma de datetime para date */
      if (strtotime($dataInicioVigencia) > strtotime($maxInicio)) {
        throw new ServerException("ValidatePlanoTrabalho", "Data de início do plano é maior que a da primeira consolidação avaliada; ou com entregas; ou com ocorrências.");
      }
      if (strtotime($dataFimVigencia) < strtotime($minFim)) {
        throw new ServerException("ValidatePlanoTrabalho", "Data final do plano é menor que a da última consolidação avaliada; ou com entregas; ou com ocorrências");
      }
    }
  }

  public function extraStore($plano, $unidade, $action)
  {
    /* (RN_CSLD_1) Inclui ou atualiza as consolidações com base no período do plano de trabalho */
    $this->atualizaConsolidacoes($plano);
    /* Restaura o documento_id */
    if (!empty($this->documentoId) && !empty(Documento::find($this->documentoId))) {
      $plano->documento_id = $this->documentoId;
      $plano->save();
    }
    /* Adiciona a atribuição de 'COLABORADOR' automaticamente caso o usuário não tenha */
    $usuario_lotacoes_ids = array_map(fn ($u) => $u["unidade_id"], Usuario::find($plano->usuario_id)->areasTrabalho?->toArray() ?? []);
    if (!in_array($plano->unidade_id, $usuario_lotacoes_ids)) {
      $this->unidadeIntegranteAtribuicaoService->store([
        'unidade_integrante_id' => UnidadeIntegrante::firstOrCreate(['unidade_id' => $plano->unidade_id, 'usuario_id' => $plano->usuario_id])->id,
        'atribuicao' => 'COLABORADOR'
      ], $unidade, false);
    }
  }

  /* Será a data_inicio, ou a data_fim do último período CONCLUIDO ou AVALIADO, ou a data_fim da última ocorrência, ou data_inicio do último perído com entregas. O que for maior. */
  public function dataFinalMinimaConsolidacao($plano)
  {
    $result = strtotime($plano->data_inicio);
    // ************ TRECHO COMENTADO TEMPORARIAMENTE (ENQUANTO É CRIADO O RELACIONAMENTO ENTREGAS 'DENTRO' DO MODEL DE PLANOTRABALHOCONSOLIDACAO) **********
    /*     foreach($plano->consolidacoes as $consolidacao) {
      $data = strtotime($consolidacao->status != "INCLUIDO" ? $consolidacao->data_fim : 
        ($consolidacao->ocorrencias()->count() ? $consolidacao->ocorrencias()->max('data_fim') : $result
        ($consolidacao->entregas()->count() ? $consolidacao->data_inicio : $result)));
      $result = max($result, $data);
    } */
    return date('Y-m-d', $result);
  }

  /* Será a data_fim, ou a data_inicio do primeiro período CONCLUIDO ou AVALIADO, ou a data_inicio da primeira ocorrência, ou data_fim do primeiro período com entregas. O que for maior. */
  public function dataInicialMaximaConsolidacao($plano)
  {
    $result = strtotime($plano->data_fim);
    // ************ TRECHO COMENTADO TEMPORARIAMENTE (ENQUANTO É CRIADO O RELACIONAMENTO ENTREGAS 'DENTRO' DO MODEL DE PLANOTRABALHOCONSOLIDACAO) **********
    /*     foreach($plano->consolidacoes as $consolidacao) {
      $data = strtotime($consolidacao->status != "INCLUIDO" ? $consolidacao->data_inicio : 
        ($consolidacao->ocorrencias()->count() ? $consolidacao->ocorrencias()->min('data_inicio') :
        ($consolidacao->entregas()->count() ? $consolidacao->data_fim : $result)));
      $result = min($result, $data);
    } */
    return date('Y-m-d', $result);
  }

  public function proxDataConsolidacao($data, $programa)
  {
    $dayWeek = date('w', strtotime($data));
    $incMonth = 0;
    switch ($programa->periodicidade_consolidacao) {
      case 'DIAS':
        return date("Y-m-d", strtotime($data . " + " . $programa->periodicidade_valor . " days"));
        break;
      case 'SEMANAL':
        return date("Y-m-d", strtotime($data . " + " . ($dayWeek < $programa->periodicidade_valor ? $programa->periodicidade_valor - $dayWeek : 6 - $dayWeek + $programa->periodicidade_valor) . " days"));
        break;
      case 'QUINZENAL':
        return date("Y-m-d", strtotime($data . " + " . ($dayWeek < $programa->periodicidade_valor ? 7 + $programa->periodicidade_valor - $dayWeek : 7 + 6 - $dayWeek + $programa->periodicidade_valor) . " days"));
        break;
      case 'MENSAL':
        $incMonth = 0;
      case 'BIMESTRAL':
        $incMonth = 1;
      case 'TRIMESTRAL':
        $incMonth = 2;
      case 'SEMESTRAL':
        $incMonth = 5;
      default:
        $incMonth = 0;
    }
    /* Calulo para MENSAL, BIMESTRAL, TRIMESTRAL e SEMANAL */
    $ano = date('Y', strtotime($data)); /* 20xx */
    $mes = date('m', strtotime($data)); /* 01 - 12 */
    $dia = date('d', strtotime($data)); /* 01 - 12 */
    if ($dia >= $programa->periodicidade_valor) $incMonth++;
    $anoMesDia = date("Y-m-d", strtotime($ano . "-" . $mes . "-01 + " . $incMonth . " month"));
    $days = min(date('t', strtotime($anoMesDia)), $programa->periodicidade_valor) - 1;
    return date("Y-m-d", strtotime($anoMesDia . " + " . $days . " days"));
  }

  /**
   * (RN_CSLD_1) Inclui ou atualiza as consolidações com base no período do plano de trabalho
   *
   * @param   string  $usuario_id
   * @return  Illuminate\Database\Eloquent\Collection      
   */
  public function atualizaConsolidacoes($plano)
  {
    $existentes = $plano->consolidacoes->all();
    $ocorrencias = array_reduce($existentes, fn ($carry, $item) => array_merge($carry, $item->ocorrencias->all()), []);
    $merged = [];
    $dataInicioVigencia = date("Y-m-d", strtotime($plano->data_inicio)); /* Transforma de datetime para date */
    $dataFimVigencia = date("Y-m-d", strtotime($plano->data_fim)); /* Transforma de datetime para date */
    $dataInicio = $dataInicioVigencia;
    while (strtotime($dataInicio) <= strtotime($dataFimVigencia)) {
      $dataFim = date("Y-m-d", min(strtotime($this->proxDataConsolidacao($dataInicio, $plano->programa)), strtotime($dataFimVigencia)));
      $intersecaoOcorrencias = array_filter($ocorrencias, fn ($o) => strtotime($dataInicio) <= strtotime($o->data_fim) && strtotime($dataFim) >= strtotime($o->data_inicio));
      $maxDataFimOcorrencia = count($intersecaoOcorrencias) ? max(array_map(fn ($item) => strtotime($item->data_fim), $intersecaoOcorrencias)) : strtotime($dataFim);
      /* (RN_CSLD_3) Caso exista uma ocorrência que faça interseção no período e tenha data_fim maior que a calculada, a data_fim do período irá crescer */
      $dataFim = $maxDataFimOcorrencia > strtotime($dataFim) ? date("Y-m-d", $maxDataFimOcorrencia) : $dataFim;
      $igual = array_filter($existentes, fn ($c) => $c->data_inicio == $dataInicio && $c->data_fim == $dataFim)[0] ?? null;
      $intersecao = array_filter($existentes, fn ($c) => $c->status != "INCLUIDO" && strtotime($dataInicio) <= strtotime($c->data_fim) && strtotime($dataFim) >= strtotime($c->data_inicio))[0] ?? null;
      if (!empty($igual)) { /* (RN_CSLD_4) Caso exista períodos iguais, o período existente será mantido (para este perído nada será feito, manterá a mesma ID) */
        $merged[] = $igual;
        $existentes = array_filter($existentes, fn ($e) => $e->id !== $igual->id);
        $dataInicio = date("Y-m-d", strtotime($igual->data_fim . ' + 1 days'));
      } else if (!empty($intersecao)) { /* Se houver intersecção do período gerado com um existente que esteja com status CONCLUIDO ou AVALIADO */
        $existentes = array_filter($existentes, fn ($e) => $e->id !== $igual->id);
        if ($intersecao->data_inicio == $dataInicio) { /* (RN_CSLD_5) Se as datas de início forem iguais o periodo existente será mantido */
          $dataInicio = date("Y-m-d", strtotime($intersecao->data_fim . ' + 1 days'));
        } else { /* (RN_CSLD_6) Se as datas de início forem diferente, então será criado um novo perído entre o novo início e o início do período CONCLUIDO/AVALIADO, e o período CONCLUIDO/AVALIADO será mantido */
          $novo = new PlanoTrabalhoConsolidacao([
            'data_inicio' => $dataInicio,
            'data_fim' => date("Y-m-d", strtotime($intersecao->data_inicio . ' - 1 days')),
            'plano_trabalho_id' => $plano->id,
            'status' => 'INCLUIDO'
          ]);
          $novo->save();
          $merged[] = $novo;
          $dataInicio = $intersecao->data_inicio;
        }
      } else { /* Novo período */
        $novo = new PlanoTrabalhoConsolidacao([
          'data_inicio' => $dataInicio,
          'data_fim' => $dataFim,
          'plano_trabalho_id' => $plano->id,
          'status' => 'INCLUIDO'
        ]);
        $novo->save();
        $merged[] = $novo;
        $dataInicio = date("Y-m-d", strtotime($dataFim . ' + 1 days'));
      }
    }
    /* (RN_CSLD_7) Ocorrências e Atividades devem ser transferiadas para os novos perídos */
    foreach ($existentes as $anterior) {
      /* Realoca ocorrencias */
      foreach ($anterior->ocorrencias as $ocorrencia) {
        $consolidacao = array_filter($merged, fn ($item) => strtotime($item->data_inicio) <= strtotime($ocorrencia->data_inicio) && strtotime($ocorrencia->data_inicio) <= strtotime($item->data_fim))[0] ?? null;
        if (empty($consolidacao)) throw new ServerException("ValidatePlanoTrabalho", "Erro ao realocar ocorrência para novo período: " . $ocorrencia->data_inicio);
        $ocorrencia->plano_trabalho_consolidacao_id = $consolidacao->id;
        $ocorrencia->save();
      }
      /* Remove o registro da consolidação completamente vazio */
      $anterior->delete();
    }
    /* Refaz todas as datas finais das consolidações considerando sempre data_inicio da próxima - 1 dia */
    $this->atualizaDataFimConsolidacoes($plano->id);
  }

  /* Refaz todas as datas finais das consolidações considerando sempre data_inicio da próxima - 1 dia */
  public function atualizaDataFimConsolidacoes($planoId)
  {
    $plano = PlanoTrabalho::find($planoId);
    $consolidacoes = $plano?->consolidacoes?->all() ?? [];
    $consolidacoes[] = new PlanoTrabalhoConsolidacao(["data_inicio" => $plano?->data_fim]);
    for ($i = 1; $i < count($consolidacoes); $i++) {
      if (strtotime($consolidacoes[$i - 1]->data_fim) != strtotime($consolidacoes[$i]->data_inicio . " -1 days")) {
        $consolidacoes[$i - 1]->data_fim = date("Y-m-d", strtotime($consolidacoes[$i]->data_inicio . " -1 days"));
        $consolidacoes[$i - 1]->save();
      }
    }
  }

  /** 
   * Retorna os planos de trabalho de um usuário (validando se ele tem acesso a esse plano)
   * 
   * @param   string  $usuario_id  O ID do Usuário
   * @param   string  $arquivadas  Se o resultado deve incluir os planos arquivados
   * @return  array
   */
  public function getByUsuario($usuarioId, $arquivados)
  {
    // TODO: validar permissoes
    $query = PlanoTrabalho::with([
      "unidade:id,sigla,nome", 
      "unidade.gestor:id,unidade_id,usuario_id",
      "unidade.gestorSubstituto:id,unidade_id,usuario_id",
      "tipoModalidade:id,nome", 
      "consolidacoes",
      "usuario:id,nome,apelido,url_foto"
    ])->where("usuario_id", $usuarioId);
    if (!$arquivados) $query->whereNull("data_arquivamento");
    $planos = $query->get()->all();
    $programasIds = array_unique(array_map(fn($v) => $v["programa_id"], $planos));
    $programas = Programa::whereIn("id", $programasIds)->get()->all();
    return [
      "planos" => $planos,
      "programas" => $programas
    ];
  }

  /** 
   * Retorna um array com os dados de um Plano de Trabalho. Método criado para atender ao Relatório de Força de Trabalho - Servidor.
   * Os cálculos das horas levam em consideração sempre os tempos pactuados - uma alteração conceitual introduzida nos Relatórios de Força de Trabalho.
   * 
   * @param   string  $plano_id       O ID do Plano de Trabalho.
   * @param   string  $inicioPeriodo  Data inicial do período de pesquisa.
   * @param   string  $fimPeriodo     Data final do período de pesquisa.
   * @return  array
   */
  public function metadadosPlano($plano_id, $inicioPeriodo = null, $fimPeriodo = null): array
  {
    $plano = PlanoTrabalho::where('id', $plano_id)->with(['atividades', 'tipoModalidade'])->first()->toArray();
    $result = [
      "concluido" => true,
      "atividadesNaoIniciadas" => $this->atividadesNaoIniciadas($plano, null, null), //array_filter($plano['atividades'], fn($atividade) => $atividade['data_inicio'] == null),
      "atividadesEmAndamento" => $this->atividadesEmAndamento($plano, null, null), //array_filter($plano['atividades'], fn($atividade) => $atividade['data_inicio'] != null && $atividade['data_entrega'] == null),
      "atividadesConcluidas" => $this->atividadesSoConcluidas($plano, null, null),
      "horasAfastamentoDecorridas" => 0,
      "horasAtividadesNaoIniciadas" => 0,
      "horasAtividadesEmAndamento" => 0,
      "horasAtividadesConcluidas" => 0,
      "horasTotaisAlocadas" => 0,
      "horasUteisAfastamento" => 0,
      "horasUteisDecorridas" => 0,
      "horasUteisTotais" => $plano['tempo_total'],
      "modalidade" => $plano['tipo_modalidade']['nome'],
      "percentualHorasNaoIniciadas" => 0,
      "usuario_id" => $plano['usuario_id'],
      "noPeriodo" => [
        "atividadesDistribuidas" => [],
        "atividadesNaoIniciadas" => [],
        "atividadesEmAndamento" => [],
        "horasUteisDisponiveisServidor" => 0,
        "tempoTotalRealizadoNoPeriodo" => 0,
        "tempoTotalAlocado" => 0,
        "tempoTotalNaoIniciadas" => 0,
        "tempoTotalEmAndamento" => 0,
        "tempoPrevistoNaoIniciadasNoPeriodo" => 0,
        "tempoPrevistoEmAndamentoNoPeriodo" => 0,
        "tempoTotalPrevistoNoPeriodo" => 0,
      ]
    ];
    $inicioPlano = new DateTime($plano['data_inicio']);
    $fimPlano = new DateTime($plano['data_fim'], $inicioPlano->getTimezone());
    $unidadePlano = Unidade::find($plano['unidade_id'])->first();
    $afastamentosUsuario = Afastamento::where('usuario_id', $plano['usuario_id'])->get()->toArray();
    // Cálculo das horas úteis totais de afastamento
    $result["horasUteisAfastamento"] = CalendarioService::calculaDataTempoUnidade($inicioPlano, $fimPlano, $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->horasAfastamento;
    // Cálculo das horas úteis decorridas do plano e das horas úteis decorridas dos afastamentos
    $result["horasUteisDecorridas"] = new DateTime() < $inicioPlano ? 0 : CalendarioService::calculaDataTempoUnidade($inicioPlano, new DateTime() > $fimPlano ? $fimPlano : new DateTime(), $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS")->tempoUtil;
    $result["horasAfastamentoDecorridas"] = new DateTime() < $inicioPlano ? 0 : CalendarioService::calculaDataTempoUnidade($inicioPlano, new DateTime() > $fimPlano ? $fimPlano : new DateTime(), $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->horasAfastamento;
    /*  Definição se o Plano de Trabalho foi concluído ou não. O plano será considerado CONCLUÍDO se não possuir nenhuma atividade OU quando todas as suas atividades forem CUMPRIDAS. Uma atividade é considerada cumprida quando
        seu tempo homologado não for mais nulo. */
    if (count($plano['atividades']) == 0) $result['concluido'] = true;
    else {
      foreach ($plano['atividades'] as $atividade) {
        //if ($atividade['tempo_homologado'] == null) $result['concluido'] = false;
        if ($atividade['progresso'] < 100) $result['concluido'] = false;
      }
    }
    /* Soma dos tempos pactuados das atividades */
    $result['horasAtividadesNaoIniciadas'] = $this->somaTemposPactuados($result['atividadesNaoIniciadas']);
    $result['horasAtividadesEmAndamento'] = $this->somaTemposPactuados($result['atividadesEmAndamento']);
    $result['horasAtividadesConcluidas'] = $this->somaTemposPactuados($result['atividadesConcluidas']);
    //$result['horasAtividadesAvaliadas'] = $this->somaTemposPactuados($result['atividadesAvaliadas']);
    $result['horasTotaisAlocadas'] = $result['horasAtividadesNaoIniciadas'] + $result['horasAtividadesEmAndamento'] + $result['horasAtividadesConcluidas'] + $result['horasAtividadesAvaliadas'];
    /* Média das avaliações das atividades já avaliadas */
    //$result['mediaAvaliacoes'] = (count($result['atividadesAvaliadas']) == 0) ? null : $this->utilService->avg(array_map(fn ($d) => $d['avaliacao']['nota_atribuida'], $result['atividadesAvaliadas']));
    /* Cálculo das estatísticas limitadas pelo período estabelecido, se houver um. */
    if ($inicioPeriodo) { // se for solicitada a análise de um determinado período, obrigatoriamente serão fornecidos as datas inicial e final desse período
      $result['noPeriodo']['atividadesDistribuidas'] = $this->atividadesDistribuidas($plano, $inicioPeriodo, $fimPeriodo);
      $result['noPeriodo']['atividadesNaoIniciadas'] = $this->atividadesNaoIniciadas($plano, $inicioPeriodo, $fimPeriodo);
      $result['noPeriodo']['atividadesEmAndamento'] = $this->atividadesEmAndamento($plano, $inicioPeriodo, $fimPeriodo);
      //$result['noPeriodo']['atividadesSoConcluidas'] = $this->atividadesSoConcluidas($plano, $inicioPeriodo, $fimPeriodo);
      //$result['noPeriodo']['atividadesReprovadas'] = $this->atividadesReprovadas($plano, $inicioPeriodo, $fimPeriodo);
      //$result['noPeriodo']['atividadesAprovadas'] = $this->atividadesAprovadas($plano, $inicioPeriodo, $fimPeriodo);
      $result['noPeriodo']['horasUteisDisponiveisServidor'] = CalendarioService::calculaDataTempoUnidade(new DateTime($inicioPeriodo), new DateTime($fimPeriodo), $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->tempoUtil;
      $result['noPeriodo']['tempoTotalAlocado'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesDistribuidas']);
      $result['noPeriodo']['tempoTotalNaoIniciadas'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesNaoIniciadas']);
      $result['noPeriodo']['tempoTotalEmAndamento'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesEmAndamento']);
      //$result['noPeriodo']['tempoTotalSoConcluidas'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesSoConcluidas']);
      //$result['noPeriodo']['tempoTotalReprovadas'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesReprovadas']);
      //$result['noPeriodo']['tempoTotalAprovadas'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesAprovadas']);
      $result['noPeriodo']['tempoPrevistoNaoIniciadasNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesNaoIniciadas'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      $result['noPeriodo']['tempoPrevistoEmAndamentoNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesEmAndamento'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      //$result['noPeriodo']['tempoPrevistoSoConcluidasNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesSoConcluidas'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      //$result['noPeriodo']['tempoPrevistoReprovadasNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesReprovadas'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      //$result['noPeriodo']['tempoPrevistoAprovadasNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['atividadesAprovadas'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      $result['noPeriodo']['tempoTotalPrevistoNoPeriodo'] = $result['noPeriodo']['tempoPrevistoNaoIniciadasNoPeriodo'] + $result['noPeriodo']['tempoPrevistoEmAndamentoNoPeriodo'] + $result['noPeriodo']['tempoPrevistoSoConcluidasNoPeriodo'] +
        $result['noPeriodo']['tempoPrevistoReprovadasNoPeriodo'] + $result['noPeriodo']['tempoPrevistoAprovadasNoPeriodo'];
      //$result['noPeriodo']['tempoTrabalhadoHomologado'] = $this->tempoAvaliado($result['noPeriodo']['atividadesAprovadas'], true, $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      //$result['noPeriodo']['tempoTrabalhadoNaoHomologado'] = $this->tempoAvaliado($result['noPeriodo']['atividadesReprovadas'], false, $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      //$result['noPeriodo']['tempoDespendidoSoConcluidas'] = $this->tempoAvaliado($result['noPeriodo']['atividadesSoConcluidas'], false, $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      //$result['noPeriodo']['tempoTotalRealizadoNoPeriodo'] = $result['noPeriodo']['tempoTrabalhadoHomologado'] + $result['noPeriodo']['tempoTrabalhadoNaoHomologado'] + $result['noPeriodo']['tempoDespendidoSoConcluidas']; 
    }
    return $result;
  }

  /** 
   * Retorna um array com todas as atividades de um determinado Plano de Trabalho, cujas datas de distribuição ou de data_estipulada_entrega estejam
   * dentro do período estabelecido. 
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
  public function atividadesDistribuidas($plano, $inicioPeriodo, $fimPeriodo): array
  {
    $result = [];
    foreach ($plano['atividades'] as $atividade) {
      if ($this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo)) array_push($result, $atividade);
    }
    return $result;
  }

  /** 
   * Retorna um array com todas as atividades de um determinado Plano de Trabalho, ainda não iniciadas pelo servidor, cujas datas de início ou de entrega estejam
   * dentro do período estabelecido. Uma atividade é considerada não iniciada se o seu campo data_inicio é nulo. 
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
  public function atividadesNaoIniciadas($plano, $inicioPeriodo, $fimPeriodo): array
  {
    $result = [];
    foreach ($plano['atividades'] as $atividade) {
      if (!$this->atividadeService->isIniciada($atividade) && $this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo)) array_push($result, $atividade);
    }
    return $result;
  }

  /** 
   * Retorna um array com todas as atividades em andamento de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma atividade é considerada em andamento se o seu campo data_inicio não é nulo e seu campo data_entrega é nulo. 
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
  public function atividadesEmAndamento($plano, $inicioPeriodo, $fimPeriodo): array
  {
    $result = [];
    foreach ($plano['atividades'] as $atividade) {
      if ($this->atividadeService->isIniciada($atividade) && !$this->atividadeService->isConcluida($atividade) && $this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo)) array_push($result, $atividade);
    }
    return $result;
  }

  /**
   * Define se um Plano de Trabalho é considerado um Plano de Gestão ou não, ou seja, se existe ou não um normativo definindo como Programa de Gestão 
   * o Programa ao qual ele está vinculado.
   * 
   * @param   Plano   $plano  O ID do Plano de Trabalho.
   * @return  bool
   */
  public function isPlanoGestao($plano): bool
  {
    return !$plano['programa']['normativa'] == null;
  }

  public function proxyGetAllIdsExtra($result, $data)
  {
    $tipoModalidades = [];
    $usuarios = [];
    $unidades = [];
    foreach ($result["rows"] as $plano) {
      $tipoModalidades[$plano->tipo_modalidade_id] = $plano->tipoModalidade;
      $usuarios[$plano->usuario_id] = $plano->usuario;
      $unidades[$plano->unidade_id] = $plano->unidade;
    }
    return [
      "merge" => [
        "tipo_modalidade" => $tipoModalidades,
        "usuario" => $usuarios,
        "unidade" => $unidades
      ]
    ];
  }

  /**
   * Retorna um array com várias informações sobre o plano recebido como parâmetro que serão auxiliares na definição das permissões para as diversas operações possíveis com um Plano de Trabalho.
   * Se o plano recebido como parâmetro possuir ID, as informações devolvidas serão baseadas nos dados armazenados no banco. Caso contrário, as informações devolvidas serão baseadas nos dados
   * recebidos na chamada do método. 
   * @param array $entity     Um array com os dados de um plano já existente ou que esteja sendo criado.
   * @return array
   */
  public function buscaCondicoes(array $entity): array
  {
    $planoTrabalho = !empty($entity['id']) ? PlanoTrabalho::with('entregas')->find($entity['id'])->toArray() : $entity;
    $planoTrabalho['unidade'] = !empty($planoTrabalho['unidade_id']) ? Unidade::find($planoTrabalho['unidade_id'])->toArray() : null;
    $result = [];
    $result["assinaturasExigidas"] = $this->programa->assinaturasExigidas($planoTrabalho["id"]);
    $result["assinaturaUsuarioExigida"] = in_array(parent::loggedUser()->id,$this->programa->assinaturasExigidas($planoTrabalho["id"]));
    $result["gestorUnidadeExecutora"] = $this->usuario->isGestorUnidade($planoTrabalho['unidade_id']);
    $result["nrEntregas"] = empty($planoTrabalho['entregas']) ? 0 : count($planoTrabalho['entregas']);
    $result["participanteLotadoAreaTrabalho"] = parent::loggedUser()->areasTrabalho->find(fn($at) => $this->usuario->isLotacao($planoTrabalho["usuario_id"],$at->unidade->id)) != null;
    $result["participanteLotadoUnidadeExecutora"] = $this->usuario->isLotacao($planoTrabalho["usuario_id"],$planoTrabalho["unidade_id"]);
    $result["planoAguardandoAssinatura"] = $this->isPlano("AGUARDANDO_ASSINATURA", $planoTrabalho);
    $result["planoArquivado"] = empty($planoTrabalho['id']) ? false : PlanoTrabalho::find($planoTrabalho['id'])->data_arquivamento != null;
    $result["planoAtivo"] = $this->isPlano("ATIVO", $planoTrabalho);
    $result["planoConcluido"] = $this->isPlano("CONCLUIDO", $planoTrabalho);
    $result["planoIncluido"] = $this->isPlano("INCLUIDO", $planoTrabalho);
    $result["planoStatus"] = empty($planoTrabalho['id']) ? null : PlanoTrabalho::find($planoTrabalho['id'])->status;
    $result["planoSuspenso"] = $this->isPlano("SUSPENSO", $planoTrabalho);
    $result["planoValido"] = $this->isPlanoTrabalhoValido($planoTrabalho);
    $result["possuiPeriodoConflitanteOutroPlano"] = PlanoTrabalho::where("unidade_id",$planoTrabalho['unidade_id'])->where("usuario_id",$planoTrabalho['usuario_id'])->get()
            ->find(fn($p) => $this->util->intersection([['start' => UtilService::asDateTime($p->data_inicio), 'end' => UtilService::asDateTime($p->data_fim)],
            ['start' => UtilService::asDateTime($planoTrabalho["data_inicio"]), 'end' => UtilService::asDateTime($planoTrabalho["data_fim"])]]) != null) != null;
    $result["unidadePlanoEhLotacao"] = $this->usuario->isLotacao(null, $planoTrabalho['unidade_id']);
    $result["usuarioEhParticipantePgdHabilitado"] = $this->usuario->isParticipantePgdHabilitado(null, $planoTrabalho["programa_id"]);
    $result["usuarioEhParticipantePlano"] = parent::loggedUser()->id == $planoTrabalho["usuario_id"];
    $result["usuarioJaAssinouTCR"] = $this->usuario->jaAssinouTCR(null, $planoTrabalho["id"]);
    return $result;
  }

  /**
   * Informa se o plano de trabalho recebido como parâmetro é um plano válido.
   * Um Plano de Trabalho é válido se não foi deletado, nem arquivado e não está no status de cancelado.
   * @param array $planoTrabalho  
   */
  public function isPlanoTrabalhoValido($plano): bool
  {
    $planoTrabalho = !empty($plano['id']) ? PlanoTrabalho::where('id', $plano['id'])->first() : $plano;
    return empty($plano['id']) ? false : (!$planoTrabalho->trashed() && !$plano['data_arquivamento'] && $planoTrabalho->status != 'CANCELADO');
  }

  /**
   * Informa o status do plano de trabalho recebido como parâmetro.
   * O Plano de Trabalho precisa ser VÁLIDO.
   * @param string $status
   * @param array $planoTrabalho  
   */
  public function isPlano($status, $plano): bool
  {
    $planoTrabalho = !empty($plano['id']) ? PlanoTrabalho::find($plano['id']) : $plano;
    return empty($plano['id']) ? false : ($this->isPlanoTrabalhoValido($plano) && $planoTrabalho->status == $status);
  }

  public function arquivar($data, $unidade) { 
    try {
        DB::beginTransaction();
        $planoTrabalho = PlanoTrabalho::find($data["id"]);
        if(!empty($planoTrabalho)) {
            $this->update([
                "id" => $planoTrabalho->id,
                "data_arquivamento" => Carbon::now()
            ], $unidade, false);
        } else {
            throw new ServerException("ValidatePlanoTrabalho", "Plano de Trabalho não encontrado!");
        }
        DB::commit();
    } catch (Throwable $e) {
        DB::rollback();
        throw $e;
    }
    return true;
  }

  public function ativar($data, $unidade) {    
    try {
        DB::beginTransaction();
        $planoTrabalho = PlanoTrabalho::find($data["id"]);
        $this->status->atualizaStatus($planoTrabalho, 'ATIVO', "O Plano de Trabalho foi ativado nesta data!");
        DB::commit();
    } catch (Throwable $e) {
        DB::rollback();
        throw $e;
    }
    return true;    
  }

  public function cancelarAssinatura($data, $unidade) {    
    try {
        DB::beginTransaction();
        $planoTrabalho = PlanoTrabalho::find($data["id"]);
        //FALTA IMPLEMENTAR: o plano permanece no status 'AGUARDANDO_ASSINATURA' ou retorna ao status 'INCLUIDO';
        DB::commit();
    } catch (Throwable $e) {
        DB::rollback();
        throw $e;
    }
    return true;
  }

  public function cancelarPlano($data, $unidade) {    
    try {
        DB::beginTransaction();
        $planoTrabalho = PlanoTrabalho::find($data["id"]);
        $this->status->atualizaStatus($planoTrabalho,'CANCELADO', $data["justificativa"]);
        DB::commit();
    } catch (Throwable $e) {
        DB::rollback();
        throw $e;
    }
    return true;
  }

  public function desarquivar($data, $unidade) { 
    try {
        DB::beginTransaction();
        $planoTrabalho = PlanoTrabalho::find($data["id"]);
        if(!empty($planoTrabalho)) {
            $this->update([
                "id" => $planoTrabalho->id,
                "data_arquivamento" => null
            ], $unidade, false);
        } else {
            throw new ServerException("ValidatePlanoTrabalho", "Plano de Trabalho não encontrado!");
        }
        DB::commit();
    } catch (Throwable $e) {
        DB::rollback();
        throw $e;
    }
    return true;
  }

  public function enviarParaAssinatura($data, $unidade) {    
    try {
        DB::beginTransaction();
        $planoTrabalho = PlanoTrabalho::find($data["id"]);
        // FALTA IMPLEMENTAR. o plano vai para o status 'AGUARDANDO_ASSINATURA';
        DB::commit();
    } catch (Throwable $e) {
        DB::rollback();
        throw $e;
    }
    return true;
  }

  public function reativar($data, $unidade) {    
    try {
        DB::beginTransaction();
        $planoTrabalho = PlanoTrabalho::find($data["id"]);
        $this->status->atualizaStatus($planoTrabalho, 'ATIVO', $data["justificativa"]);
        DB::commit();
    } catch (Throwable $e) {
        DB::rollback();
        throw $e;
    }
    return true;    
  }

  public function suspender($data, $unidade){    
    try {
        DB::beginTransaction();
        $planoTrabalho = PlanoTrabalho::find($data["id"]);
        $this->status->atualizaStatus($planoTrabalho, 'SUSPENSO', $data["justificativa"]);
        DB::commit();
    } catch (Throwable $e) {
        DB::rollback();
        throw $e;
    }
    return true;
  }




}
