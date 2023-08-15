<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use Throwable;

class UnidadeIntegranteController extends ControllerBase {
    
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}

    public function loadIntegrantes(Request $request) {
        try {
            $data = $request->validate([
                'unidade_id' => ['present','required_if:usuario_id,null'],
                'usuario_id' => ['present','required_if:unidade_id,null']
            ]);
            $result = $this->service->loadIntegrantes($data["unidade_id"],$data["usuario_id"]);
            return response()->json([
                'success' => true,
                'rows' => $result['rows'],
                'unidade' => $result['unidade'],
                'usuario' => $result['usuario'],
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function saveIntegrante(Request $request) {
        try {
            $data = $request->validate([
                'vinculos' => ['array','required'],
                'vinculos.*.unidade_id' => ['string','required'],
                'vinculos.*.usuario_id' => ['string','required'],
                'vinculos.*.atribuicoes' => ['array','nullable']
            ]);

            return response()->json([
                'success' => true,
                'data' => $this->service->saveIntegrante($data["vinculos"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }


}
