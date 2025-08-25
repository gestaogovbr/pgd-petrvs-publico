<?php

namespace App\Http\Controllers;

use App\Exceptions\ServerException;
use App\Exceptions\Contracts\IBaseException;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Throwable;

class TipoSituacaoController {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_TIPO_SITU_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_TIPO_SITU_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_TIPO_SITU_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
                break;
        }
    }

    /**
     * Query
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function query(Request $request)
    {
        try {
            $status = ['ATIVO', 'INATIVO', 'ATIVO TEMPORARIO'];

            $lista = array_map(function ($item) {
                return [
                    'id' => $item,
                    'nome' => $item
                ];
            }, $status);
            $retorno = array(
                "success" => true,
                "count" => count($lista),
                "rows" => $lista,
                "extra"=> null
            );

            return response()->json($retorno);
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
