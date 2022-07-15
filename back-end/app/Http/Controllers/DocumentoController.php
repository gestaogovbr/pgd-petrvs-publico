<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use App\Services\DocumentoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

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
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function assinar(Request $request) {
        try {
            $data = $request->validate([
                'documento_id' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->assinar($data["documento_id"])
            ]); 
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
