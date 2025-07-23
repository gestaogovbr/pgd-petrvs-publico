<?php
namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Exports\RelatorioPlanoTrabalhoDetalhadoExport;
use App\Exports\RelatorioPlanoTrabalhoExport;
use App\Http\Controllers\ControllerBase;
use App\Http\Responses\CsvResponse;
use App\Services\CSV\RelatorioPlanoTrabalhoCsv;
use App\Services\RelatorioPlanoTrabalhoDetalhadoService;
use App\Services\RelatorioPlanoTrabalhoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
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

            if ($request->is('*/csv')) {
                $csv = RelatorioPlanoTrabalhoCsv::toCSV($result['rows']);
                return CsvResponse::fromData($csv, 'relatorio-planos-trabalho.csv');
            }

            if ($request->is('*/xls')) {
                return Excel::download(
                    new RelatorioPlanoTrabalhoExport($result['rows']),
                    'relatorio-planos-trabalho.xlsx'
                );
            }

            return response()->json([
                'success' => true,
                'count' => $result['count'],
                'rows' => $result['rows'],
                'extra' => $result['extra']
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

            if ($request->is('*/csv')) {
                $csv = RelatorioPlanoTrabalhoCsv::toCSV($result['rows']);
                return CsvResponse::fromData($csv, 'relatorio-planos-trabalho.csv');
            }

            if ($request->is('*/xls')) {
                return Excel::download(
                    new RelatorioPlanoTrabalhoDetalhadoExport($result['rows']),
                    'relatorio-planos-trabalho.xlsx'
                );
            }

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
