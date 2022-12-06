<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Services\UsuarioService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class UsuarioController extends ControllerBase
{
    public $updatable = ["config", "notificacoes"];

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_USER_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_USER_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_USER_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }

    public function dashboard(Request $request) {
        try {
            $data = $request->validate([
                'usuario_id' => ['required']
            ]);
            $result = response()->json([
                'success' => true,
                'data' => $this->service->dashboard($data['usuario_id'])
            ]);
            return $result;
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function planosPorPeriodo(Request $request) {
        try {
            $data = $request->validate([
                'usuario_id' => ['required'],
                'inicioPeriodo' => [],
                'fimPeriodo' => []
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->planosPorPeriodo($data['usuario_id'], $data['inicioPeriodo'], $data['fimPeriodo'])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
