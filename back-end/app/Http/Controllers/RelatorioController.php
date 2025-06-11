<?php
namespace App\Http\Controllers;

use App\Exceptions\ServerException;
use App\Http\Controllers\ControllerBase;
use App\Services\RelatorioPlanoTrabalhoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;
use App\Exceptions\Contracts\IBaseException;

class RelatorioController extends ControllerBase {

    protected function checkPermissions($action, $request, $service, $unidade, $usuario) {
        return true;
    }

    public function queryPlanosTrabalho(Request $request) {
        if (!$this->getUsuario($request)->hasPermissionTo('MOD_RELATORIO_PT')){
            throw new ServerException("RelatorioCapacidade", "Acesso negado ao relatório de Planos de Trabalho.");
        }

        try {
            $data = $request->validate([
                'page' => ['required'],
                'limit' => ['required'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'where' => ['array']
            ]);

            $service = new RelatorioPlanoTrabalhoService();
            $result = $service->query($data);

            \Log::info($result);

            return response()->json([
                'success' => true,
                'count' => $result['count'],
                'rows' => $result['rows'],
                'extra' => $result['extra']
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
