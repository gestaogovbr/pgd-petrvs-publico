<?php

namespace App\Observers;

use App\Models\PlanoTrabalho;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Log;
use Throwable;

class PlanoTrabalhoObserver
{
    public $afterCommit = true;
    public static bool $skipProcessar = false;

    public function __construct()
    {
        if (app()->environment('testing')) {
            $this->afterCommit = false;
        }
    }

    public function created(PlanoTrabalho $planoTrabalho): void
    {
    }

    public function updated(PlanoTrabalho $planoTrabalho)
    {
        if (self::$skipProcessar) {
            return true;
        }

        if (!tenancy()->initialized) {
            self::logSeguro('Tentativa de agendar envio de plano de trabalho sem tenant inicializado');
            return true;
        }

        try {
            PlanoTrabalhoEnvioService::processar(tenant('id'), $planoTrabalho, 'PlanoTrabalho');
        } catch (Throwable $e) {
            // afterCommit: a alteração do PT já foi persistida; falha de log/envio não deve quebrar a requisição
            self::logSeguro(
                "Falha ao agendar envio do {$planoTrabalho->identificacaoEnvio()}: " . $e->getMessage()
            );
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
