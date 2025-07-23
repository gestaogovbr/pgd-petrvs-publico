<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\AtividadeTarefa;
use App\Models\Avaliacao;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\TipoAvaliacao;
use App\Models\TipoAvaliacaoNota;
use App\Services\ServiceBase;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Throwable;

class AvaliacaoService extends ServiceBase
{
  public function validateStore($data, $unidade, $action) {
    if($action == ServiceBase::ACTION_INSERT) {
      $avaliacao = Avaliacao::where('plano_trabalho_consolidacao_id', $data['plano_trabalho_consolidacao_id'])
                            ->whereNotNull('recurso')
                            ->first();
      if(!empty($avaliacao)){
        $tipoAvaliacaoNota = TipoAvaliacaoNota::find($avaliacao->tipo_avaliacao_nota_id);
        $tipoAvaliacaoNotaNova = TipoAvaliacaoNota::find($data['tipo_avaliacao_nota_id']);
        if($tipoAvaliacaoNotaNova->sequencia > $tipoAvaliacaoNota->sequencia) throw new ServerException("ValidateAvaliacao", "Você não pode atribuir uma nota inferior a que já foi atribuída.");
      }
    }
}

  public function proxyStore(&$avaliacao, $unidade, $action)
  {
    $avaliacao["data_avaliacao"] = $this->unidadeService->hora($unidade?->id);
    $avaliacao["avaliador_id"] = $this->usuarioService->loggedUser()->id;
    $avaliacao["recurso"] = null;
    return $avaliacao;
  }

  public function extraStore($avaliacao, $unidade, $action)
  {
    /* (RN_AVL_5) [PT] Ao realizar qualquer avaliação o status da consolidação deverá ir para AVALIADO; */
    if (!empty($avaliacao->plano_trabalho_consolidacao_id)) {
      $this->planoTrabalhoConsolidacaoService->avaliar($avaliacao);
    } else if (!empty($avaliacao->plano_entrega_id)) {
      $this->planoEntregaService->avaliar($avaliacao);
    }
  }

  public function recorrer($id, $recurso)
  {
    $avaliacao = Avaliacao::find($id);
    $outrasAvaliacoesComRecurso = Avaliacao::where('plano_trabalho_consolidacao_id', $avaliacao->plano_trabalho_consolidacao_id)
      ->where('id', '!=', $id)
      ->whereNotNull('recurso')
      ->get();
    if ($outrasAvaliacoesComRecurso->count() > 0) {
      throw new ServerException("ValidateRecursoAvaliacao", "Só é possível recorrer uma vez por avaliação.");
    }
    $avaliacao->recurso = $recurso;
    $avaliacao->data_recurso = Carbon::now();
    $avaliacao->save();
    return true;
  }

  public function cancelarAvaliacao($id)
  {
    $avaliacao = Avaliacao::find($id);
    $consolidacao = !empty($avaliacao->plano_trabalho_consolidacao_id) ? PlanoTrabalhoConsolidacao::find($avaliacao->plano_trabalho_consolidacao_id) : null;
    $planoEntrega = !empty($avaliacao->plano_entrega_id) ? PlanoEntrega::find($avaliacao->plano_entrega_id) : null;
    try {
      DB::beginTransaction();
      if (!empty($consolidacao)) {
        $consolidacao->avaliacao_id = null;
        $consolidacao->save();
        $this->statusService->atualizaStatus($consolidacao, 'CONCLUIDO');
      } else if (!empty($planoEntrega)) {
        $planoEntrega->avaliacao_id = null;
        $planoEntrega->save();
        $this->statusService->atualizaStatus($planoEntrega, 'CONCLUIDO');
      }
      DB::commit();
    } catch (Throwable $e) {
      DB::rollback();
      throw $e;
    }
  }
}
