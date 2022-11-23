<?php

namespace App\Http\Controllers;

use App\Models\Perfil;
use App\Services\PerfilService;
use App\Services\RawWhere;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Auth;

class PerfilController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PERF_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_PERF_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PERF_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }

    public function searchText(Request $request)
    {
        //$request->request->add(['where' => [RawWhere::raw("(data_fim is null or data_fim > NOW()) and nivel >= " . parent::loggedUser()->Perfil->nivel)]]);
        //$request->request->add(['orderBy' => [["nivel", "asc"]]]);
        return parent::searchText($request);
    }
}
