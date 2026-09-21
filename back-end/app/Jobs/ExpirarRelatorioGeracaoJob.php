<?php

declare(strict_types=1);

namespace App\Jobs;

use App\V2\RelatorioGeracao\RelatorioGeracaoService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ExpirarRelatorioGeracaoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public const LIMITE_MINUTOS = 30;

    public const MENSAGEM_ERRO = 'Tempo Expirado';

    public int $tries = 1;

    public function __construct(public string $tenantId)
    {
        $this->onQueue('default');
    }

    public function handle(): void
    {
        $tenant = tenancy()->find($this->tenantId);
        if (!$tenant) {
            Log::warning('ExpirarRelatorioGeracaoJob: tenant não encontrado', [
                'tenantId' => $this->tenantId,
            ]);
            return;
        }

        $tenant->run(function (): void {
            $expiradas = app(RelatorioGeracaoService::class)->expirarGeracoesTravadas();
            if ($expiradas > 0) {
                Log::warning('Exportações de relatório marcadas como expiradas', [
                    'tenantId' => $this->tenantId,
                    'quantidade' => $expiradas,
                ]);
            }
        });
    }
}
