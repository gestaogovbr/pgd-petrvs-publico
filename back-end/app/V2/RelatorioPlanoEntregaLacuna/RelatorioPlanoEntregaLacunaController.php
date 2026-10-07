<?php

declare(strict_types=1);

namespace App\V2\RelatorioPlanoEntregaLacuna;

use App\Exceptions\Contracts\IBaseException;
use App\Exports\RelatorioPlanoEntregaLacunaExport;
use App\Http\Controllers\Controller;
use App\V2\RelatorioPlanoEntregaLacuna\Validators\RelatorioPlanoEntregaLacunaAuthorizationValidator;
use App\V2\RelatorioPlanoEntregaLacuna\Validators\RelatorioPlanoEntregaLacunaIndexRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class RelatorioPlanoEntregaLacunaController extends Controller
{
    public function __construct(
        private readonly RelatorioPlanoEntregaLacunaService $service,
        private readonly RelatorioPlanoEntregaLacunaAuthorizationValidator $authorizationValidator,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $this->authorizationValidator->validarAcesso();

            $data = RelatorioPlanoEntregaLacunaIndexRequestValidator::index($request);
            $result = $this->service->index($data, $request);

            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function export(Request $request)
    {
        try {
            $this->authorizationValidator->validarAcesso();

            $data = RelatorioPlanoEntregaLacunaIndexRequestValidator::index($request);
            $result = $this->service->export($data, $request);

            return Excel::download(
                new RelatorioPlanoEntregaLacunaExport($result['rows']),
                'relatorio-lacunas-planos-entrega.xlsx'
            );
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
