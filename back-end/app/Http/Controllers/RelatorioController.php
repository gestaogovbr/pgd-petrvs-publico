<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Exports\RelatorioPlanoTrabalhoDetalhadoExport;
use App\Exports\RelatorioPlanoTrabalhoExport;
use App\Http\Responses\CsvResponse;
use App\Services\CSV\RelatorioPlanoTrabalhoCsv;
use App\Services\RelatorioPlanoTrabalhoAuthorization;
use App\Services\RelatorioPlanoTrabalhoDetalhadoService;
use App\Services\RelatorioPlanoTrabalhoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class RelatorioController extends Controller
{
    public function __construct(
        private readonly RelatorioPlanoTrabalhoService $planoTrabalhoService,
        private readonly RelatorioPlanoTrabalhoDetalhadoService $planoTrabalhoDetalhadoService,
        private readonly RelatorioPlanoTrabalhoAuthorization $authorization,
    ) {
    }

    public function queryPlanosTrabalho(Request $request): JsonResponse|BinaryFileResponse|HttpResponse
    {
        return $this->consultar($request, $this->planoTrabalhoService, detalhado: false);
    }

    public function queryPlanosTrabalhoDetalhado(Request $request): JsonResponse|BinaryFileResponse|HttpResponse
    {
        return $this->consultar($request, $this->planoTrabalhoDetalhadoService, detalhado: true);
    }

    private function consultar(
        Request $request,
        RelatorioPlanoTrabalhoService $service,
        bool $detalhado,
    ): JsonResponse|BinaryFileResponse|HttpResponse {
        try {
            $this->authorization->usuarioAutorizado();

            $data = $request->validate([
                'page' => ['nullable'],
                'limit' => ['nullable'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'filters' => ['array'],
                'where' => ['array'],
            ]);

            $result = $service->query($data);

            if ($request->is('*/csv')) {
                $csv = RelatorioPlanoTrabalhoCsv::toCSV($result['rows']);

                return CsvResponse::fromData($csv, 'relatorio-planos-trabalho.csv');
            }

            if ($request->is('*/xls')) {
                $export = $detalhado
                    ? new RelatorioPlanoTrabalhoDetalhadoExport($result['rows'])
                    : new RelatorioPlanoTrabalhoExport($result['rows']);

                return Excel::download($export, 'relatorio-planos-trabalho.xlsx');
            }

            return response()->json([
                'success' => true,
                'count' => $result['count'],
                'rows' => $result['rows'],
                'extra' => $result['extra'],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => collect($e->errors())->flatten()->first() ?? $e->getMessage(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: Response::HTTP_FORBIDDEN);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
