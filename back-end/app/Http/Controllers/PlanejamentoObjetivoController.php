<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class PlanejamentoObjetivoController extends ControllerBase {

    public $updatable = ["sequencia", "eixo_tematico_id", "objetivo_pai_id", "objetivo_superior_id"];

    public function ordenar(Request $request) {
        try {
            $this->checkPermissions("EDIT", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'objetivos' => 'required|array',
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->ordenar($data['objetivos'])
            ]);
        } catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PLAN_INST_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_PLAN_INST_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PLAN_INST_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
                break;
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_PLAN_INST')) throw new ServerException("CapacidadeStore", "Consulta não realizada");
                break;
        }
    }

}
