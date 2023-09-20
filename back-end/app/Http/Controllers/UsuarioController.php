<?php

namespace App\Http\Controllers;

use App\Services\CalendarioService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Throwable;

class UsuarioController extends ControllerBase
{
    public $updatable = ["config", "notificacoes", "texto_complementar_plano"];

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_USER_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_USER_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_USER_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
                break;
        }
    }

    public function dashboard(Request $request) {
        try {
            $data = $request->validate([
                'data_inicial' => ['required'],
                'data_final' => ['required'],
                'usuario_id' => ['required'],
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->dashboard($data['data_inicial'], $data['data_final'], $data['usuario_id'])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function dashboard_gestor(Request $request) {
        try {
            $data = $request->validate([
                'data_inicial' => ['required'],
                'data_final' => ['required'],
                'unidades' => ['required'],
            ]);
            $result = response()->json([
                'success' => true,
                'data' => $this->service->dashboard_gestor($data['data_inicial'], $data['data_final'], $data['unidades'])
            ]);
            return $result;
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function planosTrabalhoPorPeriodo(Request $request) {
        try {
            $data = $request->validate([
                'usuario_id' => ['required'],
                'inicioPeriodo' => [],
                'fimPeriodo' => []
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->planosTrabalhoPorPeriodo($data['usuario_id'], $data['inicioPeriodo'], $data['fimPeriodo'])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function calculaDataTempoUnidade(Request $request){
        try {
            $data = $request->validate([
                'inicio' => ['required'],
                'fimOuTempo' => ['required'],
                'cargaHoraria' => ['required'],
                'unidade_id' => ['required'],
                'tipo' => ['required'],
                'pausas' => [],
                'afastamentos' => []
            ]);
            return response()->json([
                'success' => true,
                'data' => CalendarioService::preparaParametros($data)
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

/*     public function jaAssinouTCR(Request $request){
        try {
            $data = $request->validate([
                'usuario_id' => ['present'],
                'plano_trabalho_id' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->jaAssinouTCR($data["usuario_id"],$data["plano_trabalho_id"])
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    } */

} 

