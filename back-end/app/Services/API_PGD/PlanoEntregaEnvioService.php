<?php

namespace App\Services\API_PGD;

use App\Models\PlanoEntrega;
use App\Services\API_PGD\Builder\PlanoEntregaEnvioJobBuilder;

// classe responsavel por enviar o job de PE
class PlanoEntregaEnvioService
{
    public static function processar($tenantId, PlanoEntrega $planoEntrega)
    {
        $job = PlanoEntregaEnvioJobBuilder::make($tenantId, $planoEntrega);
        dispatch($job)->onConnection('rabbitmq')->onQueue('pgd_queue');
    }
}
