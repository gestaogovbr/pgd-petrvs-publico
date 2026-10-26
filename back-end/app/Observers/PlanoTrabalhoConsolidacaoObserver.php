<?php

namespace App\Observers;

use App\Models\PlanoTrabalhoConsolidacao;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Log;
use Throwable;

class PlanoTrabalhoConsolidacaoObserver
{
    public $afterCommit = true;

    public function __construct()
    {
        if (app()->environment('testing')) {
            $this->afterCommit = false;
        }
    }

    public function created(PlanoTrabalhoConsolidacao $model): void
    {
    }

    public function updated(PlanoTrabalhoConsolidacao $model): void
    {
        if (!tenancy()->initialized) {
            Log::warning('Tentativa de agendar envio de plano de trabalho sem tenant inicializado');
            return;
        }

        try {
            PlanoTrabalhoEnvioService::processar(tenant('id'), $model->planoTrabalho, 'PlanoTrabalhoConsolidacao');
        } catch (Throwable $e) {
            // afterCommit: a mudança de status já foi persistida. Falha no agendamento
            // de envio à API PGD não deve propagar erro para a requisição do usuário.
            self::logSeguro(
                "Falha ao agendar envio do {$model->planoTrabalho?->identificacaoEnvio()}: " . $e->getMessage()
            );
        }
    }

    private static function logSeguro(string $mensagem): void
    {
        try {
            Log::info($mensagem);
        } catch (Throwable) {
            error_log($mensagem);
        }
    }
}
