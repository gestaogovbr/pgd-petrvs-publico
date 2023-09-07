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
    $consolidacao = PlanoTrabalhoConsolidacao::with([
      'ocorrencias', 
      'planoTrabalho.entregas.entrega', 
      'planoTrabalho.entregas.planoEntregaEntrega:id,descricao,plano_entrega_id,entrega_id', 
      'planoTrabalho.entregas.planoEntregaEntrega.entrega:id,nome,tipo_indicador', 
      'planoTrabalho.tipoModalidade'
    ])->find($id);
    $planosEntregasIds = array_map(fn($pe) => $pe->planoEntregaEntrega->plano_entrega_id, $consolidacao->planoTrabalho->entregas?->all() ?? []);
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
      'atividades' => array_map(fn($atividade) => array_merge($atividade->toArray(), ["metadados" => $this->atividadeService->metadados($atividade)]), $atividades->all()),
      'consolidaoAtividades' => $consolidacao->atividades ?? [],
      'planoTrabalho' => $consolidacao->planoTrabalho,
      'planosEntregas' => PlanoEntrega::whereIn("id", $planosEntregasIds)->get(),
      'ocorrencias' => $consolidacao->ocorrencias ?? [],
      'afastamentos' => $afastamentos
    ];
  }
}