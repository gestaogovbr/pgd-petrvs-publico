<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait TenantConnection
{
    protected function setTenantConnection($tenantId)
    {
        if ($tenantId) {
            DB::purge('tenant');
            config(['database.connections.tenant.database' => 'petrvs_' . strtolower($tenantId)]);
            DB::reconnect('tenant');
            DB::setDefaultConnection('tenant');
        } else {
            DB::setDefaultConnection('mysql');
        }
    }
}
