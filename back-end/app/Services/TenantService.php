<?php

namespace App\Services;

use App\Models\Tenant;
use App\Services\ServiceBase;

class TenantService extends ServiceBase {
    
    public function validateStore($dataOrEntity, $unidade, $action) {
        $model = $this->getModel();
        $entity = UtilService::emptyEntry($dataOrEntity, "id") ? null : $model::find($dataOrEntity["id"]);
        $entity = isset($entity) ? $entity : new $model();
        try {
            $entity->fill($dataOrEntity);
            $entity->save();
        } catch (\Stancl\Tenancy\Exceptions\TenantDatabaseAlreadyExistsException $e) {}
        \Illuminate\Support\Facades\Artisan::call('tenants:migrate', ['--tenants' => [$entity->id]]);
        return $entity;
    }
}