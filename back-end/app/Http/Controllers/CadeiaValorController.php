<?php

namespace App\Http\Controllers;

use App\Models\Planejamento;
use App\Services\PlanejamentoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class CadeiaValorController extends ControllerBase {

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PGENTR_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_PGENTR_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PGENTR_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_PGENTR_CONS')) throw new ServerException("CapacidadeStore", "Consulta não executada");
                break;
        }
    }


    public function avaliar(Request $request){

    }

    public function cancelarAvaliacao(Request $request) {

    }

    public function arquivar(Request $request) {

    }
}
