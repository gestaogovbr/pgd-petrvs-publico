<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class ProgramaParticipanteController extends ControllerBase {
    
    /* Utilizar as mesmas capacidades do programa */
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PRGT_PART_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
                break;
            case 'HABILITAR':
                if (!$usuario->hasPermissionTo('MOD_PRGT_PART_HAB')) throw new ServerException("ValidateUsuario", "Usuário não tem permissão para habilitar participantes.");
                break;
            case 'DESABILITAR':
                if (!$usuario->hasPermissionTo('MOD_PRGT_PART_DESAB')) throw new ServerException("ValidateUsuario", "Usuário não tem permissão para desabilitar participantes.");
                break;
        }
    }

    public function habilitar(Request $request) { // ou desabilitar
        try {
            $data = $request->validate([
                'participantes_ids' => ['array'],
                'habilitar' => ['required'],
                'programa_id' => ['string'],
            ]);
            $this->checkPermissions($data['habilitar'] ? "HABILITAR" : "DESABILITAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            return response()->json([
                'success' => true,
                'data' => $this->service->habilitar($data)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
