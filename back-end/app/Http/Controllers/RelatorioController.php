<?php
namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Http\Controllers\ControllerBase;
use App\Http\Responses\CsvResponse;
use App\Services\CSV\RelatorioPlanoTrabalhoCsv;
use App\Services\CsvExporter;
use App\Services\RelatorioPlanoTrabalhoService;
use App\Services\RelatorioPlanoTrabalhoDetalhadoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

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
                'page' => ['nullable'],
                'limit' => ['nullable'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'where' => ['array']
            ]);

            $service = new RelatorioPlanoTrabalhoService();
            $result = $service->query($data);

            if (!$request->is('*/csv')) {
                 return response()->json([
                    'success' => true,
                    'count' => $result['count'],
                    'rows' => $result['rows'],
                    'extra' => $result['extra']
                ]);
            } else {
                $csv = RelatorioPlanoTrabalhoCsv::toCSV($result['rows']);
                return CsvResponse::fromData($csv, 'relatorio-planos-trabalho.csv');
            }
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function queryPlanosTrabalhoDetalhado(Request $request) {
        if (!$this->getUsuario($request)->hasPermissionTo('MOD_RELATORIO_PT')){
            throw new ServerException("RelatorioCapacidade", "Acesso negado ao relatório de Planos de Trabalho.");
        }

        try {
            $data = $request->validate([
                'page' => ['nullable'],
                'limit' => ['nullable'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'where' => ['array']
            ]);

            $service = new RelatorioPlanoTrabalhoDetalhadoService();
            $result = $service->query($data);

            if (!$request->is('*/csv')) {
                 return response()->json([
                    'success' => true,
                    'count' => $result['count'],
                    'rows' => $result['rows'],
                    'extra' => $result['extra']
                ]);
            } else {
                $csv = RelatorioPlanoTrabalhoCsv::toCSV($result['rows']);
                return CsvResponse::fromData($csv, 'relatorio-planos-trabalho.csv');
            }
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
