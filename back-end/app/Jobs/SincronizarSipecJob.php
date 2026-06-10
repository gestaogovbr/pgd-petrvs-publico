<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\Entidade;
use App\Services\IntegracaoService;
use App\Services\Sipec\IntegracaoSipecService;
use App\Services\Sipec\SipecService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SincronizarSipecJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 0;

    public function __construct(private readonly ?string $tenantId = null)
    {
        $this->queue = 'sipec_queue';
    }

    public static function getDescricao(): string
    {
        return "Sincronizar SIPEC";
    }

    public function handle(): void
    {
        ini_set('memory_limit', '-1');

        try {
            Log::info("Job SincronizarSipec START");

            $sipecService = app(SipecService::class);
            $integracaoSipecService = app(IntegracaoSipecService::class);

            // FASE 0: Busca dados da API SIPEC e grava nas tabelas intermediárias
            Log::info("SincronizarSipec: Buscando unidades da API SIPEC...");
            $totalUnidades = $sipecService->buscarTodasUnidades();
            Log::info("SincronizarSipec: {$totalUnidades} unidades gravadas em sipec_unidades");

            Log::info("SincronizarSipec: Buscando servidores da API SIPEC...");
            $totalServidores = $sipecService->buscarTodosServidores();
            Log::info("SincronizarSipec: {$totalServidores} servidores gravados em sipec_servidores");

            // FASE 1-3: Processa dados intermediários e sincroniza
            $this->sincronizarEntidades($integracaoSipecService);

            Log::info("Job SincronizarSipec END");
        } catch (\Exception $e) {
            Log::error("Erro ao processar Job SincronizarSipec: " . $e->getMessage());
        }
    }

    private function sincronizarEntidades(IntegracaoSipecService $integracaoSipecService): void
    {
        $integracaoService = new IntegracaoService([], $this->tenantId);

        $integracaoService->integracaoServiceAdapter = $integracaoSipecService;

        $entidades = Entidade::all();
        $inputs = [
            'unidades' => true,
            'servidores' => true,
            'gestores' => true,
        ];

        foreach ($entidades as $entidade) {
            $inputs['entidade'] = $entidade->id;
            Log::info("SincronizarSipec: Sincronizando entidade " . json_encode($inputs));
            $integracaoService->sincronizar($inputs);
        }
    }
}
