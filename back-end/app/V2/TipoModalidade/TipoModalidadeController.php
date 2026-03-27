<?php

namespace App\V2\TipoModalidade;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class TipoModalidadeController extends Controller
{
    public function __construct(
        private readonly TipoModalidadeService $service
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
