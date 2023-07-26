<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class TipoProjetoController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_TIPO_PROJ_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_TIPO_PROJ_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_TIPO_PROJ_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }
}
