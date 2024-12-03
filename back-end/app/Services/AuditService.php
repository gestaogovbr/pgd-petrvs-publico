<?php

namespace App\Services;

use App\Models\Audit;
use App\Services\ServiceBase;

class AuditService extends ServiceBase
{
    public function listar($tenantId = null) {
        $query = Audit::query();
        if ($tenantId) {
            $query->where('tenant_id', $tenantId);
        }
        return $query->get();
    }
}
