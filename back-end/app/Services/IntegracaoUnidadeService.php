<?php

namespace App\Services;

use App\Facades\SiapeLog;
use App\Services\ServiceBase;
use App\Services\Siape\Unidade\SiapeUnidadeLifecycleService;
use Throwable;

class IntegracaoUnidadeService extends ServiceBase
{
    public function __construct()
    {
        //
    }

    
    public function processaUnidadesRemovidasNoSiape(): void
    {
        try {
            /** @var SiapeUnidadeLifecycleService $lifecycleService */
            $lifecycleService = app(SiapeUnidadeLifecycleService::class);
            $resultado = $lifecycleService->iniciarInativacoesComBlacklistVencida();

            SiapeLog::info('Lifecycle SIAPE unidade: job de inicio de inativacao executado', $resultado);
        } catch (Throwable $e) {
            SiapeLog::error('Lifecycle SIAPE unidade: erro ao iniciar inativacao por blacklist vencida', [
                'erro' => $e->getMessage(),
            ]);
            throw $e;
        }
    }
}
