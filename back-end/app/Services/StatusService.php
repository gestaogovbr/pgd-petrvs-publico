<?php

namespace App\Services;

use App\Services\ServiceBase;
use Throwable;

class StatusService extends ServiceBase
{
    public function atualizaStatus($entity, $novoStatus, $justificativa, $usuarioId = null) {
        try {
            if(!empty($entity)) {
                //$statusHistorico-> checar se o ultimo status do histório já não é o mesmo do novoStatus
                $entity->statusHistorico()->create([
                    'codigo' => $novoStatus,
                    'justificativa' => $justificativa,
                    'usuario_id' => empty($usuarioId) ? parent::loggedUser()->id : $usuarioId        
                ])->save();
                $entity->status = $novoStatus;
                $entity->save();
            }
        } catch (Throwable $e) { 
            throw $e; }
    }
}