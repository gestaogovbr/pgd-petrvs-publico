<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Log;
use Throwable;

class PlanoTrabalhoConsolidacaoController extends ControllerBase {

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PTR_CSLD_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_PTR_CSLD_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PTR_CSLD_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
                break;
            case 'QUERY':
                break;
        }
    }

    public function consolidacaoDados(Request $request) {
        try {
            $this->checkPermissions('QUERY', $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required'],
            ]);
            return response()->json([
                'success' => true,
                'dados' => $this->service->consolidacaoDados($data["id"])
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

    public function concluir(Request $request) {
        try {
            $this->checkPermissions('CONC', $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required'],
                'justificativa_conclusao' => ['nullable', 'string'],
            ]);
            return response()->json([
                'success' => true,
                'dados' => $this->service->concluir($data["id"], $data["justificativa_conclusao"])
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

    public function cancelarConclusao(Request $request) {
        try {
            $this->checkPermissions('CONC', $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required'],
            ]);
            return response()->json([
                'success' => true,
                'dados' => $this->service->cancelarConclusao($data["id"])
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

    public function pendenciasUsuario(Request $request) {
        try {
            $this->checkPermissions('QUERY', $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            return response()->json([
                'success' => true,
                'dados' => $this->service->pendenciasUsuario($this->getUsuario($request)->id)
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

    public function inconsistencias(Request $request) {
        try {
            $this->checkPermissions('QUERY', $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'usuario_id' => ['nullable', 'string'],
            ]);
            return response()->json([
                'success' => true,
                'dados' => $this->service->detectarInconsistencias($data['usuario_id'] ?? null)
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
}
