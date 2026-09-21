<?php

declare(strict_types=1);

namespace App\Jobs;

use App\V2\RelatorioGeracao\RelatorioGeracaoService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\TimeoutExceededException;
use Illuminate\Support\Facades\Log;
use Throwable;

class GerarRelatorioExcelJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public const CONNECTION = 'relatorio_exportacao';

    public const QUEUE = 'relatorio_exportacao';

    /** Tempo máximo de processamento: 30 minutos. */
    public const TIMEOUT_SECONDS = 1800;

    public const MENSAGEM_ERRO_TIMEOUT = 'A geração do relatório excedeu o tempo limite de 30 minutos. Refine os filtros e tente novamente.';

    public int $timeout = self::TIMEOUT_SECONDS;

    public int $tries = 1;

    public bool $failOnTimeout = true;

    public function __construct(
        public string $geracaoId,
        public string $tenantId,
    ) {
        $this->onConnection(self::CONNECTION);
        $this->onQueue(self::QUEUE);
    }

    public function handle(): void
    {
        $this->aplicarLimitesDeProcessamento();

        $tenant = tenancy()->find($this->tenantId);
        if (!$tenant) {
            Log::error('GerarRelatorioExcelJob: tenant não encontrado', [
                'tenantId' => $this->tenantId,
                'geracaoId' => $this->geracaoId,
            ]);
            return;
        }

        $tenant->run(function () {
            app(RelatorioGeracaoService::class)->processar($this->geracaoId);
        });
    }

    public function failed(?Throwable $exception): void
    {
        $tenant = tenancy()->find($this->tenantId);
        if (!$tenant) {
            return;
        }

        $tenant->run(function () use ($exception) {
            app(RelatorioGeracaoService::class)->marcarErro(
                $this->geracaoId,
                self::mensagemErro($exception),
            );
        });
    }

    public static function mensagemErro(?Throwable $exception): string
    {
        if ($exception instanceof TimeoutExceededException) {
            return self::MENSAGEM_ERRO_TIMEOUT;
        }

        $message = trim((string) $exception?->getMessage());

        return $message !== '' ? $message : 'Não foi possível gerar o relatório. Tente novamente.';
    }

    private function aplicarLimitesDeProcessamento(): void
    {
        set_time_limit(self::TIMEOUT_SECONDS);
        ini_set('max_execution_time', (string) self::TIMEOUT_SECONDS);
    }
}
