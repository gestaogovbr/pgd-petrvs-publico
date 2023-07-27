<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use Throwable;

class UnidadeIntegranteController extends ControllerBase {
    
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}

    public function loadUsuariosIntegrantes(Request $request) {
        try {
            $data = $request->validate([
                'unidade_id' => ['required']
            ]);
            $result = $this->service->loadUsuariosIntegrantes($data["unidade_id"]);
            return response()->json([
                'success' => true,
                'rows' => $result['rows'],
                'unidade' => $result['unidade']
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function loadUnidadesIntegrantes(Request $request) {
        try {
            $data = $request->validate([
                'usuario_id' => ['required']
            ]);
            $result = $this->service->loadUnidadesIntegrantes($data["usuario_id"]);
            return response()->json([
                'success' => true,
                'rows' => $result['rows'],
                'usuario' => $result['usuario']
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function saveUsuarioIntegrante(Request $request) {
        try {
            $data = $request->validate([
                'unidade_id' => ['required'],
                'integrante' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->saveUsuarioIntegrante($data["unidade_id"], $data["integrante"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }


}
