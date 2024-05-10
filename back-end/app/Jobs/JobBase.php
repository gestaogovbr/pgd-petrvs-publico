<?php

namespace App\Jobs;
use Exception;
use App\Exceptions\LogError;
use Illuminate\Support\Facades\Log;

class JobBase
{
    protected $job;

    public function __construct($job)
    {
        $this->job = $job;
    }

    public function handle()
    {
        try {
            if (!class_exists($this->job->nome_do_job)) {
                LogError::newWarn("A classe do job '{$this->job->nome_do_job}' não existe.");
            }

            if (!is_null($this->job->tenant_id)) {
                $tenant = tenancy()->find($this->job->tenant_id);
                if ($tenant) {
                    tenancy()->initialize($tenant);
                } else {
                    LogError::newWarn("Tenant não encontrado.");
                }
            }

            $jobClass = app($this->job->nome_do_job);
            $parameters = $this->job->parameters ? json_decode($this->job->parameters, true) : [];

            dispatch(new $jobClass(...$parameters));

        } catch (Exception $e) {
            LogError::newWarn("Erro ao processar Job: '{$this->job->nome_do_job}' - Erro: " . $e->getMessage());
            return false; // Para marcar o job como falhado
        }
    }
    public function getJob()
    {
        return $this->job;
    }
}

