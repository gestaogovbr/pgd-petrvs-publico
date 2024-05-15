<?php

namespace App\Services;

use App\Models\Cidade;
use App\Models\Entidade;
use App\Models\Perfil;
use App\Models\Usuario;
use Illuminate\Support\Facades\Artisan;
use Carbon\Carbon;
use App\Models\Tenant;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Log;

class TenantService extends ServiceBase
{

  /**
   * Store a newly created resource in storage.
   *
   * @param  Array $data
   * @return Object
   */
  public function store($dataOrEntity, $unidade, $transaction = true)
  {
    try {
      parent::store($dataOrEntity, $unidade, false);
    } catch (\Exception $e) {
      throw $e;
    }
  }


  public function validateStore($dataOrEntity, $unidade, $action)
  {
    $model = $this->getModel();
    $entity = UtilService::emptyEntry($dataOrEntity, "id") ? null : $model::find($dataOrEntity["id"]);
    $entity = isset($entity) ? $entity : new $model();
    try {
      $entity->fill($dataOrEntity);
      $entity->save();
    } catch (\Stancl\Tenancy\Exceptions\TenantDatabaseAlreadyExistsException $e) {
    }
    return $entity;
  }

  public function extraStore($dataOrEntity, $unidade, $action)
  {
    $tenant = Tenant::find($dataOrEntity->id);
    if (!$tenant->domains()->where('domain', $dataOrEntity->dominio_url)->exists()) {
      $tenant->createDomain([
        'domain' => $dataOrEntity->dominio_url
      ]);
    }
    tenancy()->initialize($tenant);

    /* Executa migrations e seeds somente se for inclusão */
    if ($action == ServiceBase::ACTION_INSERT)
      $this->acoesDeploy($dataOrEntity->id);

    if ($tenant) {
      $tenant->run(function () use ($dataOrEntity) {
        $entidade = Entidade::where('sigla', $dataOrEntity->id)->first();
        $usuario = Usuario::where('email', $dataOrEntity->email)->first();
        $NivelAcessoService = new NivelAcessoService();

        if (!$entidade) {
          try {
            $cidade_id = Cidade::where('codigo_ibge', $dataOrEntity->codigo_cidade)->first()->id;
          } catch (\Exception $e) {
            // Se uma exceção for lançada, o código IBGE não foi encontrado
            $errorMessage = 'Código IBGE não encontrado';

            // Registre o erro
            Log::error($errorMessage);
            Log::channel('daily')->error($errorMessage);

            // Lance uma nova exceção com a mensagem de erro personalizada
            throw new \Exception($errorMessage);
          }

          $entidade = Entidade::first() ?? new Entidade([
            'sigla' => $dataOrEntity->id,
            'nome' => $dataOrEntity->nome_entidade,
            'abrangencia' => $dataOrEntity->abrangencia,
            'layout_formulario_demanda' => 'COMPLETO',
            'campos_ocultos_demanda' => [],
            'nomenclatura' => [],
            'cidade_id' => $cidade_id,
          ]);
          if (!$entidade->exists) {
            $entidade->save();
          }
        }
        if (!$usuario) {
          $usuario = new Usuario([
            'email' => $dataOrEntity->email,
            'nome' => $dataOrEntity->nome_usuario,
            'cpf' => $dataOrEntity->cpf,
            'apelido' => $dataOrEntity->apelido,
            'perfil_id' => $NivelAcessoService->getPerfilDesenvolvedor()->id,
            'data_inicio' => Carbon::now()
          ]);
          $usuario->save();
        }
      });
    }
    //tenancy()->end();
  }

  public function generateCertificateKeys()
  {
    $certificate = openssl_pkey_new();
    openssl_pkey_export($certificate, $privateKey);
    $publicKey = openssl_pkey_get_details($certificate)['key'];
    return [
      "private_key" => str_replace(["-----BEGIN PRIVATE KEY-----", "-----END PRIVATE KEY-----", "\n"], "", $privateKey),
      "public_key" => str_replace(["-----BEGIN PUBLIC KEY-----", "-----END PUBLIC KEY-----", "\n"], "", $publicKey)
    ];
  }

  public function cidade($id)
  {
    Artisan::call('tenants:run db:seed --option="class=CidadeSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
    return Artisan::output();
  }

  public function tipoCapacidadeSeeder($id)
  {
    Artisan::call('tenants:run db:seed --option="class=AtualizacaoSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
    return Artisan::output();
  }

  public function entidadeSeeder($id)
  {
    Artisan::call('tenants:run db:seed --option="class=EntidadeSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
    return Artisan::output();
  }
  public function usuarioSeeder($id)
  {
    Artisan::call('tenants:run db:seed --option="class=UsuarioSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
    return Artisan::output();
  }
  public function databaseSeeder($id)
  {
    Artisan::call('tenants:run db:seed --option="class=DatabaseSeeder"' . (empty($id) ? '' : ' --tenants=' . $id));
    return Artisan::output();
  }

  public function seeders($id)
  {
    Artisan::call('tenants:seed' . (empty($id) ? '' : ' --tenants=' . $id));
    return Artisan::output();
  }

  public function migrate($id)
  {
    try {
      if ($id) {
        Artisan::call('tenant:migrate ' . $id);
      } else {
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

  public function cleanDB($id)
  {
    try {
      Artisan::call('db:truncate-all ' . $id);
    } catch (\Exception $e) {
      Log::error('Error executing commands: ' . $e->getMessage());
      Log::channel('daily')->error('Error executing commands: ' . $e->getMessage());
      throw $e;
    }
  }

  public function resetBD()
  {
    try {
      //            Artisan::call('db:delete-all');
//            logInfo();
//            Artisan::call('db:truncate-all');
//            logInfo();
      return true;
    } catch (\Exception $e) {
      // Handle any exceptions that may occur during command execution
      Log::error('Error executing commands: ' . $e->getMessage());
      Log::channel('daily')->error('Error executing commands: ' . $e->getMessage());
      // Optionally, rethrow the exception to let it be handled elsewhere
      throw $e;
    }
  }


  private function acoesDeploy($id = null)
  {
    try {
      Artisan::call('tenants:migrate --tenants='.$id);
      logInfo();
    } catch (\Exception $e) {
      // Handle any exceptions that may occur during command execution
      Log::error('Error executing commands: ' . $e->getMessage());
      Log::channel('daily')->error('Error executing commands: ' . $e->getMessage());
      // Optionally, rethrow the exception to let it be handled elsewhere
      throw $e;
    }
  }

  public function deleteTenant($id)
  {
    try {
      $tenant = Tenant::find($id);
      if ($tenant) {
        $tenant->delete();
        Log::info('Tenant deletado com sucesso: ' . $id);
      }
      return true;
    } catch (\Exception $e) {
      Log::error('Error executing commands: ' . $e->getMessage());
      throw $e;
    }
  }

  public function searchText($data)
  {
    $text = "%" . str_replace(" ", "%", $data['query']) . "%";
    $model = App($this->collection);
    $table = $model->getTable();
    $data["select"] = array_map(fn ($field) => str_contains($field, ".") ? $field : $table . "." . $field, array_merge(['id'], $data['fields']));
    $query = DB::table($table);
    if (method_exists($this, 'proxySearch')) $this->proxySearch($query, $data, $text);
    $likes = ["or"];
    foreach ($data['fields'] as $field) {
      array_push($likes, [$field, 'like', $text]);
    }
   
    //$where = count($data['where']) > 0 ? [$likes, $data['where']] : $likes;
    $where = [$likes, $data['where']];
    $this->applyWhere($query, $where, $data);
    $this->applyOrderBy($query, $data);
    $query->select($data["select"]);
    $rows = $query->get();
    $values = [];
    foreach ($rows as $row) {
      $row = (array) $row;
      $orderFilds = array_map(fn ($order) => "_" . str_replace(".", "_", $order[0]), $data['orderBy'] ?? []);
      $orderValues = array_map(fn ($field) => $row[$field], $orderFilds);
      array_push($values, [$row['id'], array_map(fn ($field) => $row[$field], $data['fields']), $orderValues]);
    }
    return $values;
  }

}
