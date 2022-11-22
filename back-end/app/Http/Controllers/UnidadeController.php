<?php

namespace App\Http\Controllers;

use App\Models\Unidade;
use App\Services\UnidadeService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

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
        } catch (Throwable $e) {
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function mesmaSigla(Request $request) {
        try {
            if (!parent::loggedUser()->hasPermissionTo('MOD_UND_UNIR')) throw new ServerException("ValidateUnidade", "Usuário precisa ter capacidade MOD_UND_UNIR");
            //$data = $request->validate([]);
            return response()->json([
                'success' => true,
                'rows' => $this->service->mesmaSigla($this->getUnidade($request)->entidade_id)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function unificar(Request $request) {
        try {
            if (!parent::loggedUser()->hasPermissionTo('MOD_UND_UNIR')) throw new ServerException("ValidateUnidade", "Usuário precisa ter capacidade MOD_UND_UNIR");
            $data = $request->validate([
                'correspondencias' => ['array'],
                'exclui' => ['required']
            ]);
            return response()->json([
                'success' => $this->service->unificar($data["correspondencias"], $data["exclui"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function inativo(Request $request) {
        try {
            if (!parent::loggedUser()->hasPermissionTo('MOD_UND_INATV')) throw new ServerException("ValidateUnidade", "Usuário precisa ter capacidade MOD_UND_INATV");
            $data = $request->validate([
                'id' => ['required'],
                'inativo' => ['required']
            ]);
            return response()->json([
                'success' => $this->service->inativo($data["id"], $data["inativo"])
            ]);
        } catch (Throwable $e) {
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
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
