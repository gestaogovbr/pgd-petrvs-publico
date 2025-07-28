<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class PlanoEntregaEntregaController extends ControllerBase {

    public $updatable = ["realizado", "progresso_realizado", "comentarios", "etiquetas", "checklist"];

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PENT_ENTR_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_PENT_ENTR_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PENT_ENTR_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
                break;
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_PENT')) throw new ServerException("CapacidadeStore", "Consulta não realizada");
                break;
        }
    }

    public function hierarquia(Request $request)
    {
        try {
            $data = $request->validate([
                'entrega_id' => ['required'],
            ]);
            return response()->json([
                'success' => true,
                'hierarquia' => $this->service->hierarquia($data)
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function possuiVinculosExcluidos(Request $request)
    {
        try {
            $data = $request->validate([
                'entregaIds' => ['required'],
            ]);
            $result = $this->service->possuiVinculosExcluidos($data['entregaIds']);
            return response()->json([
                'success' => true,
                'vinculos_excluidos' => $result
            ]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        } catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }   

}
