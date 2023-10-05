<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\AtividadeTarefa;
use App\Models\Avaliacao;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Services\ServiceBase;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Throwable;

class AvaliacaoService extends ServiceBase {

    public function proxyStore(&$avaliacao, $unidade, $action){
        $avaliacao["data_avaliacao"] = $this->unidadeService->hora($unidade?->id);
        $avaliacao["avaliador_id"] = $this->usuarioService->loggedUser()->id;
        $avaliacao["recurso"] = null;
        return $avaliacao;
    }

    public function extraStore($avaliacao, $unidade, $action)
    {
      /* (RN_AVL_5) [PT] Ao realizar qualquer avaliação o status da consolidação deverá ir para AVALIADO; */
      if(!empty($avaliacao->plano_trabalho_consolidacao_id)) {
        $this->status->atualizaStatus($avaliacao->planoTrabalhoConsolidacao, 'AVALIADO');
      }
    }    

    public function recorrer($id, $recurso) {
        $avaliacao = Avaliacao::find($id);
        $avaliacao->recurso = $recurso;
        $avaliacao->save();
        return true;
    }

    public function cancelarAvaliacao($id) {
        $avaliacao = Avaliacao::find($id);
        $consolidacao = !empty($avaliacao->plano_trabalho_consolidacao_id) ? PlanoTrabalhoConsolidacao::find($avaliacao->plano_trabalho_consolidacao_id) : null;
        $planoEntrega = !empty($avaliacao->plano_entrega_id) ? PlanoEntrega::find($avaliacao->plano_entrega_id) : null;
        if(!empty($consolidacao)) {
            try {
                DB::beginTransaction();
                $consolidacao->avaliacao_id = null;
                $consolidacao->save();
                $this->status->atualizaStatus($consolidacao, 'AVALIADO');
                DB::commit();
            } catch (Throwable $e) {
                DB::rollback();
                throw $e;
            }
        }
    }
}
