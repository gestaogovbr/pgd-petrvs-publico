<?php

namespace App\Jobs;

use Exception;
use App\Exceptions\LogError;
use App\Http\Middleware\TenantConfigurations;
use App\Models\JobSchedule;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

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
            $this->loadingTenantConfigurationMiddleware($this->job->tenant_id);

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

    private function loadingTenantConfigurationMiddleware(string $tenantId): void
    {
               $request = Request::create('/', 'GET', []);

               $request->headers->set('X-ENTIDADE', 'MGI');
       
               $middleware = app(TenantConfigurations::class);
       
               $next = function ($request) {
                   return $request;
               };
       
               $processedRequest = $middleware->handle($request, $next);

    }

    public function getJob(): JobSchedule
    {
        return $this->job;
    }
}
