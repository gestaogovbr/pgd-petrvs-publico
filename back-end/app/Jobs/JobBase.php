<?php

namespace App\Jobs;

use Exception;
use App\Exceptions\LogError;
use App\Models\JobSchedule;
use Illuminate\Support\Facades\Log;

class JobBase
{
    private CONST BASE_NAMESPACE = 'App\\Jobs\\';

    public function __construct(protected readonly JobSchedule $job)
    {
        Log::alert("JobBase: " . $job->nome);
    }

    public function handle()
    {
        try {
    
            $fullClassName = self::BASE_NAMESPACE . $this->job->classe;
            if (!class_exists($fullClassName)) {
                LogError::newWarn("A classe do job '{$this->job->classe}' não existe.");
                return  false;
            }

            $this->inicializeTenant();

            $jobClass = app($fullClassName);
            $parameters = $this->job->parameters ? json_decode($this->job->parameters, true) : [];

            dispatch(new $jobClass(...$parameters));
        } catch (Exception $e) {
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

    public function getJob(): JobSchedule
    {
        return $this->job;
    }
}
