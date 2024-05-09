<?php

namespace App\Jobs;

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
            // Verificar se o parâmetro corresponde ao nome do job
            if ($this->job->nome_do_job === 'LogJob') {
                //Verificar qual tenant é e inicializar ele, caso seja nulo nao iniciar o tenant
                //$tenant = tenancy()->find($tenant);
                //tenancy()->initialize($tenant);
                LogJob::dispatch(true);
            } else {
                Log::info("O job atual não corresponde ao parâmetro. Job: {$this->job->nome_do_job }");
            }
        } catch (\Exception $e) {
            Log::error("Erro ao processar JobBase: " . $e->getMessage());
            return false; // Para marcar o job como falhado
        }
    }

    public function getJob()
    {
        return $this->job;
    }
}
