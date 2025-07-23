<?php

namespace App\Services;


use App\Jobs\BuscarDadosSiapeJob;
use App\Exceptions\NotFoundException;
use App\Models\Cidade;
use App\Models\Entidade;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Models\PainelUsuario;
use Illuminate\Support\Facades\Artisan;
use Carbon\Carbon;
use App\Models\Tenant;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Cache;
use App\Jobs\ExportarTenantJob;
use App\Models\JobSchedule;


class TenantService extends ServiceBase
{

    /**
     * Store a newly created resource in storage.
     *
     * @param Array $data
     * @return Object
     */
    public function store($dataOrEntity, $unidade, $transaction = true)
    {
        try {
            Log::info('Iniciando cadastro de tenant...');
            $tenant = parent::store($dataOrEntity, $unidade, false);
            if($tenant){
                $this->JobScheduleService->createJobsSiape($tenant->id);
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }


    public function validateStore($dataOrEntity, $unidade, $action)
    {
        $model = $this->getModel();
        $entity = UtilService::emptyEntry($dataOrEntity, "id") ? null : $model::find($dataOrEntity["id"]);
        $entity = isset($entity) ? $entity : new $model();

        if (isset($dataOrEntity['id']) && str_contains($dataOrEntity['id'], ' ')) {
            throw new ServerException("Tenant", "O campo SIGLA não pode conter espaços.");
        }   

        $domainExists = DB::table('domains')
            ->where('domain', $dataOrEntity['dominio_url'])
            ->exists();
        if ($domainExists && $action != "EDIT" && $dataOrEntity['dominio_url'] != $entity->dominio_url) {
            throw new ServerException("Tenant", "O domínio já está cadastrado.");
        }
   

        try {
            $entity->fill($dataOrEntity);
            $entity->save();
        } catch (\Stancl\Tenancy\Exceptions\TenantDatabaseAlreadyExistsException $e) {
        }
        return $entity;
    }

    public function extraStore($dataOrEntity, $unidade, $action)
    {
        Log::info('Verificando se existe o tenant.');
        $tenant = Tenant::find($dataOrEntity->id);
        if (!$tenant->domains()->where('domain', $dataOrEntity->dominio_url)->exists()) {
            Log::info('Cadastrando o tenant.');
            $tenant->createDomain([
                'domain' => $dataOrEntity->dominio_url
            ]);
        }
        tenancy()->initialize($tenant);

        /* Executa migrations e seeds somente se for inclusão */
        if ($action == ServiceBase::ACTION_INSERT)
            $this->acoesDeploy($dataOrEntity);

        if ($action == ServiceBase::ACTION_EDIT){
            $NivelAcessoService = new NivelAcessoService();
            $usuario = Usuario::orderBy('created_at', 'asc')->first();

            if ($usuario) {
                $usuarioExistente = Usuario::where('email', $dataOrEntity->email)
                    ->first();
                if (!$usuarioExistente) {
                    $usuario->email = $dataOrEntity->email;
                    $usuario->nome = $dataOrEntity->nome_usuario;
                    $usuario->cpf = $dataOrEntity->cpf;
                    $usuario->apelido = $dataOrEntity->apelido;
                    $usuario->perfil_id = $NivelAcessoService->getPerfilDesenvolvedor()->id;
                    $usuario->save();
                }
            }
        }


        tenancy()->end();
        Log::info('Finalização do cadastro de tenant');
    }

    public function forcarSiape(string $tenantId)
    {
        $this->inicializeTenant($tenantId);
        $this->TenantConfigurationsService->handle($tenantId);
        $this->limpaTabelas();
        BuscarDadosSiapeJob::dispatch($tenantId);
    }

    public function forcarEnvio(string $tenantId)
    {
        $this->inicializeTenant($tenantId);
        $this->TenantConfigurationsService->handle($tenantId);

        ExportarTenantJob::dispatch($tenantId);
    }

    public function inicializeTenant($tenantId): void
    {

        $tenant = tenancy()->find($tenantId);
        ($tenant) ? tenancy()->initialize($tenant) : Log::error("Tenant não encontrado.");
    }

    private function limpaTabelas()
    {
        DB::table('siape_blacklist_servidores')->truncate();
        DB::table('integracao_unidades')->truncate();
        DB::table('integracao_servidores')->truncate();
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

    public function executeSeeder($seed, $tenant = null)
    {
        $this->validatePermission();
        Log::info('Execução '.$seed.'.');
        Artisan::call('tenants:run db:seed --option="class=' . $seed . '"' . (empty($tenant) ? '' : ' --tenants=' . $tenant));
        return Artisan::output();
    }


    public function migrate($id)
    {
        $this->validatePermission();
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
        $this->validatePermission();
        try {
            //Artisan::call('db:truncate-all ' . $id);
            return true;
        } catch (\Exception $e) {
            Log::error('Error executing commands: ' . $e->getMessage());
            Log::channel('daily')->error('Error executing commands: ' . $e->getMessage());
            throw $e;
        }
    }

    public function resetBD()
    {
        $this->validatePermission();

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

    public function countUsersInPGD(){
        $cacheKey = 'count_users_in_pgd';
        $cacheTime = 60; // Cache time in minutes

        if (Cache::store('redis')->has($cacheKey)) {
            return Cache::store('redis')->get($cacheKey);
        }

        $user_id = Auth::guard('painel')->id();
        $painel_user = PainelUsuario::findOrFail($user_id);

        $tenants = $painel_user->nivel != 1 ? $painel_user->tenants : Tenant::all();
        $users = 0;
        foreach ($tenants as $tenant) {
            $this->inicializeTenant($tenant->id);
            $users += DB::table('programas_participantes')
                ->select('usuario_id')
                ->distinct()
                ->where('habilitado', 1)
                ->count();
        }

        Cache::store('redis')->put($cacheKey, $users, $cacheTime);

        return $users;
    }


    private function acoesDeploy($dataOrEntity)
    {
        try {
            Log::info('Execução da migrate.');
            //Execução das  Migrations
            Artisan::call('tenants:migrate --tenants=' . $dataOrEntity->id);

            //Execução das  Seeders
            $this->executeSeeder('CidadeSeeder', $dataOrEntity->id);
            $this->executeSeeder('PerfilSeeder', $dataOrEntity->id);
            $this->executeSeeder('TipoCapacidadeSeeder', $dataOrEntity->id);
            $this->executeSeeder('CapacidadeSeeder', $dataOrEntity->id);

            Log::info('Busca de Cidade com o codigo IBGE');
            $cidade_id = Cidade::where('codigo_ibge', $dataOrEntity->codigo_cidade)->first()->id;

            Log::info('Busca de Entidade e cadastro caso não exista.');
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

            Log::info('Busca de Níveis de acesso.');
            $NivelAcessoService = new NivelAcessoService();
            Log::info('Cadastro de Usuário.');
            $usuario = new Usuario([
                'email' => $dataOrEntity->email,
                'nome' => $dataOrEntity->nome_usuario,
                'cpf' => $dataOrEntity->cpf,
                'apelido' => $dataOrEntity->apelido,
                'perfil_id' => $NivelAcessoService->getPerfilDesenvolvedor()->id,
                'data_inicio' => Carbon::now()
            ]);
            $usuario->save();

            Log::info('Cadastro de Unidade.');
            $unidade = array(
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => NULL,
                "codigo" => "1",
                "sigla" => $dataOrEntity->id,
                "nome" => $dataOrEntity->nome_entidade,
                "instituidora" => 1,
                "path" => NULL,
                "texto_complementar_plano" => NULL,
                "atividades_arquivamento_automatico" => 0,
                "atividades_avaliacao_automatico" => 0,
                "planos_prazo_comparecimento" => 10,
                "planos_tipo_prazo_comparecimento" => "DIAS",
                "data_inativacao" => NULL,
                "distribuicao_forma_contagem_prazos" => "DIAS_UTEIS",
                "entrega_forma_contagem_prazos" => "HORAS_UTEIS",
                "autoedicao_subordinadas" => 1,
                "etiquetas" => NULL,
                "checklist" => NULL,
                "notificacoes" => NULL,
                "expediente" => NULL,
                "cidade_id" => $cidade_id,
                "unidade_pai_id" => NULL,
                "entidade_id" => $entidade->id
            );

            $unidade = new Unidade($unidade);
            $unidade->save();

            Log::info('Cadastro de UnidadeIntegrante.');
            $integrante = UnidadeIntegrante::firstOrCreate([
                'unidade_id' => $unidade->id,
                'usuario_id' => $usuario->id
            ]);

            Log::info('Cadastro de UnidadeIntegranteAtribuicao.');
            UnidadeIntegranteAtribuicao::firstOrCreate([
                'atribuicao' => 'LOTADO',
                'unidade_integrante_id' => $integrante->id
            ]);

            $this->executeSeeder('NomenclaturaSeeder', $dataOrEntity->id);
            $this->executeSeeder('TipoMotivoAfastamentoSeeder', $dataOrEntity->id);
            $this->executeSeeder('In24_2023Seeder', $dataOrEntity->id);
        } catch (\Exception $e) {
            // Handle any exceptions that may occur during command execution
            Log::error('Error executing commands: ' . $e->getMessage());
            throw $e;
        }
    }

    public function deleteTenant($id)
    {
        try {
            $this->validatePermission();
            $tenant = Tenant::find($id);
            if ($tenant) {
                JobSchedule::where('tenant_id', $tenant->id)->delete();
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
        $data["select"] = array_map(fn($field) => str_contains($field, ".") ? $field : $table . "." . $field, array_merge(['id'], $data['fields']));
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
            $row = (array)$row;
            $orderFilds = array_map(fn($order) => "_" . str_replace(".", "_", $order[0]), $data['orderBy'] ?? []);
            $orderValues = array_map(fn($field) => $row[$field], $orderFilds);
            array_push($values, [$row['id'], array_map(fn($field) => $row[$field], $data['fields']), $orderValues]);
        }
        return $values;
    }
    public function getById($data)
    {
        $model = $this->getModel();
        $query = $model::query();
        $data["with"] = isset($data["with"]) ? $data["with"] : [];
        $data["with"] = isset($this->joinable) ? $this->getJoinable($data["with"]) : $data["with"];
        if (count($data['with']) > 0) {
            $this->applyWith($query, $data);
        }
        $query->where('id', $data['id']);
        $query = is_subclass_of(get_class($model), "App\Models\ModelBase") ? $query->withTrashed() : $query;
        $rows = method_exists($this, 'proxyRows') ? $this->proxyRows($query->get()) : $query->get();


        if (count($rows) == 1) {
            $data =json_decode($rows[0],true);
            unset(
                $data['tenancy_db_name'],
                $data['tenancy_db_host'],
                $data['tenancy_db_port'],
                $data['tenancy_db_username'],
                $data['tenancy_db_password'],
                $data['log_host'],
                $data['log_database'],
                $data['log_port'],
                $data['log_username'],
                $data['log_password'],
                $data['api_password']
            );

            return $data;
        } else {
            throw new NotFoundException("Id não encontrado");
        }
    }

    public function validatePermission(){
        $user = Auth::guard('painel')->user();
        if ($user->nivel != 1) {
            throw new ServerException("ValidateUsuario", "Usuário não tem permissão para executar essa ação");
        }
    }


    public function dumpDatabase($id)
    {
        $tenant = Tenant::findOrFail($id);

        $database = $tenant->tenancy_db_name;
        $username = $tenant->tenancy_db_username;
        $password = $tenant->tenancy_db_password;
        $host =$tenant->tenancy_db_host;
        $port =$tenant->tenancy_db_port;

        $dumpFile = storage_path("{$database}_dump.sql");

        $command = "mysqldump --user={$username} --password={$password} --host={$host}  --port={$port} {$database} > {$dumpFile}";

        $output = null;
        $resultCode = null;
        exec($command, $output, $resultCode);

        if ($resultCode === 0) {
            return response()->download($dumpFile)->deleteFileAfterSend(true);
        } else {
            return back()->withErrors(['error' => 'Erro ao gerar o dump do banco de dados']);
        }
    }


}
