<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Exports\RelatorioUnidadeExport;
use App\Services\RelatorioUnidadeAuthorization;
use App\Services\RelatorioUnidadeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class RelatorioUnidadeController extends Controller
{
    public function __construct(
        private readonly RelatorioUnidadeService $service,
        private readonly RelatorioUnidadeAuthorization $authorization,
    ) {
    }

    public function query(Request $request): JsonResponse|BinaryFileResponse
    {
        try {
            $this->authorization->usuarioAutorizado();

            $data = $request->validate([
                'page' => ['nullable'],
                'limit' => ['nullable'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'filters' => ['array'],
                'filters.unidade_id' => ['nullable', 'string'],
                'filters.incluir_unidades_subordinadas' => ['nullable', 'boolean'],
                'filters.nome' => ['nullable', 'string'],
                'filters.unidadeHierarquia' => ['nullable', 'string'],
                'filters.codigo' => ['nullable', 'string'],
                'filters.instituidora' => ['nullable', 'string'],
                'filters.executora' => ['nullable', 'string'],
                'filters.peVigenteNome' => ['nullable', 'string'],
                'filters.chefiaNome' => ['nullable', 'string'],
                'filters.totalVinculados' => ['nullable', 'string'],
                'filters.totalSubstitutos' => ['nullable', 'string'],
                'filters.totalDelegados' => ['nullable', 'string'],
                'where' => ['array'],
            ]);

            $result = $this->service->query($data);

            if ($request->is('*/xls')) {
                return Excel::download(
                    new RelatorioUnidadeExport($result['rows']),
                    'relatorio-unidades.xlsx'
                );
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
