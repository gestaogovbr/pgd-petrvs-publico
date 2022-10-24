<?php

namespace App\Http\Controllers;

use App\Models\Atividade;
use App\Services\AtividadeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class AtividadeController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_ATV_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_ATV_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_ATV_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }

    public function atividadeDashboard(Request $request) {
        try {
            $data = $request->validate([
                'unidade_id' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->atividadeDashboard($data['unidade_id'])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function homologar(Request $request) {
        try {
            $usuario = Auth::user();
            if (!$usuario->hasPermissionTo('MOD_ATV_EDT_OTR_OP_HOM')) throw new ServerException("ValidateAtividade", "Usuário não tem permissão para alterar a homologação");
            $data = $request->validate([
                'atividades_ids' => ['array'],
                'data_homologacao' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->homologar($data)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
