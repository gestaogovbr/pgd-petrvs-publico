<?php

namespace App\Traits;
use App\Services\ServiceBase;

trait HasStatus
{
    public function statusInicial($action){
        // (RN_PENT_A) (RN_PTR_A) Quando um Plano de Entregas/Plano de Trabalho é criado adquire automaticamente o status INCLUIDO;
        if ($action == "INSERT") $this->status = "INCLUIDO";
    }

    public function atualizaHistorico($action, $justificativa){
        if ($action == "INSERT") {
            $this->service->atualizaStatus($this, 'INCLUIDO', $justificativa);
        }        
    }

}