<?php

namespace App\Http\Controllers;

use App\Models\TipoJustificativa;
use App\Services\TipoJustificativaService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class TipoJustificativaController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_TIPO_JUST_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_TIPO_JUST_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_TIPO_JUST_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }
}
