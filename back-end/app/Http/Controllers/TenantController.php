<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\LogError;
use App\Exceptions\ServerException;
use App\Http\Controllers\ControllerBase;
use App\Models\PainelUsuarioTenant;
use App\Models\Tenant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Stancl\Tenancy\Database\Models\Domain;
use Throwable;

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
                if(!Tenant::find($data['entity']['id'])) {
                    if (Domain::where('domain', $data['entity']['dominio_url'])->exists()) {
                        throw new ServerException("TenantStore", "URL já cadastrada");
                    }
                }
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
                    $data['entity']['api_password'] = Hash::make($data['entity']['api_password']);
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

    public function deleteTenant(Request $request) {
        try {
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


    public function getById(Request $request)
    {
        try {
            $this->checkPermissions("GETBYID", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required'],
                'user_id' => ['required'],
                'with' => ['array'],
            ]);

            // Verifica se o user_id existe no PainelUsuarioTenant
            PainelUsuarioTenant::where("users_panel_id", $data['user_id'])
                ->where('tenant_id', $data['id'])
                ->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => $this->service->getById($data)
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
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
}
