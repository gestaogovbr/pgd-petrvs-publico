<?php
namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Exports\RelatorioAgenteExport;
use App\Http\Controllers\ControllerBase;
use App\Services\RelatorioAgenteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

class RelatorioAgenteController extends ControllerBase {

    protected function checkPermissions($action, $request, $service, $unidade, $usuario) {
        return true;
    }

    public function query(Request $request) {
        if (!$this->getUsuario($request)->hasPermissionTo('MOD_RELATORIO_USUARIO')){
            throw new ServerException("RelatorioCapacidade", "Acesso negado ao relatório de Agentes.");
        }

        try {
            $data = $request->validate([
                'page' => ['nullable'],
                'limit' => ['nullable'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'where' => ['array']
            ]);

            $service = new RelatorioAgenteService();
            $result = $service->query($data);

            if ($request->is('*/xls')) {
                return Excel::download(
                    new RelatorioAgenteExport($result['rows']),
                    'relatorio-agentes.xlsx'
                );
            }

            return response()->json([
                'success' => true,
                'count' => $result['count'],
                'rows' => $result['rows'],
                'extra' => []
            ]);

        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."], 500);
        }
    }
}
