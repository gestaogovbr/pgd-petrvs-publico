<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class ChangeController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('DEV_MOD_LOGS')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('DEV_MOD_LOGS')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
            case 'QUERY':
                if (!$usuario->hasPermissionTo('DEV_MOD_LOGS')) throw new ServerException("CapacidadeSearchText", "Consulta não executada");
                break;
        }
    }
}
