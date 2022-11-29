<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CalendarioService;
use Throwable;

class CalendarioController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}

    public function feriadosCadastrados(Request $request) {
        try {
            $data = $request->validate([
                'unidade_id' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'feriados' => $this->service->feriadosCadastrados($data["unidade_id"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function feriados(Request $request)
    {
        try {
            $data = $request->validate([
                'inicio' => ['required'],
                'fim' => ['required'],
                'unidade_id' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'feriados' => $this->service->feriados($data["inicio"], $data["fim"], $data["unidade_id"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
