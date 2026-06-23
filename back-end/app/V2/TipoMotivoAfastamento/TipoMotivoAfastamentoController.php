<?php

declare(strict_types=1);

namespace App\V2\TipoMotivoAfastamento;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class TipoMotivoAfastamentoController extends Controller
{
    public function __construct(
        private readonly TipoMotivoAfastamentoService $service
    ) {
    }

    public function index(): JsonResponse
    {
        try {
            return response()->json(['success' => true, 'data' => $this->service->index()]);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
