<?php

namespace App\Services;

use App\Models\JobSchedule;
use App\Services\ServiceBase;
use App\Traits\TenantConnection;
class JobAgendadoService extends ServiceBase {

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

    public function removerJob($id, $tenantId = null) {
        $query = JobSchedule::where('id', $id);
        if ($tenantId) {
            $query->where('tenant_id', $tenantId);
        }

        $job = $query->first();

        if (!$job) {
            return ['success' => false, 'message' => 'Job não encontrado.'];
        }

        $job->delete();
        return ['success' => true, 'message' => 'Job removido com sucesso.'];
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
    
}
