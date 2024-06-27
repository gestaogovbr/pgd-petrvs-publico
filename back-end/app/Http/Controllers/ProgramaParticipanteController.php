<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Log;
use Throwable;

class ProgramaParticipanteController extends ControllerBase {
    
    /* Utilizar as mesmas capacidades do programa */
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PART_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
                break;
            case 'HABILITAR':
                if (!$usuario->hasPermissionTo('MOD_PART_HAB')) throw new ServerException("ValidateUsuario", "Usuário não tem permissão para habilitar participantes.");
                break;
            case 'DESABILITAR':
                if (!$usuario->hasPermissionTo('MOD_PART_DESAB')) throw new ServerException("ValidateUsuario", "Usuário não tem permissão para desabilitar participantes.");
                break;
        }
    }

    public function quantidadePlanosTrabalhoAtivos(Request $request) { // ou desabilitar
        try {
            $data = $request->validate([
                'ids' => ['array']
            ]);
            $qtd = $this->service->quantidadePlanosTrabalhoAtivos($data['ids']);
            return response()->json([
                'success' => true,
                'count' => $qtd
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

    public function habilitar(Request $request) { // ou desabilitar
        try {
            $data = $request->validate([
                'participantes_ids' => ['array'],
                'habilitar' => ['required'],
                'programa_id' => ['string'],
                'suspender_plano_trabalho' => ['required']
            ]);
            $this->checkPermissions($data['habilitar'] ? "HABILITAR" : "DESABILITAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            return response()->json([
                'success' => true,
                'data' => $this->service->habilitar($data)
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

    public function notificar(Request $request) {
        try {
            $data = $request->validate([
                'participantes_ids' => ['string'],
                'habilitado' => ['required'],
                'programa_id' => ['string'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->notificar($data)
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
