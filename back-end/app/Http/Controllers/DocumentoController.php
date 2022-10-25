<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use App\Services\DocumentoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use Throwable;

class DocumentoController extends ControllerBase 
{
    public $updatable = ["status", "numero_documento"];

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}

    public function pendenteSei(Request $request) {
        try {
            $data = $request->validate([
                'id_documento' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->pendenteSei($data["id_documento"])
            ]); 
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function assinar(Request $request) {
        try {
            $data = $request->validate([
                'documentos_ids' => ['array']
            ]);
            return response()->json([
                'success' => true,
                'rows' => $this->service->assinar($data)
            ]); 
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
