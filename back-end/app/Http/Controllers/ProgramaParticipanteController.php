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
                if (!$usuario->hasPermissionTo('MOD_PRGT_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_PRGT_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PRGT_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }

    public function habilitar(Request $request) {
        try {
            $usuario = parent::loggedUser();
            if (!$usuario->hasPermissionTo('MOD_PRGT_INCL')) throw new ServerException("ValidateProgramaParticipante", "Usuário não tem permissão para habilitar participantes");
            $data = $request->validate([
                'participantes_ids' => ['array'],
                'habilitado' => ['required'],
                'programa_id' => ['string'],
            ]);
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
