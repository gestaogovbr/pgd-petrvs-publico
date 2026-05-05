<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Http\Controllers\ControllerBase;
use App\Services\EnvioUsuarioService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class EnvioUsuarioController extends ControllerBase
{
    protected function checkPermissions($action, $request, $service, $unidade, $usuario)
    {
        return true;
    }

    public function query(Request $request)
    {
        if (!$this->getUsuario($request)->hasPermissionTo('MOD_ENVIO_USUARIO')) {
            throw new ServerException('EnvioUsuario', 'Acesso negado ao relatório de envio de participantes.');
        }

        try {
            $data = $request->validate([
                'page' => ['nullable'],
                'limit' => ['nullable'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'where' => ['array'],
            ]);

            $usuario = $this->getUsuario($request);
            $service = new EnvioUsuarioService();
            $result = $service->queryForEnvioList($data, $usuario);

            return response()->json([
                'success' => true,
                'count' => $result['count'],
                'rows' => $result['rows'],
                'extra' => [],
            ]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => 'Codigo '.$dataError['code'].': Ocorreu um erro inesperado.'], 500);
        }
    }
}
