<?php

namespace App\Http\Controllers;

use App\Models\Unidade;
use App\Services\UnidadeService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class UnidadeController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_UND_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_UND_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_UND_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }

    public function metadadosUnidade(Request $request) {
        try {
            $data = $request->validate([
                'unidade_id' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'metadadosUnidade' => $this->service->metadadosUnidade($data["plano_id"])
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function metadadosArea(Request $request) {
        try {
            $data = $request->validate([
                'unidade_id' => ['required'],
                'programa_id' => ['required'],
            ]);
            return response()->json([
                'success' => true,
                'metadadosArea' => $this->service->metadadosArea($data["unidade_id"], $data["programa_id"])
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function dashboards(Request $request) {
        try {
            $data = $request->validate([
                'idsUnidades' => ['required'],
                'programa_id' => ['required'],
                'unidadesSubordinadas' => ['required']
            ]);
            $result = response()->json([
                'success' => true,
                'dashboards' => $this->service->dashboards($data["idsUnidades"], $data["programa_id"], $data["unidadesSubordinadas"])
            ]);
            return $result;
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
