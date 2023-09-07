<?php

namespace App\Services;

use App\Models\Afastamento;
use App\Services\ServiceBase;
use App\Models\Atividade;
use App\Models\PlanoTrabalhoConsolidacao;

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
      where('data_estipulada_entrega', '>=', $consolidacao->data_inicio)->
      where('data_distribuicao', '<=', $consolidacao->data_fim)->
      where('usuario_id', $planoTrabalho->usuario_id)->get();
    $afastamentos = Afastamento::with(['tipoMotivoAfastamento'])->
      where("data_fim", ">=", $consolidacao->data_inicio)->
      where('data_inicio', '<=', $consolidacao->data_fim)->
      where('usuario_id', $planoTrabalho->usuario_id)->get();
    return [
      'atividades' => $atividades,
      'consolidaoAtividades' => $consolidacao->atividades ?? [],
      'entregas' => $consolidacao->planoTrabalho->entregas ?? [],
      'ocorrencias' => $consolidacao->ocorrencias ?? [],
      'afastamentos' => $afastamentos
    ];
  }
}