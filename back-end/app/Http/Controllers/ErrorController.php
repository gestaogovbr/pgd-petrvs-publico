<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class ErrorController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_LOGS_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_LOGS_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }
}
