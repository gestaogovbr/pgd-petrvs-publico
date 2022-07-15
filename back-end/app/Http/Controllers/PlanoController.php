<?php

namespace App\Http\Controllers;

use App\Models\Plano;
use App\Services\PlanoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class PlanoController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PTR_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_PTR_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PTR_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }

    public function metadados(Request $request) {
        try {
            $data = $request->validate([
                'plano' => ['required'],
                'inicioPeriodo' => [],
                'fimPeriodo' => []
            ]);
            return response()->json([
                'success' => true,
                'metadados' => $this->service->metadados($data["plano"], $data['inicioPeriodo'], $data['fimPeriodo'])
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function metadadosPlano(Request $request) {
        try {
            $data = $request->validate([
                'plano_id' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'metadadosPlano' => $this->service->metadadosPlano($data["plano_id"])
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
