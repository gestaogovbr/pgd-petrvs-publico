<?php

namespace App\Http\Controllers;

use App\Models\Capacidade;
use App\Services\CapacidadeService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class CapacidadeController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_ATV_INCLUI')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_ATV_EDTA')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_ATV_EXCLUI')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }
}
