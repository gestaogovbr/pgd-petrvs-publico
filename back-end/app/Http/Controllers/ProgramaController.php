<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Http\Request;
use Throwable;

class ProgramaController extends ControllerBase {

    public $updatable = ["participantes"];

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PRGT_INCL')) throw new ServerException("ProgramaStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_PRGT_EDT')) throw new ServerException("ProgramaStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PRGT_EXCL')) throw new ServerException("ProgramaDestroy", "Exclusão não realizada");

                $data = $request->validate([
                    'id' => ['required'],
                    'with' => ['planosTrabalho', 'planosEntrega']
                ]);
                $programa = $this->service->getById($data);

                if (count($programa->planosTrabalho) > 0) {
                    throw new ServerException("ValidateProgramaWithPTDestroy");
                }

                if (count($programa->planosEntrega) > 0) {
                    throw new ServerException("ValidateProgramaWithPEDestroy");
                }

                break;
        }
    }
}
