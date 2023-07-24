<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class IntegracaoServidorController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_LOGS')) throw new ServerException("CapacidadeStore");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_LOGS')) throw new ServerException("CapacidadeUpdate");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_LOGS')) throw new ServerException("CapacidadeDestroy");
                break;
        }
     }
}
