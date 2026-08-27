<?php

namespace App\Observers;

use App\Models\StatusJustificativa;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Log;
use Throwable;

class StatusJustificativaObserver
{
    public $afterCommit = true;

    public function __construct()
    {
        if (app()->environment('testing')) {
            $this->afterCommit = false;
        }
    }

    public function created(StatusJustificativa $model)
    {
        if ($model->isFromPlanoTrabalho() && $model->isAtivo()) {
            if (!tenancy()->initialized) {
                self::logSeguro('Tentativa de agendar envio de plano de trabalho sem tenant inicializado');
                return true;
            }

            try {
                PlanoTrabalhoEnvioService::processar(tenant('id'), $model->planoTrabalho);
            } catch (Throwable $e) {
                // afterCommit: status já persistido; não propagar falha de log/envio para a API
                self::logSeguro(
                    "Falha ao agendar envio do {$model->planoTrabalho?->identificacaoEnvio()}: " . $e->getMessage()
                );
            }
        }

        if ($model->isFromPlanoEntrega() && $model->isAtivo()) {
            if (!tenancy()->initialized) {
                self::logSeguro('Tentativa de agendar envio de plano de entrega sem tenant inicializado');
                return true;
            }

            try {
                PlanoEntregaEnvioService::processar(tenant('id'), $model->planoEntrega, 'StatusJustificativa');
            } catch (Throwable $e) {
                self::logSeguro('Falha ao agendar envio do PE: ' . $e->getMessage());
            }
        }

        return true;
    }

    private static function logSeguro(string $mensagem): void
    {
        try {
            Log::warning($mensagem);
        } catch (Throwable) {
            error_log($mensagem);
        }
    }
}
