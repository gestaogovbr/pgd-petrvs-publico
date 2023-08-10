<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class PlanoTrabalhoConsolidacaoController extends ControllerBase {

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PTR_CSLD_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_PTR_CSLD_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PTR_CSLD_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
            case 'QUERY':
                //if (!$usuario->hasPermissionTo('MOD_PTR_CSLD_CONS')) throw new ServerException("CapacidadeStore", "Consulta não executada");
                break;
        }
    }

    public function consolidacaoDados(Request $request) {
        try {
            $this->checkPermissions('QUERY', $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required'],
            ]);
            return response()->json([
                'success' => true,
                'dados' => $this->service->consolidacaoDados($data["id"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
