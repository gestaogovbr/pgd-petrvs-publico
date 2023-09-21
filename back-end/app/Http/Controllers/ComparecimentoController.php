<?php

namespace App\Http\Controllers;

use App\Models\Comparecimento;
use App\Services\ComparecimentoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class ComparecimentoController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
      /*
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_COMPAR_INCL')) throw new ServerException("ComparecimentoStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_COMPAR_EDT')) throw new ServerException("ComparecimentoStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_COMPAR_EXCL')) throw new ServerException("ComparecimentoStore", "Exclusão não realizada");
                break;
        }
      */
    }
}
