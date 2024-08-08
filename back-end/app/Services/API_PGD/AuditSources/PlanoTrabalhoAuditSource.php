<?php
namespace App\Services\API_PGD\AuditSources;

class PlanoTrabalhoAuditSource extends AuditSource
{
    public function getData() { 
        return $this->getDataFromView('trabalho');
    }

}

