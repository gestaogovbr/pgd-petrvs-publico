<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class TarefaController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_TRF_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_TRF_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_TRF_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }
}
