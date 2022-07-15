<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Services\IntegracaoService;

class IntegracaoController extends Controller
{
    public function sincronizar(Request $request) {
        $this->service = new IntegracaoService();
        try {
            $data = $request->validate([
                'servidores' => ['required'],
                'unidades' => ['required'],
                'entidade' => ['required']
            ]);
            return response()->json(['resultado' => $this->service->sincronizar($data)]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
