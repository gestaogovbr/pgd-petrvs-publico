<?php

namespace App\Services;

use App\Services\ServiceBase;
use Throwable;

class StatusService extends ServiceBase
{
    public function atualizaStatus($entity, $novoStatus, $justificativa, $usuarioId = null) {
        try {
            if(!empty($entity)) {
                if($entity->statusAtual) $entity->statusAtual->delete();
                $status = $entity->statusHistorico()->create([
                    'codigo' => $novoStatus,
                    'justificativa' => $justificativa,
                    'usuario_id' => empty($usuarioId) ? parent::loggedUser()->id : $usuarioId        
                ]);
                $entity->status_id = $status->id;
                $entity->save();
            }
        } catch (Throwable $e) { 
            throw $e; }
    }
}