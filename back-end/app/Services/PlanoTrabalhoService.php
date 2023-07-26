<?php

namespace App\Services;

use App\Models\PlanoTrabalho;
use App\Models\PlanoEntrega;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\Afastamento;
use App\Services\ServiceBase;
use App\Services\CalendarioService;
use App\Services\UtilService;
use App\Exceptions\ServerException;
use DateTime;
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
    return PlanoTrabalho::where("usuario_id", $usuario_id)->where("data_inicio_vigencia", "<=", now())->where("data_fim_vigencia", ">=", now())->get();
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
      ->where("data_inicio_vigencia", "<=", $data_final)
      ->where("data_fim_vigencia", ">=", $data_inicial)->get();
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
            $where[] = ["data_inicio_vigencia", "<=", $dataFim];
            $where[] = ["data_fim_vigencia", ">=", $dataInicio];
            break;
          case "NAOVIGENTE":;
            $where[] = ["OR", ["data_inicio_vigencia", ">", $dataFim], ["data_fim_vigencia", "<", $dataInicio]];
            break;
          case "INICIAM":;
            $where[] = ["data_inicio_vigencia", ">=", $dataInicio];
            $where[] = ["data_inicio_vigencia", "<=", $dataFim];
            break;
          case "FINALIZAM":;
            $where[] = ["data_fim_vigencia", ">=", $dataInicio];
            $where[] = ["data_fim_vigencia", "<=", $dataFim];
            break;
        }
      } else if (!(is_array($condition) && in_array($condition[0], ["data_filtro_inicio", "data_filtro_fim"]))) {
        array_push($where, $condition);
      }
    }
    $data["where"] = $where;
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
      throw new ServerException("ValidatePlano", "Usuário do plano fora das lotações de quem está lançando o plano (MOD_PTR_USERS_INCL)");
    }
    if (!in_array($unidade_id, $usuario_lotacoes_ids) && !parent::loggedUser()->hasPermissionTo('MOD_PTR_INCL_SEM_LOT')) {
      throw new ServerException("ValidatePlano", "Usuário não lotado na unidade do plano (MOD_PTR_INCL_SEM_LOT)");
    }
    $planos = PlanoTrabalho::where("usuario_id", $data["usuario_id"])->where("usuario_id", $data["unidade_id"])->where("tipo_modalidade_id", $data["tipo_modalidade_id"])->get();
    foreach ($planos as $plano) {
      if (
        UtilService::intersect($plano->data_inicio_vigencia, $plano->data_fim_vigencia, $data["data_inicio_vigencia"], $data["data_fim_vigencia"]) &&
        UtilService::valueOrNull($data, "id") != $plano->id && !parent::loggedUser()->hasPermissionTo('MOD_PTR_INTSC_DATA')
      ) {
        throw new ServerException("ValidatePlano", "O plano de trabalho #" . $plano->numero . " (" . UtilService::getDateTimeFormatted($plano->data_inicio_vigencia) . " à " . UtilService::getDateTimeFormatted($plano->data_fim_vigencia) . ") possui período conflitante para a mesma modalidade (MOD_PTR_INTSC_DATA)");
      }
    }
    if($action == "UPDATE") {
      $plano = PlanoTrabalho::find($data["id"]);
      if($data["unidade_id"] != $plano->unidade_id) throw new ServerException("ValidatePlano", "Depois de criado um Plano de Trabalho, não é possível alterar a sua Unidade.");
      if($data["programa_id"] != $plano->programa_id) throw new ServerException("ValidatePlano", "Depois de criado um Plano de Trabalho, não é possível alterar o seu Programa.");
      if($data["plano_entrega_id"] != $plano->plano_entrega_id) throw new ServerException("ValidatePlano", "Depois de criado um Plano de Trabalho, não é possível alterar o seu Plano de Entregas.");
      /*  (RN_PTR_1)
          Após criado um plano de trabalho, o seu plano de entregas não pode mais ser alterado. Em consequência dessa regra, os seguintes campos 
          não poderão mais ser alterados: plano_entrega_id, unidade_id, programa_id;
      */
    }
  }

  public function proxyStore($plano, $unidade, $action) {
    $this->documentoId = $plano["documento_id"];
    $plano["documento_id"] = null;
    if($action == "INSERT") {
      if(empty($plano["plano_entrega_id"])) throw new ServerException("ValidatePlano", "A definição de um Plano de Entregas é obrigatória!");
      $planoEntrega = PlanoEntrega::find($plano["plano_entrega_id"]);
      $plano["programa_id"] = $planoEntrega->programa_id;
      $plano["unidade_id"] = $planoEntrega->unidade_id;
    }
    return $plano;
  }

  public function extraStore($plano, $unidade, $action)
  {
    /* Adiciona a Lotação automaticamente caso o usuário não tenha */
    $usuario_lotacoes_ids = array_map(fn($u) => $u["unidade_id"], Usuario::find($plano->usuario_id)->areasTrabalho?->toArray() ?? []);
    if (!in_array($plano->unidade_id, $usuario_lotacoes_ids)) {
      $this->unidadeIntegranteAtribuicaoService->store([
        'unidade_integrante_id' => UnidadeIntegrante::firstOrCreate(['unidade_id' => $plano->unidade_id, 'usuario_id' => $plano->usuario_id])->id,
        'atribuicao' => 'COLABORADOR'
      ], $unidade, false);
    }
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
      //"atividadesAvaliadas" => $this->atividadesAvaliadas($plano, null, null),
      "horasAfastamentoDecorridas" => 0,
      "horasAtividadesNaoIniciadas" => 0,
      "horasAtividadesEmAndamento" => 0,
      "horasAtividadesConcluidas" => 0,
      //"horasAtividadesAvaliadas" => 0,
      "horasTotaisAlocadas" => 0,
      "horasUteisAfastamento" => 0,
      "horasUteisDecorridas" => 0,
      "horasUteisTotais" => $plano['tempo_total'],
      //"mediaAvaliacoes" => null,
      "modalidade" => $plano['tipo_modalidade']['nome'],
      "percentualHorasNaoIniciadas" => 0,
      "usuario_id" => $plano['usuario_id'],
      "noPeriodo" => [
        "atividadesDistribuidas" => [], 
        "atividadesNaoIniciadas" => [], 
        "atividadesEmAndamento" => [], 
        //"atividadesSoConcluidas" => [], 
        //"atividadesReprovadas" => [], 
        //"atividadesAprovadas" => [],
        "horasUteisDisponiveisServidor" => 0, 
        //"tempoTrabalhadoHomologado" => 0, 
        //"tempoTrabalhadoNaoHomologado" => 0,
        //"tempoDespendidoSoConcluidas" => 0, 
        "tempoTotalRealizadoNoPeriodo" => 0, 
        "tempoTotalAlocado" => 0,
        "tempoTotalNaoIniciadas" => 0,
        "tempoTotalEmAndamento" => 0,
        //"tempoTotalSoConcluidas" => 0, 
        //"tempoTotalReprovadas" => 0, 
        //"tempoTotalAprovadas" => 0,
        "tempoPrevistoNaoIniciadasNoPeriodo" => 0, 
        "tempoPrevistoEmAndamentoNoPeriodo" => 0,
        //"tempoPrevistoSoConcluidasNoPeriodo" => 0,
        //"tempoPrevistoReprovadasNoPeriodo" => 0,
        //"tempoPrevistoAprovadasNoPeriodo" => 0, 
        "tempoTotalPrevistoNoPeriodo" => 0, 
      ]
    ];
    $inicioPlano = new DateTime($plano['data_inicio_vigencia']);
    $fimPlano = new DateTime($plano['data_fim_vigencia'], $inicioPlano->getTimezone());
    $unidadePlano = Unidade::find($plano['unidade_id'])->first();
    $afastamentosUsuario = Afastamento::where('usuario_id', $plano['usuario_id'])->get()->toArray();
    // Cálculo das horas úteis totais de afastamento
    $result["horasUteisAfastamento"] = CalendarioService::calculaDataTempoUnidade($inicioPlano, $fimPlano, $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->horasAfastamento;
    // Cálculo das horas úteis decorridas do plano e das horas úteis decorridas dos afastamentos
    $result["horasUteisDecorridas"] = new DateTime() < $inicioPlano ? 0 : CalendarioService::calculaDataTempoUnidade($inicioPlano, new DateTime() > $fimPlano ? $fimPlano : new DateTime(), $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS")->tempoUtil;
    $result["horasAfastamentoDecorridas"] = new DateTime() < $inicioPlano ? 0 : CalendarioService::calculaDataTempoUnidade($inicioPlano, new DateTime() > $fimPlano ? $fimPlano : new DateTime(), $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->horasAfastamento;
    /*  Definição se o Plano de Trabalho foi concluído ou não. O plano será considerado CONCLUÍDO se não possuir nenhuma atividade OU quando todas as suas atividades forem CUMPRIDAS. Uma atividade é considerada cumprida quando
        seu tempo homologado não for mais nulo. */
    if (count($plano['atividades']) == 0) $result['concluido'] = true; else {
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
    if($inicioPeriodo){ // se for solicitada a análise de um determinado período, obrigatoriamente serão fornecidos as datas de inicio e fim desse período
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
   * Retorna um array com todas as atividades de um determinado Plano de Trabalho, cujas datas de distribuição ou de prazo_entrega estejam
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
      if($this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo)) array_push($result, $atividade);
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
      if(!$this->atividadeService->isIniciada($atividade) && $this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo)) array_push($result, $atividade);
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
      if($this->atividadeService->isIniciada($atividade) && !$this->atividadeService->isConcluida($atividade) && $this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo)) array_push($result, $atividade);
    }
    return $result;
  }

  /** 
   * Retorna um array com todas as atividades só concluidas de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma atividade é considerada só concluída se o seu campo data_entrega não for nulo e se ainda não foi avaliada. 
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
    /*   public function atividadesSoConcluidas($plano, $inicioPeriodo, $fimPeriodo): array
    {
    $result = [];
    foreach ($plano['atividades'] as $atividade) {
      if ($this->atividadeService->isConcluida($atividade) && !($this->atividadeService->isAvaliada($atividade)) && $this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo)) array_push($result, $atividade);
    }
    return $result;
  } */

  /**
   * Retorna um array com todas as atividades avaliadas de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma atividade é considerada avaliada se o seu campo avalicao_id não for nulo.
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
    /*   public function atividadesAvaliadas($plano, $inicioPeriodo, $fimPeriodo): array
    {
    $result = [];
    foreach ($plano['atividades'] as $atividade) {
      if ($this->atividadeService->isAvaliada($atividade) && $this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo)) array_push($result, $atividade);
    }
    return $result;
  } */

  /**
   * Retorna um array com todas as atividades aprovadas de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma atividade é considerada aprovada se a nota da sua avaliação foi maior ou igual a 5.0.
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
    /*   public function atividadesAprovadas($plano, $inicioPeriodo, $fimPeriodo): array
    {
    $result = [];
    foreach ($plano['atividades'] as $atividade) {
      if ($this->atividadeService->isAprovada($atividade) && $this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo)) array_push($result, $atividade);
    }
    return $result;
  } */

  /**
   * Retorna um array com todas as atividades reprovadas de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma atividade é considerada reprovada se a nota da sua avaliação foi menor que 5.0.
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
    /*   public function atividadesReprovadas($plano, $inicioPeriodo, $fimPeriodo): array
    {
    $result = [];
    foreach ($plano['atividades'] as $atividade) {
      if ($this->atividadeService->isReprovada($atividade) && $this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo)) array_push($result, $atividade);
    }
    return $result;
  } */

  /** 
   * Retorna um array com todas as atividades cumpridas de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma atividade é considerada cumprida se o seu campo tempo_homologado não for nulo. 
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
    /*   public function atividadesCumpridas($plano, $inicioPeriodo, $fimPeriodo): array
    {
    $result = [];
    foreach ($plano['atividades'] as $atividade) {
      if ($this->atividadeService->isCumprida($atividade) && $this->atividadeService->withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo)) array_push($result, $atividade);
    }
    return $result;
  } */

  /**
   * Retorna a soma dos tempos pactuados de um array de atividades.
   * 
   * @param array $atividades
   * @return float
   */
    /*   public function somaTemposPactuados(array $atividades, $inicio = null, $fim = null, $cargaHoraria = 0, $unidadePlano = null, $afastamentosUsuario = []): float {
    $total = 0;
    foreach ($atividades as $atividade) { 
      $periodo = $inicio && $fim;
      if($periodo){
        $intersecao = UtilService::intersection([
              new Interval(['start' => strtotime($atividade['data_distribuicao']), 'end' => strtotime($atividade['prazo_entrega'])]), 
              new Interval(['start' => strtotime($inicio), 'end' => strtotime($fim)])
          ]);
        $hIntersecao = empty($intersecao) ? 0 : CalendarioService::calculaDataTempoUnidade(UtilService::asDateTime($intersecao->start), UtilService::asDateTime($intersecao->end), $cargaHoraria, $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->tempoUtil;
        $hPrazo = CalendarioService::calculaDataTempoUnidade(new DateTime($atividade['data_distribuicao']), new DateTime($atividade['prazo_entrega']), $cargaHoraria, $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->tempoUtil;
        $horasForaPeriodo = $hPrazo - $hIntersecao;
        $tempoPactuadoPrevistoNoPeriodo = ($horasForaPeriodo >= $atividade['tempo_pactuado']) ? 0 : $atividade['tempo_pactuado'] - $horasForaPeriodo;
      }
      $total += $periodo ? $tempoPactuadoPrevistoNoPeriodo : $atividade['tempo_pactuado']; 
    }
    return $total;
  } */

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
   * Retorna a soma dos tempos homologados ou pactuados das atividades recebidas no array, a depender do parâmetro $homologadas. Os tempos são calculados proporcionalmente dentro do período 
   * estabelecido pelos parâmetros $inicioPeriodo e $fimPeriodo. Para as atividades homologadas é utilizado o tempo_homologado e para as atividades não homologadas é utilizado o tempo_pactuado.
   * 
   * @param array     $atividades             Um array de atividades.
   * @param bool      $homologadas          Informa se o array passado como parâmetro se refere a atividades homologadas ou não.
   * @param string    $inicioPeriodo        Data inicial do período de pesquisa.
   * @param string    $fimPeriodo           Data final do período de pesquisa.
   * @param int|float $cargaHoraria         Carga horária do servidor, constante do seu Plano de Trabalho.
   * @param Unidade   $unidadePlano         Unidade à qual está vinculado o Plano de Trabalho.
   * @param array     $afastamentosUsuario  Array dos afastamentos do usuário.
   * @return float
   */
    /*   public function tempoAvaliado(array $atividades, bool $homologadas, string $inicioPeriodo, string $fimPeriodo, int|float $cargaHoraria, Unidade $unidadePlano, array $afastamentosUsuario): float {
    $total = 0.0;
    foreach ($atividades as $atividade) {
      $tempoTotalDemanda = CalendarioService::calculaDataTempoUnidade(new DateTime($atividade['data_inicio']), new DateTime($atividade['data_entrega']), $cargaHoraria, $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->tempoUtil;
      $marcoInicial = UtilService::maxDate(new DateTime($atividade['data_inicio']),new DateTime($inicioPeriodo));
      $marcoFinal = UtilService::minDate(new DateTime($atividade['data_entrega']),new DateTime($fimPeriodo));
      $tempoDemandaNoPeriodo = CalendarioService::calculaDataTempoUnidade($marcoInicial, $marcoFinal, $cargaHoraria, $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->tempoUtil;
      $tempoProporcional = $tempoTotalDemanda == 0 ? 0 : ($homologadas ? $atividade['tempo_homologado'] : $atividade['tempo_pactuado']) * ($tempoDemandaNoPeriodo / $tempoTotalDemanda); 
      $total += $tempoProporcional;
    }
    return $total;
  } */
}