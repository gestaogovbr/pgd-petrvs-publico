<?php

namespace App\Services;

use App\Models\JobAgendado;
use App\Services\ServiceBase;
use App\Traits\TenantConnection;
class JobAgendadoService extends ServiceBase {

    use TenantConnection;

    public function listar($tenantId = null) {
        $query = JobAgendado::where('ativo', true);
        if ($tenantId) {
            $query->where('tenant_id', $tenantId);
        }

        return $query->get();
    }

    public function createJob($dados, $tenantId = null) {
        try {
            $job = new JobAgendado($dados);
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
        $query = JobAgendado::where('id', $id);
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
}
