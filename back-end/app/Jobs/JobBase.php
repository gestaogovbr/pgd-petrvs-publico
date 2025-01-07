<?php

namespace App\Jobs;

use Exception;
use App\Exceptions\LogError;
use App\Models\JobSchedule;
use App\Services\TenantConfigurationsService;
use Illuminate\Support\Facades\Log;

class JobBase
{
    private CONST BASE_NAMESPACE = 'App\\Jobs\\';

    public function __construct(protected readonly JobSchedule $job)
    {
        // Log::alert("JobBase: " . $job->nome);
    }

    public function handle()
    {
        try {
    
            $fullClassName = self::BASE_NAMESPACE . $this->job->classe;
            if (!class_exists($fullClassName)) {
                LogError::newWarn("A classe do job '{$this->job->classe}' não existe.");
                return  false;
            }

            $jobClass = app($fullClassName);

            if ($this->job->tenant_id) {
                $this->inicializeTenant();
                $this->loadingTenantConfigurationMiddleware($this->job->tenant_id);
                dispatch(new $jobClass($this->job->tenant_id));
            } else {
                dispatch(new $jobClass());
            }
        } catch (Exception $e) {
            Log::error("Erro ao processar Job: '{$this->job->nome}' - Erro: " . $e->getMessage());
            LogError::newWarn("Erro ao processar Job: '{$this->job->nome}' - Erro: " . $e->getMessage());
            return false; 
        }
    }

    private function inicializeTenant(): void
    {
        if (is_null($this->job->tenant_id)) {
            return;
        }
        $tenant = tenancy()->find($this->job->tenant_id);
        ($tenant) ? tenancy()->initialize($tenant) : LogError::newWarn("Tenant não encontrado.");
    }

    private function loadingTenantConfigurationMiddleware(string $tenantId): void
    {
        $tenantConfigurations = new TenantConfigurationsService();
        $tenantConfigurations->handle($tenantId);
    }

    public function getJob(): JobSchedule
    {
        return $this->job;
    }
}
