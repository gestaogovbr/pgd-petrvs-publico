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

class ExcluirRelatorioGeracaoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public const RETENCAO_HORAS = 24;

    public int $tries = 1;

    public function __construct(public string $tenantId)
    {
        $this->onQueue('default');
    }

    public function handle(): void
    {
        $tenant = tenancy()->find($this->tenantId);
        if (!$tenant) {
            Log::warning('ExcluirRelatorioGeracaoJob: tenant não encontrado', [
                'tenantId' => $this->tenantId,
            ]);
            return;
        }

        $tenant->run(function (): void {
            $excluidas = app(RelatorioGeracaoService::class)->excluirGeracoesAntigas();
            if ($excluidas > 0) {
                Log::info('Exportações de relatório excluídas após o prazo de retenção', [
                    'tenantId' => $this->tenantId,
                    'quantidade' => $excluidas,
                    'retencaoHoras' => self::RETENCAO_HORAS,
                ]);
            }
        });
    }
}
