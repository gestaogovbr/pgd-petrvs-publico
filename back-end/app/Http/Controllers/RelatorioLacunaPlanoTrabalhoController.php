<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Exports\RelatorioLacunaPlanoTrabalhoExport;
use App\Http\Controllers\ControllerBase;
use App\Services\RelatorioLacunaPlanoTrabalhoService;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

class RelatorioLacunaPlanoTrabalhoController extends ControllerBase
{
    protected function checkPermissions($action, $request, $service, $unidade, $usuario)
    {
        return true;
    }

    public function query(Request $request)
    {
        $usuario = $this->getUsuario($request);

        if (!$usuario->hasPermissionTo('MOD_RELATORIO_PT')) {
            throw new ServerException('RelatorioLacunaPlanoTrabalho', 'Acesso negado ao relatório de Lacunas de Planos de Trabalho.');
        }

        try {
            $data = $request->validate([
                'page' => ['nullable'],
                'limit' => ['nullable'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'where' => ['array'],
            ]);

            $service = new RelatorioLacunaPlanoTrabalhoService();
            $result = $service->query($data);

            if ($request->is('*/xls')) {
                return Excel::download(
                    new RelatorioLacunaPlanoTrabalhoExport($result['rows']),
                    'relatorio-lacunas-plano-trabalho.xlsx'
                );
            }

            return response()->json([
                'success' => true,
                'count' => $result['count'],
                'rows' => $result['rows'],
                'extra' => [],
            ]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], 500);
        }
    }
}
