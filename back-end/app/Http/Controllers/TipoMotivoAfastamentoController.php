<?php

namespace App\Http\Controllers;

use App\Models\TipoMotivoAfastamento;
use App\Services\TipoMotivoAfastamentoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

class TipoMotivoAfastamentoController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_TIPO_MTV_AFT_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_TIPO_MTV_AFT_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_TIPO_MTV_AFT_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }
}
