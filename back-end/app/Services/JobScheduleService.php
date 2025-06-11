<?php

namespace App\Services;

use App\Models\JobSchedule;
use App\Services\ServiceBase;
use App\Traits\TenantConnection;
use Carbon\Carbon;
use Exception;

class JobScheduleService extends ServiceBase {

    use TenantConnection;

    public function listar($tenantId = null) {
        $query = JobSchedule::where('ativo', true);
        if ($tenantId) {
            $query->where('tenant_id', $tenantId);
        }

        return $query->get();
    }

    public function createJob($dados, $tenantId = null) {
        try {

            if(!is_null($tenantId) && !$this->validateCreateJob($dados, $tenantId)){
                throw new Exception(sprintf("já existe um job %s no banco de dados para o tenant %s, não será possivel criar outro", $dados['classe'], $tenantId));
            }
            $job = new JobSchedule($dados);
            if (isset($dados['parameters']) && is_array($dados['parameters'])) {
                $dados['parameters'] = json_encode($dados['parameters']);
            }

            if ($tenantId) {
                $job->tenant_id = $tenantId;
            }
            $job->save();
            return ['success' => true, 'message' => 'Job criado com sucesso.', 'data' => $job];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    private function validateCreateJob($dados,  $tenantId) : bool{
        $nomeClasseBuscarDadosSiapeJob = getClassNameFromPath('app/Jobs/BuscarDadosSiapeJob.php');
        $nomeClasseSincronizaSiapeJob = getClassNameFromPath('app/Jobs/SincronizarSiapeJob.php');

        $jobBuscarDadosJaExiste = JobSchedule::where('tenant_id', $tenantId)
        ->where('classe', $nomeClasseBuscarDadosSiapeJob)
        ->exists();

        $jobSincronizaSiapeExiste = JobSchedule::where('tenant_id', $tenantId)
        ->where('classe', $nomeClasseSincronizaSiapeJob)
        ->exists();

        if($dados['classe'] == $nomeClasseBuscarDadosSiapeJob){
            $jobBuscarDadosJaExiste = JobSchedule::where('tenant_id', $tenantId)
            ->where('classe', $nomeClasseBuscarDadosSiapeJob)
            ->exists();

            return !$jobBuscarDadosJaExiste;
        }

        if($dados['classe'] == $nomeClasseSincronizaSiapeJob){

            $jobSincronizaSiapeExiste = JobSchedule::where('tenant_id', $tenantId)
            ->where('classe', $nomeClasseSincronizaSiapeJob)
            ->exists();
            return !$jobSincronizaSiapeExiste;
        }

        return true;

    }

    public function getAllClassJobs() {
        $jobs = [];
        $files = scandir(app_path('Jobs'));
        foreach ($files as $file) {
            if (strpos($file, '.php') !== false) {
                $job = str_replace('.php', '', $file);
                $namespace = 'App\\Jobs\\';

                $fullClassName = $namespace . $job;

                if (class_exists($fullClassName)) {
                    $interfaces = class_implements($fullClassName);

                    if ($interfaces && in_array('App\\Jobs\\Contratos\\ContratoJobSchedule', $interfaces)) {
                        $jobs[$job] = $fullClassName::getDescricao();
                        continue;
                    }
                }
            }
        }

        return $jobs;
    }

    public function createJobsSiape(string $tenantId): void
    {
        $nomeClasseBuscarDadosSiapeJob = getClassNameFromPath('app/Jobs/BuscarDadosSiapeJob.php');
        $nomeClasseSincronizaSiapeJob = getClassNameFromPath('app/Jobs/SincronizarSiapeJob.php');

        $jobBuscarDadosJaExiste = JobSchedule::where('tenant_id', $tenantId)
        ->where('classe', $nomeClasseBuscarDadosSiapeJob)
        ->exists();
        $jobSincronizaSiapeExiste = JobSchedule::where('tenant_id', $tenantId)
        ->where('classe', $nomeClasseSincronizaSiapeJob)
        ->exists();

        $now = Carbon::now();

        if(!$jobBuscarDadosJaExiste){

            $now->addMinute(30);
            $minute = $now->format('i');
            $hour = $now->format('H');
            $expressaoCron = "{$minute} {$hour} * * *";
            $job = new JobSchedule([
                'nome' => 'Busca Dados Siape ' . $tenantId,
                'classe' => 'BuscarDadosSiapeJob',
                'expressao_cron' => $expressaoCron,
                'ativo' => 1,
                'tenant_id' => $tenantId,
                'parameters' => '[]'
            ]);
            $job->save();
        }

        if(!$jobSincronizaSiapeExiste){

            $now->addMinutes(5);
            $minute = $now->format('i');
            $hour = $now->format('H');
            $expressaoCron = "{$minute} {$hour} * * *";

            $job = new JobSchedule([
                'nome' => 'Sincroniza Dados Siape ' . $tenantId,
                'classe' => 'SincronizarSiapeJob',
                'expressao_cron' => $expressaoCron,
                'ativo' => 1,
                'tenant_id' => $tenantId,
                'parameters' => '[]'
            ]);
            $job->save();
        }
    }
}
