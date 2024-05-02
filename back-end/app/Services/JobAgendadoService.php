<?php

namespace App\Services;

use App\Models\JobAgendado;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use App\Traits\TenantConnection;
class JobAgendadoService extends ServiceBase {

    use TenantConnection;

    public function listar($tenantId = null) {
        $this->setTenantConnection($tenantId);
        $jobs = JobAgendado::where('ativo', true)->get();
        $this->setTenantConnection(null);
        return $jobs;
    }

    public function createJob($dados, $tenantId = null) {
        $this->setTenantConnection($tenantId);
        try {
            $job = new JobAgendado($dados);
            $job->save();
            $this->setTenantConnection(null);
            return ['success' => true, 'message' => 'Job criado com sucesso.', 'data' => $job];
        } catch (\Exception $e) {
            $this->setTenantConnection(null);
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function removerJob($id, $tenantId = null) {
        $this->setTenantConnection($tenantId);
        $job = JobAgendado::find($id);

        if (!$job) {
            $this->setTenantConnection(null);
            return ['success' => false, 'message' => 'Job não encontrado.'];
        }

        $job->delete();
        $this->setTenantConnection(null);
        return ['success' => true, 'message' => 'Job removido com sucesso.'];
    }
}
