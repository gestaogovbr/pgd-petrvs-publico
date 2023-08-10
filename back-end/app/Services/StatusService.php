<?php

namespace App\Services;

use App\Models\Atividade;
use App\Models\Status;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Services\ServiceBase;
use Throwable;

class StatusService extends ServiceBase
{
    public function atualizaStatus($model, $id, $novoStatus, $justificativa, $usuarioId = null) {
        $entity = $model == 'PLANO_ENTREGA' ? PlanoEntrega::find($id) : ($model == 'PLANO_TRABALHO' ? PlanoTrabalho::find($id) : ($model == 'PLANO_TRABALHO_CONSOLIDACAO' ? PlanoTrabalhoConsolidacao::find($id) : ($model == 'ATIVIDADE' ? Atividade::find($id) : null)));
        try {
            if(!empty($entity)) {
                if($entity->statusAtual) $entity->statusAtual->delete();
                Status::create([
                    'codigo' => $novoStatus,
                    'justificativa' => $justificativa,
                    'plano_entrega_id' => $model == 'PLANO_ENTREGA' ? $id : null,
                    'plano_trabalho_id' => $model == 'PLANO_TRABALHO' ? $id : null,
                    'plano_trabalho_consolidacao_id' => $model == 'PLANO_TRABALHO_CONSOLIDACAO' ? $id : null,
                    'atividade_id' => $model == 'ATIVIDADE' ? $id : null,
                    'usuario_id' => empty($usuarioId) ? parent::loggedUser()->id : $usuarioId        
                ])->save();
            }
        } catch (Throwable $e) { 
            throw $e; }
    }
}