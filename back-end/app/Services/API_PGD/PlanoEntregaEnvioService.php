<?php

namespace App\Services\API_PGD;

use App\Models\PlanoEntrega;
use App\Services\API_PGD\Builder\PlanoEntregaEnvioJobBuilder;
use Illuminate\Support\Facades\Log;

// classe responsavel por enviar o job de PE
class PlanoEntregaEnvioService
{
    public static function processar($tenantId, PlanoEntrega $planoEntrega, string $origem = '')
    {
        $job = PlanoEntregaEnvioJobBuilder::make($tenantId, $planoEntrega, $origem);
        if (!$job) {
            Log::info('PE não selecionável para envio');
            return false;
        }

        dispatch($job)->onConnection('rabbitmq')->onQueue('pgd_queue')->afterCommit();
        Log::info('PE agendado');
        return true;
    }
}
