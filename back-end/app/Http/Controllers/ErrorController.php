<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Http\Request;
use Throwable;

class ErrorController extends ControllerBase {
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

    public function showResponsaveis(Request $request) {
        try {
            $this->checkPermissions("QUERY", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            return response()->json(['success' => true, 'responsaveis' => $this->service->showResponsaveis()]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
