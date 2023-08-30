<?php

namespace App\Services;

use App\Models\Cidade;
use App\Models\Entidade;
use App\Models\Perfil;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Artisan;
use Carbon\Carbon;
use App\Models\Tenant;

use function App\Models\usuario;

class TenantService extends ServiceBase {
    
   /**
     * Store a newly created resource in storage.
     *
     * @param  Array $data
     * @return Object
     */
    public function store($dataOrEntity, $unidade, $transaction = true) {
        try{
            parent::store($dataOrEntity, $unidade, false);
        } catch (\Exception $e) {
            throw $e;
        }
    }


    public function validateStore($dataOrEntity, $unidade, $action) {
        $model = $this->getModel();
        $entity = UtilService::emptyEntry($dataOrEntity, "id") ? null : $model::find($dataOrEntity["id"]);
        $entity = isset($entity) ? $entity : new $model();
        try {
            $entity->fill($dataOrEntity);
            $entity->save();
        } catch (\Stancl\Tenancy\Exceptions\TenantDatabaseAlreadyExistsException $e) {}
        return $entity;
    }

    public function extraStore($dataOrEntity, $unidade, $action) {
        $tenant = Tenant::find($dataOrEntity->id);
        tenancy()->initialize($tenant);
        if($tenant) {   
            $tenant->run(function () use ($dataOrEntity) {  
                $entidade = Entidade::where('sigla', $dataOrEntity->id)->first();
                $usuario = Usuario::where('nome', $dataOrEntity->nome_usuario)->first();

                if (!$entidade) {
                    $entidade = new Entidade([
                        'sigla' => $dataOrEntity->id,
                        'nome' => $dataOrEntity->nome_entidade, 
                        'abrangencia' => $dataOrEntity->abrangencia,
                        'layout_formulario_demanda' => 'COMPLETO',
                        'campos_ocultos_demanda' => [],
                        'nomenclatura' => [],
                        'cidade_id' => Cidade::where('codigo_ibge', $dataOrEntity['codigo_cidade'])->first()->id, 
                    ]);
                    $entidade->save();
                }
                if (!$usuario) {
                    $usuario = new Usuario([
                        'email' => $dataOrEntity->email,
                        'nome' => $dataOrEntity->nome_usuario,
                        'cpf' => $dataOrEntity->cpf,
                        'apelido' => $dataOrEntity->apelido,
                        'perfil_id' => Perfil::where('nome', 'Desenvolvedor')->first()->id,
                        'data_inicio' => Carbon::now()
                    ]);
                    $usuario->save();  
                } 
            });
        }
    }
    
    public function cidade($id) {
        Artisan::call('tenants:run db:seed --option="class=CidadeSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
        return Artisan::output();
    }

    public function tipoCapacidadeSeeder($id) {
        Artisan::call('tenants:run db:seed --option="class=AtualizacaoSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
        return Artisan::output();
    }

    public function entidadeSeeder($id) {
        Artisan::call('tenants:run db:seed --option="class=UsuarioSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
        return Artisan::output();
    }
    public function usuarioSeeder($id) {
        Artisan::call('tenants:run db:seed --option="class=EntidadeSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
        return Artisan::output();
    }
    public function databaseSeeder($id) {
        Artisan::call('tenants:run db:seed --option="class=DatabaseSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
        return Artisan::output();
    }

    public function seeders($id) {
        Artisan::call('tenants:seed' . (empty($id) ? '' : ' --tenants=' . $id));
        return Artisan::output();
    }
 
    public function migrate($id) {
        Artisan::call('tenants:migrate' . (empty($id) ? '' : ' --tenants=' . $id));
        return Artisan::output();
    }


}