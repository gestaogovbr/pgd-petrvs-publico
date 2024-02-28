<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class TrafficController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_DEV_TUDO')) throw new ServerException("CapacidadeStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_DEV_TUDO')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
                break;
        }
    }
}
