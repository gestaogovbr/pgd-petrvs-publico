<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class PlanejamentoObjetivoController extends ControllerBase {

    public $updatable = ["sequencia", "eixo_tematico_id", "objetivo_pai_id", "objetivo_superior_id"];

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PLAN_INST_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_PLAN_INST_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PLAN_INST_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
                break;
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_PLAN_INST_CONS')) throw new ServerException("CapacidadeStore", "Consulta não realizada");
                break;
        }
    }

}
