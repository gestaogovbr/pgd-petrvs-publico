<?php
namespace App\Services\API_PGD\AuditSources;

class ParticipanteAuditSource extends AuditSource
{
    public function getData() { 
        return $this->getDataFromView('participante');
    }
}