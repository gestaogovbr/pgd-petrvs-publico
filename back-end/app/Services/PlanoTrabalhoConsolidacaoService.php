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
use App\Models\Atividade;
use App\Models\Documento;
use App\Models\PlanoTrabalhoConsolidacao;
use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Eloquent\Collection;

class PlanoTrabalhoConsolidacaoService extends ServiceBase
{
  /** 
   * Retorna dados de atividades, atividades da consolidacao, ocorrencias, afastamentos e entregas do plano
   * 
   * @param   string  $id       O ID da Consolidação do Plano de Trabalho.
   * @return  array
   */
  public function consolidacaoDados($id): array
  {
    $consolidacao = PlanoTrabalhoConsolidacao::with(['ocorrencias', 'atividades', 'planoTrabalho.entregas.entrega'])->find($id);
    $planoTrabalho = $consolidacao->planoTrabalho;
    $atividades = Atividade::with(['demandante', 'usuario', 'tipoAtividade'])->
      where('prazo_entrega', '>=', $consolidacao->data_inicio)->
      where('data_distribuicao', '<=', $consolidacao->data_fim)->
      where('usuario_id', $planoTrabalho->usuario_id)->get();
    $afastamentos = Afastamento::with(['tipoMotivoAfastamento'])->
      where("fim_afastamento", ">=", $consolidacao->data_inicio)->
      where('inicio_afastamento', '<=', $consolidacao->data_fim)->
      where('usuario_id', $planoTrabalho->usuario_id)->get();
    return [
      'atividades' => $atividades,
      'consolidaoAtividades' => $consolidacao->atividades ?? [],
      'entregas' => $consolidacao->planoTrabalho->entregas ?? [],
      'afastamentos' => $afastamentos
    ];
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