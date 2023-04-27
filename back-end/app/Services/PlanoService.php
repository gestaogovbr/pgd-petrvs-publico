<?php

namespace App\Services;

use App\Models\Plano;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Afastamento;
use App\Services\ServiceBase;
use App\Services\CalendarioService;
use App\Services\UtilService;
use App\Exceptions\ServerException;
use DateTime;
use App\Traits\UseDataFim;
use Illuminate\Database\Eloquent\Collection;

class PlanoService extends ServiceBase
{
  use UseDataFim;

  /**
   * Retorna todos os Planos de Trabalho de um determinado usuário, que ainda se encontram dentro da vigência
   *
   * @param   string  $usuario_id
   * @return  Illuminate\Database\Eloquent\Collection      
   */
  public function planosAtivos($usuario_id): Collection
  {
    return Plano::where("usuario_id", $usuario_id)->where("data_inicio_vigencia", "<=", now())->where("data_fim_vigencia", ">=", now())->get();
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
    return Plano::whereNull("data_fim")->where("usuario_id", $usuario_id)
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
    $usuario = Usuario::with(["lotacoes" => function ($query) {
      $query->whereNull("data_fim");
    }])->find($data["usuario_id"]);
    $criador = Usuario::with(["lotacoes" => function ($query) {
      $query->whereNull("data_fim");
    }])->find(parent::loggedUser()->id);
    $usuario_lotacoes_ids = $usuario->lotacoes->map(function ($item, $key) {
      return $item->unidade_id;
    })->all();
    $criador_lotacoes_ids = $criador->lotacoes->map(function ($item, $key) {
      return $item->unidade_id;
    })->all();
    if (!count(array_intersect($usuario_lotacoes_ids, $criador_lotacoes_ids)) && !parent::loggedUser()->hasPermissionTo('MOD_PTR_USERS_INCL')) {
      throw new ServerException("ValidatePlano", "Usuário do plano fora das lotações de quem está lançando o plano (MOD_PTR_USERS_INCL)");
    }
    if (!in_array($unidade_id, $usuario_lotacoes_ids) && !parent::loggedUser()->hasPermissionTo('MOD_PTR_INCL_SEM_LOT')) {
      throw new ServerException("ValidatePlano", "Usuário não lotado na unidade do plano (MOD_PTR_INCL_SEM_LOT)");
    }
    $planos = Plano::where("usuario_id", $data["usuario_id"])->where("usuario_id", $data["unidade_id"])->where("tipo_modalidade_id", $data["tipo_modalidade_id"])->whereNull("data_fim")->get();
    foreach ($planos as $plano) {
      if (
        UtilService::intersect($plano->data_inicio_vigencia, $plano->data_fim_vigencia, $data["data_inicio_vigencia"], $data["data_fim_vigencia"]) &&
        UtilService::valueOrNull($data, "id") != $plano->id && !parent::loggedUser()->hasPermissionTo('MOD_PTR_INTSC_DATA')
      ) {
        throw new ServerException("ValidatePlano", "O plano de trabalho #" . $plano->numero . " (" . UtilService::getDateTimeFormatted($plano->data_inicio_vigencia) . " à " . UtilService::getDateTimeFormatted($plano->data_fim_vigencia) . ") possui período conflitante para a mesma modalidade (MOD_PTR_INTSC_DATA)");
      }
    }
  }

  public function proxyStore($plano, $unidade, $action) {
    $this->documentoId = $plano["documento_id"];
    $plano["documento_id"] = null;
    return $plano;
  }

  public function extraStore($plano, $unidade, $action)
  {
    /* Adiciona a Lotação automaticamente case o usuário não tenha */
    $usuario = Usuario::with(["lotacoes" => function ($query) {
      $query->whereNull("data_fim");
    }])->find($plano->usuario_id);
    $usuario_lotacoes_ids = $usuario->lotacoes->map(function ($item, $key) {
      return $item->unidade_id;
    })->all();
    if (!in_array($plano->unidade_id, $usuario_lotacoes_ids)) {
      $this->lotacaoService->store([
        'usuario_id' => $plano->usuario_id,
        'unidade_id' => $plano->unidade_id,
        'principal' => false
      ], $unidade);
    }
  }

  public function metadados($plano, $inicioPeriodo, $fimPeriodo)
  {
    $result = [
      "concluido" => true,
      "produtividadeMedia" => 0,
      "horasDecorridas" => 0,
      "horasUteisDecorridas" => 0,
      "horasTotais" => 0,
      "tempoTotal" => $plano['tempo_total'],
      "demandasNaoIniciadas" => array_filter($plano['demandas'], fn ($demanda) => $demanda['data_inicio'] == null),
      "demandasEmAndamento" => array_filter($plano['demandas'], fn ($demanda) => $demanda['data_inicio'] != null && $demanda['data_entrega'] == null),
      "demandasConcluidas" => $this->demandasSoConcluidas($plano, $inicioPeriodo, $fimPeriodo),
      "demandasAvaliadas" => $this->demandasAvaliadas($plano, $inicioPeriodo, $fimPeriodo),
      "demandasCumpridas" => $this->demandasCumpridas($plano, $inicioPeriodo, $fimPeriodo),
      "horasDemandasNaoIniciadas" => 0,
      "horasDemandasEmAndamento" => 0,
      "horasDemandasConcluidas" => 0,
      "horasDemandasAvaliadas" => 0,
      "horasDemandasCumpridas" => 0
    ];

    /*  Nesse trecho, o método define se o plano foi concluído ou não.
        O plano será considerado CONCLUÍDO quando todas as suas demandas forem CUMPRIDAS. Uma demanda é considerada cumprida quando
        seu tempo homologado não for mais nulo. */
    foreach ($plano['demandas'] as $demanda) {
      if ($demanda['tempo_homologado'] == null) $result['concluido'] = false;
    }

    /* Nesse trecho, o método calcula o total de horas das demandas avaliadas, ou seja, a soma dos seus tempos homologados */
    foreach ($result['demandasAvaliadas'] as $demanda) {
      $result['horasDemandasAvaliadas'] += $demanda['tempo_homologado'];
    }

    /* Nesse trecho, o método calcula o total de horas das demandas ainda não iniciadas, ou seja, a soma dos seus tempos pactuados */
    foreach ($result['demandasNaoIniciadas'] as $demanda) {
      $result['horasDemandasNaoIniciadas'] += $demanda['tempo_pactuado'];
    }

    /* Nesse trecho, o método calcula o total de horas das demandas já iniciadas, mas ainda não concluídas, ou seja, a soma dos seus tempos pactuados */
    foreach ($result['demandasEmAndamento'] as $demanda) {
      $result['horasDemandasEmAndamento'] += $demanda['tempo_pactuado'];
    }

    /* Nesse trecho, o método calcula o total de horas das demandas cumpridas, ou seja, a soma dos seus tempos homologados */
    foreach ($result['demandasCumpridas'] as $demanda) {
      $result['horasDemandasCumpridas'] += $demanda['tempo_homologado'];
    }

    /* Nesse trecho, o método calcula o total das horas das demandas concluidas, ou seja, a soma dos seus tempos despendidos.
        Além disso, também calcula a produtividade média das demandas concluídas. */
    foreach ($result['demandasConcluidas'] as $demanda) {
      $result['horasDemandasConcluidas'] += $demanda['tempo_despendido'];
      $result['produtividadeMedia'] += $demanda['produtividade'];
    }
    $result['produtividadeMedia'] = count($result['demandasConcluidas']) ? $result['produtividadeMedia'] / count($result['demandasConcluidas']) : 0;
    $hi = new DateTime($plano['data_inicio_vigencia']);
    $hf = new DateTime('now', $hi->getTimezone());
    $result['horasDecorridas'] = $this->calendario->horasEntreDatas($hi, $hf);
    $hf = new DateTime($plano['data_fim_vigencia'], $hi->getTimezone());
    $result['horasTotais'] = $this->calendario->horasEntreDatas($hi, $hf);
    return $result;
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
    $plano = Plano::where('id', $plano_id)->with(['demandas', 'demandas.avaliacao', 'tipoModalidade'])->first()->toArray();
    $result = [
      "concluido" => true,
      "demandasNaoIniciadas" => $this->demandasNaoIniciadas($plano, null, null), //array_filter($plano['demandas'], fn($demanda) => $demanda['data_inicio'] == null),
      "demandasEmAndamento" => $this->demandasEmAndamento($plano, null, null), //array_filter($plano['demandas'], fn($demanda) => $demanda['data_inicio'] != null && $demanda['data_entrega'] == null),
      "demandasConcluidas" => $this->demandasSoConcluidas($plano, null, null),
      "demandasAvaliadas" => $this->demandasAvaliadas($plano, null, null),
      "horasAfastamentoDecorridas" => 0,
      "horasDemandasNaoIniciadas" => 0,
      "horasDemandasEmAndamento" => 0,
      "horasDemandasConcluidas" => 0,
      "horasDemandasAvaliadas" => 0,
      "horasTotaisAlocadas" => 0,
      "horasUteisAfastamento" => 0,
      "horasUteisDecorridas" => 0,
      "horasUteisTotais" => $plano['tempo_total'],
      "mediaAvaliacoes" => null,
      "modalidade" => $plano['tipo_modalidade']['nome'],
      "percentualHorasNaoIniciadas" => 0,
      "usuario_id" => $plano['usuario_id'],
      "noPeriodo" => [
        "demandasDistribuidas" => [], 
        "demandasNaoIniciadas" => [], 
        "demandasEmAndamento" => [], 
        "demandasSoConcluidas" => [], 
        "demandasReprovadas" => [], 
        "demandasAprovadas" => [],
        "horasUteisDisponiveisServidor" => 0, 
        "tempoTrabalhadoHomologado" => 0, 
        "tempoTrabalhadoNaoHomologado" => 0,
        "tempoDespendidoSoConcluidas" => 0, 
        "tempoTotalRealizadoNoPeriodo" => 0, 
        "tempoTotalAlocado" => 0,
        "tempoTotalNaoIniciadas" => 0,
        "tempoTotalEmAndamento" => 0,
        "tempoTotalSoConcluidas" => 0, 
        "tempoTotalReprovadas" => 0, 
        "tempoTotalAprovadas" => 0,
        "tempoPrevistoNaoIniciadasNoPeriodo" => 0, 
        "tempoPrevistoEmAndamentoNoPeriodo" => 0,
        "tempoPrevistoSoConcluidasNoPeriodo" => 0,
        "tempoPrevistoReprovadasNoPeriodo" => 0,
        "tempoPrevistoAprovadasNoPeriodo" => 0, 
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
    /*  Definição se o Plano de Trabalho foi concluído ou não. O plano será considerado CONCLUÍDO se não possuir nenhuma demanda OU quando todas as suas demandas forem CUMPRIDAS. Uma demanda é considerada cumprida quando
        seu tempo homologado não for mais nulo. */
    if (count($plano['demandas']) == 0) $result['concluido'] = true; else {
      foreach ($plano['demandas'] as $demanda) {
        if ($demanda['tempo_homologado'] == null) $result['concluido'] = false;
      }
    }
    /* Soma dos tempos pactuados das demandas */
    $result['horasDemandasNaoIniciadas'] = $this->somaTemposPactuados($result['demandasNaoIniciadas']);
    $result['horasDemandasEmAndamento'] = $this->somaTemposPactuados($result['demandasEmAndamento']);
    $result['horasDemandasConcluidas'] = $this->somaTemposPactuados($result['demandasConcluidas']);
    $result['horasDemandasAvaliadas'] = $this->somaTemposPactuados($result['demandasAvaliadas']);
    $result['horasTotaisAlocadas'] = $result['horasDemandasNaoIniciadas'] + $result['horasDemandasEmAndamento'] + $result['horasDemandasConcluidas'] + $result['horasDemandasAvaliadas'];
    /* Média das avaliações das demandas já avaliadas */
    $result['mediaAvaliacoes'] = (count($result['demandasAvaliadas']) == 0) ? null : $this->utilService->avg(array_map(fn ($d) => $d['avaliacao']['nota_atribuida'], $result['demandasAvaliadas']));
    /* Cálculo das estatísticas limitadas pelo período estabelecido, se houver um. */
    if($inicioPeriodo){ // se for solicitada a análise de um determinado período, obrigatoriamente serão fornecidos as datas de inicio e fim desse período
      $result['noPeriodo']['demandasDistribuidas'] = $this->demandasDistribuidas($plano, $inicioPeriodo, $fimPeriodo);
      $result['noPeriodo']['demandasNaoIniciadas'] = $this->demandasNaoIniciadas($plano, $inicioPeriodo, $fimPeriodo);
      $result['noPeriodo']['demandasEmAndamento'] = $this->demandasEmAndamento($plano, $inicioPeriodo, $fimPeriodo);
      $result['noPeriodo']['demandasSoConcluidas'] = $this->demandasSoConcluidas($plano, $inicioPeriodo, $fimPeriodo);
      $result['noPeriodo']['demandasReprovadas'] = $this->demandasReprovadas($plano, $inicioPeriodo, $fimPeriodo);
      $result['noPeriodo']['demandasAprovadas'] = $this->demandasAprovadas($plano, $inicioPeriodo, $fimPeriodo);
      $result['noPeriodo']['horasUteisDisponiveisServidor'] = CalendarioService::calculaDataTempoUnidade(new DateTime($inicioPeriodo), new DateTime($fimPeriodo), $plano['carga_horaria'], $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->tempoUtil;
      $result['noPeriodo']['tempoTotalAlocado'] = $this->somaTemposPactuados($result['noPeriodo']['demandasDistribuidas']);
      $result['noPeriodo']['tempoTotalNaoIniciadas'] = $this->somaTemposPactuados($result['noPeriodo']['demandasNaoIniciadas']);
      $result['noPeriodo']['tempoTotalEmAndamento'] = $this->somaTemposPactuados($result['noPeriodo']['demandasEmAndamento']);
      $result['noPeriodo']['tempoTotalSoConcluidas'] = $this->somaTemposPactuados($result['noPeriodo']['demandasSoConcluidas']);
      $result['noPeriodo']['tempoTotalReprovadas'] = $this->somaTemposPactuados($result['noPeriodo']['demandasReprovadas']);
      $result['noPeriodo']['tempoTotalAprovadas'] = $this->somaTemposPactuados($result['noPeriodo']['demandasAprovadas']);
      $result['noPeriodo']['tempoPrevistoNaoIniciadasNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['demandasNaoIniciadas'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      $result['noPeriodo']['tempoPrevistoEmAndamentoNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['demandasEmAndamento'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      $result['noPeriodo']['tempoPrevistoSoConcluidasNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['demandasSoConcluidas'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      $result['noPeriodo']['tempoPrevistoReprovadasNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['demandasReprovadas'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      $result['noPeriodo']['tempoPrevistoAprovadasNoPeriodo'] = $this->somaTemposPactuados($result['noPeriodo']['demandasAprovadas'], $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      $result['noPeriodo']['tempoTotalPrevistoNoPeriodo'] = $result['noPeriodo']['tempoPrevistoNaoIniciadasNoPeriodo'] + $result['noPeriodo']['tempoPrevistoEmAndamentoNoPeriodo'] + $result['noPeriodo']['tempoPrevistoSoConcluidasNoPeriodo'] + 
                                                            $result['noPeriodo']['tempoPrevistoReprovadasNoPeriodo'] + $result['noPeriodo']['tempoPrevistoAprovadasNoPeriodo'];
      $result['noPeriodo']['tempoTrabalhadoHomologado'] = $this->tempoAvaliado($result['noPeriodo']['demandasAprovadas'], true, $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      $result['noPeriodo']['tempoTrabalhadoNaoHomologado'] = $this->tempoAvaliado($result['noPeriodo']['demandasReprovadas'], false, $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      $result['noPeriodo']['tempoDespendidoSoConcluidas'] = $this->tempoAvaliado($result['noPeriodo']['demandasSoConcluidas'], false, $inicioPeriodo, $fimPeriodo, $plano['carga_horaria'], $unidadePlano, $afastamentosUsuario);
      $result['noPeriodo']['tempoTotalRealizadoNoPeriodo'] = $result['noPeriodo']['tempoTrabalhadoHomologado'] + $result['noPeriodo']['tempoTrabalhadoNaoHomologado'] + $result['noPeriodo']['tempoDespendidoSoConcluidas']; 
    }
      return $result;
  }

  /** 
   * Retorna um array com todas as demandas de um determinado Plano de Trabalho, cujas datas de distribuição ou de prazo_entrega estejam
   * dentro do período estabelecido. 
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
  public function demandasDistribuidas($plano, $inicioPeriodo, $fimPeriodo): array
  {
    $result = [];
    foreach ($plano['demandas'] as $demanda) {
      if($this->demandaService->withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo)) array_push($result, $demanda);
    }
    return $result;
  }

  /** 
   * Retorna um array com todas as demandas de um determinado Plano de Trabalho, ainda não iniciadas pelo servidor, cujas datas de início ou de entrega estejam
   * dentro do período estabelecido. Uma demanda é considerada não iniciada se o seu campo data_inicio é nulo. 
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
  public function demandasNaoIniciadas($plano, $inicioPeriodo, $fimPeriodo): array
  {
    $result = [];
    foreach ($plano['demandas'] as $demanda) {
      if(!$this->demandaService->isIniciada($demanda) && $this->demandaService->withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo)) array_push($result, $demanda);
    }
    return $result;
  }

  /** 
   * Retorna um array com todas as demandas em andamento de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma demanda é considerada em andamento se o seu campo data_inicio não é nulo e seu campo data_entrega é nulo. 
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
  public function demandasEmAndamento($plano, $inicioPeriodo, $fimPeriodo): array
  {
    $result = [];
    foreach ($plano['demandas'] as $demanda) {
      if($this->demandaService->isIniciada($demanda) && !$this->demandaService->isConcluida($demanda) && $this->demandaService->withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo)) array_push($result, $demanda);
    }
    return $result;
  }

  /** 
   * Retorna um array com todas as demandas só concluidas de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma demanda é considerada só concluída se o seu campo data_entrega não for nulo e se ainda não foi avaliada. 
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
  public function demandasSoConcluidas($plano, $inicioPeriodo, $fimPeriodo): array
  {
    $result = [];
    foreach ($plano['demandas'] as $demanda) {
      if ($this->demandaService->isConcluida($demanda) && !($this->demandaService->isAvaliada($demanda)) && $this->demandaService->withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo)) array_push($result, $demanda);
    }
    return $result;
  }

  /**
   * Retorna um array com todas as demandas avaliadas de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma demanda é considerada avaliada se o seu campo avalicao_id não for nulo.
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
  public function demandasAvaliadas($plano, $inicioPeriodo, $fimPeriodo): array
  {
    $result = [];
    foreach ($plano['demandas'] as $demanda) {
      if ($this->demandaService->isAvaliada($demanda) && $this->demandaService->withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo)) array_push($result, $demanda);
    }
    return $result;
  }

  /**
   * Retorna um array com todas as demandas aprovadas de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma demanda é considerada aprovada se a nota da sua avaliação foi maior ou igual a 5.0.
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
  public function demandasAprovadas($plano, $inicioPeriodo, $fimPeriodo): array
  {
    $result = [];
    foreach ($plano['demandas'] as $demanda) {
      if ($this->demandaService->isAprovada($demanda) && $this->demandaService->withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo)) array_push($result, $demanda);
    }
    return $result;
  }

  /**
   * Retorna um array com todas as demandas reprovadas de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma demanda é considerada reprovada se a nota da sua avaliação foi menor que 5.0.
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
  public function demandasReprovadas($plano, $inicioPeriodo, $fimPeriodo): array
  {
    $result = [];
    foreach ($plano['demandas'] as $demanda) {
      if ($this->demandaService->isReprovada($demanda) && $this->demandaService->withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo)) array_push($result, $demanda);
    }
    return $result;
  }

  /** 
   * Retorna um array com todas as demandas cumpridas de um determinado Plano de Trabalho, cujas data de início ou data de entrega estejam
   * dentro do período estabelecido. Uma demanda é considerada cumprida se o seu campo tempo_homologado não for nulo. 
   * 
   * @param   Plano   $plano          Plano de Trabalho a ser pesquisado.
   * @param   string  $inicioPeriodo  Data inicial do período.
   * @param   string  $fimPeriodo     Data final do período.
   * @return  array
   */
  public function demandasCumpridas($plano, $inicioPeriodo, $fimPeriodo): array
  {
    $result = [];
    foreach ($plano['demandas'] as $demanda) {
      if ($this->demandaService->isCumprida($demanda) && $this->demandaService->withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo)) array_push($result, $demanda);
    }
    return $result;
  }

  /**
   * Retorna a soma dos tempos pactuados de um array de demandas.
   * 
   * @param array $demandas
   * @return float
   */
  public function somaTemposPactuados(array $demandas, $inicio = null, $fim = null, $cargaHoraria = 0, $unidadePlano = null, $afastamentosUsuario = []): float {
    $total = 0;
    foreach ($demandas as $demanda) { 
      $periodo = $inicio && $fim;
      if($periodo){
        $intersecao = UtilService::intersection([
              new Interval(['start' => strtotime($demanda['data_distribuicao']), 'end' => strtotime($demanda['prazo_entrega'])]), 
              new Interval(['start' => strtotime($inicio), 'end' => strtotime($fim)])
          ]);
        $hIntersecao = empty($intersecao) ? 0 : CalendarioService::calculaDataTempoUnidade(UtilService::asDateTime($intersecao->start), UtilService::asDateTime($intersecao->end), $cargaHoraria, $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->tempoUtil;
        $hPrazo = CalendarioService::calculaDataTempoUnidade(new DateTime($demanda['data_distribuicao']), new DateTime($demanda['prazo_entrega']), $cargaHoraria, $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->tempoUtil;
        $horasForaPeriodo = $hPrazo - $hIntersecao;
        $tempoPactuadoPrevistoNoPeriodo = ($horasForaPeriodo >= $demanda['tempo_pactuado']) ? 0 : $demanda['tempo_pactuado'] - $horasForaPeriodo;
      }
      $total += $periodo ? $tempoPactuadoPrevistoNoPeriodo : $demanda['tempo_pactuado']; 
    }
    return $total;
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
   * Retorna a soma dos tempos homologados ou pactuados das demandas recebidas no array, a depender do parâmetro $homologadas. Os tempos são calculados proporcionalmente dentro do período 
   * estabelecido pelos parâmetros $inicioPeriodo e $fimPeriodo. Para as demandas homologadas é utilizado o tempo_homologado e para as demandas não homologadas é utilizado o tempo_pactuado.
   * 
   * @param array     $demandas             Um array de demandas.
   * @param bool      $homologadas          Informa se o array passado como parâmetro se refere a demandas homologadas ou não.
   * @param string    $inicioPeriodo        Data inicial do período de pesquisa.
   * @param string    $fimPeriodo           Data final do período de pesquisa.
   * @param int|float $cargaHoraria         Carga horária do servidor, constante do seu Plano de Trabalho.
   * @param Unidade   $unidadePlano         Unidade à qual está vinculado o Plano de Trabalho.
   * @param array     $afastamentosUsuario  Array dos afastamentos do usuário.
   * @return float
   */
  public function tempoAvaliado(array $demandas, bool $homologadas, string $inicioPeriodo, string $fimPeriodo, int|float $cargaHoraria, Unidade $unidadePlano, array $afastamentosUsuario): float {
    $total = 0.0;
    foreach ($demandas as $demanda) {
      $tempoTotalDemanda = CalendarioService::calculaDataTempoUnidade(new DateTime($demanda['data_inicio']), new DateTime($demanda['data_entrega']), $cargaHoraria, $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->tempoUtil;
      $marcoInicial = UtilService::maxDate(new DateTime($demanda['data_inicio']),new DateTime($inicioPeriodo));
      $marcoFinal = UtilService::minDate(new DateTime($demanda['data_entrega']),new DateTime($fimPeriodo));
      $tempoDemandaNoPeriodo = CalendarioService::calculaDataTempoUnidade($marcoInicial, $marcoFinal, $cargaHoraria, $unidadePlano, "HORAS_UTEIS", null, $afastamentosUsuario)->tempoUtil;
      $tempoProporcional = $tempoTotalDemanda == 0 ? 0 : ($homologadas ? $demanda['tempo_homologado'] : $demanda['tempo_pactuado']) * ($tempoDemandaNoPeriodo / $tempoTotalDemanda); 
      $total += $tempoProporcional;
    }
    return $total;
  }
}