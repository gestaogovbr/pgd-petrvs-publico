<?php

namespace App\Services;

use App\Models\Error;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

/**
 * @property TenantConfigurationsService $TenantConfigurationsService
 */
class EnvioService extends ServiceBase {

    public function reiniciar() {
        DB::statement("UPDATE usuarios SET data_envio_api_pgd = null");
        DB::statement("UPDATE planos_trabalhos SET data_envio_api_pgd = null");
        DB::statement("UPDATE planos_entregas SET data_envio_api_pgd = null");
        DB::statement("UPDATE audits SET enviado = 0");
    }
}
