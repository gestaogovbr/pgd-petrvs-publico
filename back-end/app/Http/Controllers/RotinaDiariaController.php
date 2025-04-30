<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use App\Exceptions\LogError;
use App\Exceptions\ServerException;
use App\Services\RotinaDiariaService;
use Throwable;
use Exception;
use Illuminate\Support\Facades\Log;

class RotinaDiariaController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        /* Bloqueia qualquer tentativa de inserir, alterar ou excluir registros*/
        throw new ServerException("CapacidadeStore", "Ação não permitida");
    }
    
     /**
     * Search for a given key
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function run(Request $request)
    {
        try {
            $data = $request->validate([
                'token' => ['required']
            ]);
            $service = new RotinaDiariaService();
            $config = config("rotinas-diarias");
            if(empty($config["token"])) throw new ServerException("Api_Service_Invalid_Credentials","Token das rotinas diárias não configurado no arquivo de variáveis de ambiente");
            if($config["token"] != $data["token"]) throw new ServerException("Api_Service_Invalid_Credentials", "Token das rotinas diárias inválido");
            return response()->json($this->service->run());
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
