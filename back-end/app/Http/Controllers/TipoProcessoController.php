<?php

namespace App\Http\Controllers;

use App\Models\TipoProcesso;
use App\Services\TipoProcessoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class TipoProcessoController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_TIPO_PROC_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_TIPO_PROC_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_TIPO_PROC_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
                break;
        }
    }

    public function atualizar(Request $request) {
        try {
            $data = $request->validate([
                'lista' => ['array']
            ]);
            $unidade = $this->getUnidade($request);
            return response()->json([
                'success' => $this->service->atualizar($data["lista"], $unidade)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
