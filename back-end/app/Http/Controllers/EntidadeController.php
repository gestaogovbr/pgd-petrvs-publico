<?php

namespace App\Http\Controllers;

use App\Models\Entidade;
use App\Services\EntidadeService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class EntidadeController extends ControllerBase {
    public $updatable = [
        "nomenclatura", 
        "url_sei", 
        "notificacoes", 
        "tipo_modalidade_id", 
        "forma_contagem_carga_horaria", 
        "carga_horaria_padrao",
        "expediente"
    ];

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_ENTD_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_ENTD_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_ENTD_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }

    public function generateApiKey(Request $request) {
        try {
            $data = $request->validate([
                'entidade_id' => ['required']
            ]);
            return response()->json([
                'api_public_key' => $this->service->generateApiKey($data['entidade_id'])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
