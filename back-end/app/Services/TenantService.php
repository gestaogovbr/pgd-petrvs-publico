<?php

namespace App\Services;

use App\Models\Tenant;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Artisan;

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

    public function seeder($id) {
        Artisan::call('tenants:run db:seed --option="class=AtualizacaoSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
        return Artisan::output();
    }

    public function migrate($id) {
        Artisan::call('tenants:migrate' . (empty($id) ? '' : ' --tenants=' . $id));
        return Artisan::output();
    }

}