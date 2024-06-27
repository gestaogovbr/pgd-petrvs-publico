<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado ao tentar salvar o registro"]);
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
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado ao tentar salvar o registro"]);
        }
    }

}
