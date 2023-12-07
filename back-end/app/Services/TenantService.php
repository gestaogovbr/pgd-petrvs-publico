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


use Illuminate\Support\Facades\Log;
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
        $tenant->createDomain([
            'domain' => $dataOrEntity->dominio_url
        ]);
        tenancy()->initialize($tenant);

        config('app.env') == 'production' ? $this->acoesProducao($dataOrEntity->id) : $this->acoesDev($dataOrEntity->id);

        if($tenant) {
            $tenant->run(function () use ($dataOrEntity) {
                $entidade = Entidade::where('sigla', $dataOrEntity->id)->first();
                $usuario = Usuario::where('nome', $dataOrEntity->nome_usuario)->first();

                if (!$entidade) {
                    try {
                        $cidade_id=Cidade::where('codigo_ibge', $dataOrEntity->codigo_cidade)->first()->id;
                    } catch (\Exception $e) {
                        // Se uma exceção for lançada, o código IBGE não foi encontrado
                        $errorMessage = 'Código IBGE não encontrado';

                        // Registre o erro
                        Log::error($errorMessage);
                        Log::channel('daily')->error($errorMessage);

                        // Lance uma nova exceção com a mensagem de erro personalizada
                        throw new \Exception($errorMessage);
                    }

                    $entidade = new Entidade([
                        'sigla' => $dataOrEntity->id,
                        'nome' => $dataOrEntity->nome_entidade,
                        'abrangencia' => $dataOrEntity->abrangencia,
                        'layout_formulario_demanda' => 'COMPLETO',
                        'campos_ocultos_demanda' => [],
                        'nomenclatura' => [],
                        'cidade_id' => $cidade_id,
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
        Artisan::call('tenants:run db:seed --option="class=EntidadeSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
        return Artisan::output();
    }
    public function usuarioSeeder($id) {
        Artisan::call('tenants:run db:seed --option="class=UsuarioSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
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
        try {
            if($id){
                Artisan::call('tenant:migrate ' . $id);
            }else{
                Artisan::call('tenants:migrate', ['--force' => true]);
            }

            logInfo();
            return true;
        } catch (\Exception $e) {
            // Handle any exceptions that may occur during command execution
            Log::error('Error executing commands: ' . $e->getMessage());
            Log::channel('daily')->error('Error executing commands: ' . $e->getMessage());
            // Optionally, rethrow the exception to let it be handled elsewhere
            throw $e;
        }
    }

    public function resetBD() {
        try {
            Artisan::call('db:delete-all');
            logInfo();
            Artisan::call('db:truncate-all');
            logInfo();
            return true;
        } catch (\Exception $e) {
            // Handle any exceptions that may occur during command execution
            Log::error('Error executing commands: ' . $e->getMessage());
            Log::channel('daily')->error('Error executing commands: ' . $e->getMessage());
            // Optionally, rethrow the exception to let it be handled elsewhere
            throw $e;
        }
    }

    private function acoesProducao($id=null){
        try {
            Artisan::call('cache:clear');
            logInfo();
            Artisan::call('queue:clear', ['--force' => true]);
            logInfo();
            Artisan::call('optimize:clear');
            logInfo();
            // Execute the 'tenants:migrate' command
            Artisan::call('tenants:migrate', ['--force' => true,'-n'=>true]);
            logInfo();
            Artisan::call('db:seed --class=CidadeSeeder --force');
            logInfo();
            Artisan::call('db:seed --class=PerfilSeeder --force');
            logInfo();
            return true;
        } catch (\Exception $e) {
            // Handle any exceptions that may occur during command execution
            Log::error('Error executing commands: ' . $e->getMessage());
            Log::channel('daily')->error('Error executing commands: ' . $e->getMessage());
            // Optionally, rethrow the exception to let it be handled elsewhere
            throw $e;
        }

    }

    private function acoesDev($id = null)
    {
        try {
            Artisan::call('tenants:migrate');
            logInfo();
            $seedCommand = 'tenants:run db:seed --option="class=DatabaseSeeder"' . (empty($id) ? '' : ' --tenants=' . $id);
            Artisan::call($seedCommand);
            logInfo();
            return true;
        } catch (\Exception $e) {
            // Handle any exceptions that may occur during command execution
            Log::error('Error executing commands: ' . $e->getMessage());
            Log::channel('daily')->error('Error executing commands: ' . $e->getMessage());
            // Optionally, rethrow the exception to let it be handled elsewhere
            throw $e;
        }
    }
}
