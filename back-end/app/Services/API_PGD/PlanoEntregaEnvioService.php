<?php

namespace App\Services\API_PGD;

use App\Models\PlanoEntrega;
use App\Services\API_PGD\Builder\PlanoEntregaEnvioJobBuilder;

// classe responsavel por enviar o job de PE
class PlanoEntregaEnvioService
{
    public static function processar($tenantId, PlanoEntrega $planoEntrega, string $origem = '')
    {
        $job = PlanoEntregaEnvioJobBuilder::make($tenantId, $planoEntrega, $origem);
        if ($job) {
            dispatch($job)->onConnection('rabbitmq')->onQueue('pgd_queue');
             \Log::info('Plano de Entrega agendado');
        } else {
            \Log::info('Plano de Entrega não selecionável para envio');
        }
    }
}
