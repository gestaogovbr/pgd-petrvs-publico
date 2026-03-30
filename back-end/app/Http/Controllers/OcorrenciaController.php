<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;
use Illuminate\Support\Facades\Validator;

class OcorrenciaController extends ControllerBase {

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                $entity = $request->input('entity', []);
                if (!empty($entity['id'])) {
                    if (!$usuario->hasPermissionTo('MOD_OCOR_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                } else {
                    if (!$usuario->hasPermissionTo('MOD_OCOR_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                }
                break;
            case 'EDIT':
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_OCOR_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_OCOR_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_OCOR')) throw new ServerException("CapacidadeStore", "Consulta não executada");
                break;
        }
    }

}
