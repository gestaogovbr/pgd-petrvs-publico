<?php

namespace App\Jobs;

use App\Facades\SipecLog;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\Sipec\Gestor\SipecGestorIntegracaoService;
use App\Services\Sipec\Servidor\SipecServidorAtualizacaoService;
use App\Services\Sipec\Servidor\SipecServidorIntegracaoService;
use App\Services\Sipec\SipecService;
use App\Services\Sipec\Unidade\SipecUnidadeAtualizacaoService;
use App\Services\Sipec\Unidade\SipecUnidadeIntegracaoService;
use App\Services\TenantConfigurationsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

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
        $inicio = microtime(true);

        try {
            SipecLog::info('Job START', ['tenant' => $this->tenantId]);

            $this->inicializarTenant();

            if (!$this->coletarDadosDaApi()) {
                return;
            }

            $this->sincronizarUnidades();
            $this->sincronizarServidores();
            $this->sincronizarGestores();

            $duracao = round(microtime(true) - $inicio, 2);
            SipecLog::info('Job END', ['duracao_segundos' => $duracao]);
        } catch (\Throwable $e) {
            $duracao = round(microtime(true) - $inicio, 2);
            SipecLog::error('Job FALHOU', [
                'erro' => $e->getMessage(),
                'duracao_segundos' => $duracao,
            ]);
            report($e);
        }
    }

    /**
     * Coleta dados da API SIPEC (REST) e grava nas tabelas sipec_*.
     *
     * @return bool true se concluiu, false se locked (deve abortar)
     */
    private function coletarDadosDaApi(): bool
    {
        SipecLog::info('Fase 0: coleta API iniciada');

        $sipecService = app(SipecService::class);
        $resultado = $sipecService->executarFase0($this->tenantId);

        if ($resultado['status'] === 'locked') {
            SipecLog::warning('Fase 0 já em execução, abortando.');
            return false;
        }

        SipecLog::info('Fase 0 concluída', [
            'unidades_coletadas' => $resultado['unidades'] ?? null,
            'servidores_coletados' => $resultado['servidores'] ?? null,
        ]);

        return true;
    }

    /**
     * Processa unidades: sipec_unidades → integracao_unidades → unidades
     */
    private function sincronizarUnidades(): void
    {
        SipecLog::info('Fase 1: Unidades - iniciada');

        $integracaoResult = app(SipecUnidadeIntegracaoService::class)->processar();
        SipecLog::info('Fase 1a concluída (integração)', $integracaoResult);

        $atualizacaoResult = app(SipecUnidadeAtualizacaoService::class)->processar();
        SipecLog::info('Fase 1b concluída (atualização)', $atualizacaoResult);
    }

    /**
     * Processa servidores: sipec_servidores → integracao_servidores → usuarios/lotações
     */
    private function sincronizarServidores(): void
    {
        SipecLog::info('Fase 2: Servidores - iniciada');

        $integracaoResult = app(SipecServidorIntegracaoService::class)->processar();
        SipecLog::info('Fase 2a concluída (integração)', $integracaoResult);

        $atualizacaoResult = app(SipecServidorAtualizacaoService::class)->processar();
        SipecLog::info('Fase 2b concluída (atualização)', $atualizacaoResult);
    }

    /**
     * Atribui gestores (titular) baseando-se nos CPFs de integracao_unidades.
     */
    private function sincronizarGestores(): void
    {
        SipecLog::info('Fase 3: Gestores - iniciada');

        $resultado = app(SipecGestorIntegracaoService::class)->processar();
        SipecLog::info('Fase 3 concluída', $resultado);
    }

    private function inicializarTenant(): void
    {
        if (!$this->tenantId) {
            return;
        }

        $tenant = tenancy()->find($this->tenantId);
        if ($tenant) {
            tenancy()->initialize($tenant);
        }

        (new TenantConfigurationsService())->handle($this->tenantId);
    }
}
