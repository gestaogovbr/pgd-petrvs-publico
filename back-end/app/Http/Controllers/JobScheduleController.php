<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Http\Controllers\ControllerBase;
use App\Jobs\LogJob;
use App\Jobs\SincronizarSiapeJob;
use App\Models\JobSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class JobScheduleController extends ControllerBase {

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
            case 'EDIT':
                //throw new ServerException("ProgramaStore", "Edição não realizada");
                break;
        }
    }

    public function listar(Request $request)
    {
        try {
            $tenantId = $request->get('tenant_id');
            $jobs = $this->service->listar($tenantId);
            return response()->json(['success' => true, 'data' => $jobs]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json([
                'error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."
            ]);
        }
    }

    public function sincronizarSiape(Request $request)
    {
        $usuario_id = $request->input('usuario_id', '08246b0c-e5ff-11ee-a54a-0242ac130002');
        SincronizarSiapeJob::dispatch($usuario_id);
        return response()->json(['message' => 'sincronizarSiape iniciado com sucesso!']);
    }

    public function logJob()
    {
        LogJob::dispatch(true);
        return response()->json(['message' => 'LogJob iniciado com sucesso!']);
    }

    public function getClassJobs()
    {
        $jobs = $this->service->getAllClassJobs();
        return response()->json(['success' => true, 'data' => $jobs]);
    }
}
