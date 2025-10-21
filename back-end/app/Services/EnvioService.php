<?php

namespace App\Services;

use App\Jobs\ExportarTenantJob;
use App\Models\Error;
use App\Services\ServiceBase;
use DB;

class EnvioService extends ServiceBase {

    public function reiniciar() {
        DB::statement("UPDATE usuarios SET data_envio_api_pgd = null");
        DB::statement("UPDATE planos_trabalhos SET data_envio_api_pgd = null");
        DB::statement("UPDATE planos_entregas SET data_envio_api_pgd = null");
        DB::statement("UPDATE audits SET enviado = 0");
    }

    public function forcarEnvio(string $tenantId)
    {
        $tenant = tenancy()->find($tenantId);
        tenancy()->initialize($tenant);

        $this->TenantConfigurationsService->handle($tenantId);
        ExportarTenantJob::dispatch($tenantId);
    }
}
