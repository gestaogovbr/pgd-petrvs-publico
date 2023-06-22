<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exceptions\LogError;
use App\Exceptions\ServerException;
use App\Services\RotinaDiariaService;
use Throwable;
use Exception;

abstract class RotinaDiariaController extends ControllerBase
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
            if(empty($config["token"])) throw new Exception("Token das rotinas diárias não configurado no arquivo de variáveis de ambiente");
            if($config["token"] != $data["token"]) throw new Exception("Token das rotinas diárias inválido");
            return response()->json($this->service->run());
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
