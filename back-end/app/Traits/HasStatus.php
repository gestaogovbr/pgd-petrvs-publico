<?php

namespace App\Traits;
use App\Services\ServiceBase;
use App\Services\StatusService;

trait HasStatus
{
    public $service = new StatusService();

    public function statusInicial($action){
        // (RN_PENT_A) (RN_PTR_A) Quando um Plano de Entregas/Plano de Trabalho é criado adquire automaticamente o status INCLUIDO;
        if ($action == ServiceBase::ACTION_INSERT) $this->status = "INCLUIDO";
    }

    public function atualizaHistorico($action, $justificativa){
        if ($action == ServiceBase::ACTION_INSERT) {
            $this->service->atualizaStatus($this, 'INCLUIDO', $justificativa);
        }        
    }

}