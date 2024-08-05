<?php
namespace App\Services\API_PGD\AuditSources;

class PlanoEntregaAuditSource extends AuditSource
{
    public function getData() { 
        return $this->getDataFromView('entrega');
    }
}

