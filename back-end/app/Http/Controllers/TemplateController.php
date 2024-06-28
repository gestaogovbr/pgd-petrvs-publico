<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class TemplateController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario)
    {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_TEMP_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_TEMP_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_TEMP_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
                break;
        }
    }

    public function teste(Request $request)
    {
        try {
            return response()->json([
                'dados' => $this->service->teste()
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

    public function carregaDataset(Request $request) {
        try {
            $data = $request->validate([
                'especie' => ['required'],
                'codigo' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'dataset' => $this->service->loadDataset($data['especie'], $data['codigo'])
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

    public function geraRelatorio(Request $request) {
        try {
            $params = $request->input();
            $data = $request->validate([
                'entidade' => ['required'],
                'codigo' => ['required'],
                'params' => ['required']
            ]);
            unset($data['params']['limit']);
            return response()->json([
                'success' => true,
                'report' => $this->service->gerarRelatorio($data)
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
