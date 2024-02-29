<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class ChangeController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_AUDIT_LOG')) throw new ServerException("CapacidadeSearchText", "Consulta não realizada");
                break;
            case 'GETBYID':
                if (!$usuario->hasPermissionTo('MOD_AUDIT_LOG')) throw new ServerException("CapacidadeSearchText", "Consulta não realizada");
                break;
        }
    }

    public function showResponsaveis(Request $request) {
        try {
            $usuario_ids = $request->validate([
                'usuario_ids' => ['array']
            ]);
            $this->checkPermissions("QUERY", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            return response()->json(['success' => true, 'responsaveis' => $this->service->showResponsaveis($usuario_ids)]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
