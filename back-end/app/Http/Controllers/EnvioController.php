<?php

namespace App\Http\Controllers;

use App\Exceptions\ServerException;
use App\Http\Controllers\ControllerBase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Exceptions\Contracts\IBaseException;
use Throwable;

class EnvioController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_DEV_TUDO')) throw new ServerException("CapacidadeSearchText", "Consulta não realizada");
                break;
            case 'GETBYID':
                if (!$usuario->hasPermissionTo('MOD_DEV_TUDO')) throw new ServerException("CapacidadeSearchText", "Consulta não realizada");
                break;
        }
    }

    public function reiniciar(Request $request) {
        try {

            $this->service->reiniciar();

            return response()->json([
                'success' => true
            ]);

        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage(), 400]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json([
                'success' => false,
                'error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado.".$e->getMessage()
            ], 400);
        }
    }

    public function forcar(Request $request) {
        try {
            $data = $request->validate([
                'id' => ['string'],
            ]);

            Log::error($data);

            $this->service->forcarEnvio($data['id']);

            return response()->json([
                'success' => true,
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            throw $e;
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
