<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\LogError;
use App\Exceptions\ServerException;
use App\Http\Controllers\ControllerBase;
use App\Models\PainelUsuario;
use App\Models\PainelUsuarioTenant;
use App\Models\EnvVariable;
use App\Models\Tenant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Stancl\Tenancy\Database\Models\Domain;
use Throwable;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redis;
class TenantController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        /* Verifica se foi passada a credencial do administrador do sistema */
        if(false) throw new ServerException("CapacidadeStore", "Inserção não realizada");
    }

    public function store(Request $request) {
        ob_start();
        try{
            try {
                $this->checkPermissions("STORE", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
                $data = $request->validate([
                    'entity' => ['required'],
                    'with' => ['array']
                ]);
                

                if(!$this->checkUserPermission($data['entity']['id']))
                    return response()->json(['error' => 'Tenant não encontrado.'], 404);

                $data['entity']['tenancy_db_name']= "petrvs_".strtolower($data['entity']['id']);
                $data['entity']['tenancy_db_host']= env("DB_HOST");
                $data['entity']['tenancy_db_port']= env("DB_PORT");
                $data['entity']['tenancy_db_username']= env("DB_USERNAME");
                $data['entity']['tenancy_db_password']= env("DB_PASSWORD");
                $data['entity']['log_traffic']= env("LOG_TRAFFIC");
                $data['entity']['log_changes']= env("LOG_CHANGES");
                $data['entity']['log_errors']= env("LOG_ERRORS");
                $data['entity']['log_host']=env("DB_HOST");
                $data['entity']['log_database']=  "petrvs_logs_".strtolower($data['entity']['id']);
                $data['entity']['log_port']= env("DB_PORT");
                $data['entity']['log_username']= env("DB_USERNAME");
                $data['entity']['log_password']= env("DB_PASSWORD");

                $data['entity']['created_at']=  Carbon::now()->toDateTimeString();
                $data['entity']['updated_at']=  Carbon::now()->toDateTimeString();

                if (isset($data['entity']['api_password']) && strlen(trim($data['entity']['api_password']))) {
                    $data['entity']['api_password'] = $data['entity']['api_password'];
                } else {
                    unset($data['entity']['api_password']);
                }


                $unidade = $this->getUnidade($request);
                $entity = $this->service->store($data['entity'], $unidade);
                $entity = $entity ?? (object) $data['entity'];
                $result = $this->service->getById([
                    'id' => $entity->id,
                    'with' => $data['with']
                ]);
                ob_end_clean();
                return response()->json([
                    'success' => true,
                    'rows' => [$result]
                ]);
            } catch (Throwable $e) {
                ob_end_clean();
                return response()->json(['error' => $e->getMessage()]);
            }
        } catch (\Exception $e) {
            ob_end_clean();
            throw $e;
        }
    }


    public function generateCertificateKeys() {
        try {
            return response()->json([
                'success' => true,
                'data' => $this->service->generateCertificateKeys()
            ]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function forcarSiape(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            $this->service->forcarSiape($data['tenant_id']);
            return response()->json([
                'success' => true,
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function forcarEnvio(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            $this->service->forcarEnvio($data['tenant_id']);
            return response()->json([
                'success' => true,
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function cidades(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->cidadeSeeder($data['tenant_id'])
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function tiposCapacidades(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->tipoCapacidadeSeeder($data['tenant_id'])
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function migrations(Request $request) {
        try {
            $data = $request->tenant_id??null;
            return response()->json([
                'success' => true,
                'data' => $this->service->migrate($data)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function resetdb(Request $request) {
        try {
            return response()->json([
                'success' => true,
                'data' => $this->service->resetBD()
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function cleandb(Request $request) {
        try {
            $data = $request->tenant_id??null;
            return response()->json([
                'success' => true,
                'data' => $this->service->cleanDB($data)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function seeders(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->seeders($data['tenant_id'])
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function usuario(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            if(!$this->checkUserPermission($data['tenant_id']))
                return response()->json(['error' => 'Tenant não encontrado.'], 404);

            return response()->json([
                'success' => true,
                'data' => $this->service->usuarioSeeder($data['tenant_id'])
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function entidade(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->entidadeSeeder($data['tenant_id'])
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function database(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->databaseSeeder($data['tenant_id'])
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function dumpDatabase(Request $request) {
        try {
            $data = $request->validate([
                'tenant_id' => ['string']
            ]);
            return $this->service->dumpDatabase($data['tenant_id']);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function deleteTenant(Request $request) {
        try {
            if(!$this->checkUserPermission($request->tenant_id))
                return response()->json(['error' => 'Tenant não encontrado.'], 404);

            $data= $this->service->deleteTenant($request->tenant_id);
            return response()->json([
                'success' => true,
                'data' =>$data
            ]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function updateEnv(Request $request)
    {
        $request->validate([
            'key' => 'required|string',
            'value' => 'required|string',
        ]);


        $key = $request->input('key');
        $newValue = $request->input('value');

        EnvVariable::updateOrCreate(
            ['name' => $key],
            ['value' => $newValue]
        );

        $envPath = base_path('.env');

        if (!File::exists($envPath)) {
            return response()->json(['error' => 'Arquivo .env não encontrado.'], 404);
        }

        $envContent = File::get($envPath);
        $pattern = "/^{$key}=.*/m";
        if (preg_match($pattern, $envContent, $matches)) {
            $currentValue = explode('=', $matches[0])[1];
            $newValue = $currentValue . $newValue;
            $envContent = preg_replace($pattern, "{$key}={$newValue}", $envContent);
        } else {
            $envContent .= "\n{$key}={$newValue}\n";
        }

        try {
            File::put($envPath, $envContent);
            Artisan::call('config:clear');
            return response()->json(['success' => "Variável '{$key}' atualizada com sucesso. Novo valor: {$newValue}"]);
        } catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }

    }


    public function getById(Request $request)
    {
        try {
            $this->checkPermissions("GETBYID", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required'],
                'with' => ['array'],
            ]);
            if($this->checkUserPermission($data['id']))
                return response()->json([
                    'success' => true,
                    'data' => $this->service->getById($data)
                ]);
            else
                return response()->json(['error' => 'Tenant não encontrado.'], 404);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    private function checkUserPermission($tenant_id=0) {
        $user_id = Auth::guard('painel')->id();
        $painel_user = PainelUsuario::findOrFail($user_id);
        // Se o nível do usuário não for 1, verifica a relação com o tenant
        if ($painel_user->nivel != 1) {
            // Verifica se o usuário tem permissão no tenant específico
            $exists = PainelUsuarioTenant::where("users_panel_id", $user_id)
                ->where('tenant_id', $tenant_id)
                ->exists();
            return $exists;
        } else {
            // Usuário com nível 1 tem permissão total
            return true;
        }
    }

    public function query(Request $request)
    {
        try {
            $this->checkPermissions("QUERY", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'page' => ['required'],
                'with' => ['array'],
                'limit' => ['required'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'where' => ['array']
            ]);

            $id=isset($data['where'][0][2])?$data['where'][0][2]:0;
            if(!$this->checkUserPermission($id))
                return response()->json(['error' => 'Tenant não encontrado.'], 404);

            $result = $this->service->query($data);


            foreach ($result['rows'] as $linha){
                unset(
                    $linha['tenancy_db_username'],
                    $linha['tenancy_db_password'],
                    $linha['log_username'],
                    $linha['log_password'],
                    $linha['api_username'],
                    $linha['api_password']
                );
            }

            return response()->json([
                'success' => true,
                'count' => $result['count'],
                'rows' => $result['rows'],
                'extra' => $result['extra']
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function usersInPGD(Request $request){
        try {
            return response()->json([
                'success' => true,
                'data' => $this->service->countUsersInPGD()
            ]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function resetQueues(Request $request) {
        try {

            exec('php /var/www/artisan horizon:pause');
            Log::info('Horizon pausado.');

            exec('php /var/www/artisan horizon:purge');
            Log::info('Processos zumbis purgados.');

            Artisan::call('queue:flush');
            Log::info('Filas pendentes foram limpas.');

            Redis::connection()->flushall();
            Log::info('Redis completamente limpo (FLUSHALL).');

            exec('php /var/www/artisan horizon:terminate', $outputTerminate, $returnTerminate);
            Log::info('Horizon terminado.', ['output' => $outputTerminate, 'status' => $returnTerminate]);

            exec('php /var/www/artisan horizon  > /dev/null 2>&1 &', $outputRestart, $returnRestart);
            Log::info('Horizon reiniciado.', ['output' => $outputRestart, 'status' => $returnRestart]);

            return response()->json([
                'success' => true,
                'data' => true
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }
}
