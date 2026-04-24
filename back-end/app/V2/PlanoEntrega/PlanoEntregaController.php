<?php

namespace App\V2\PlanoEntrega;

use App\Http\Controllers\Controller;
use App\V2\PlanoEntrega\DTOs\PlanoEntregaBuscaDTO;
use App\V2\PlanoEntrega\DTOs\PlanoEntregaEntregaBuscaDTO;
use App\V2\PlanoEntrega\Validators\PlanoEntregaRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class PlanoEntregaController extends Controller
{
    protected PlanoEntregaService $service;

    public function __construct(PlanoEntregaService $service)
    {
        $this->service = $service;
    }

    public function buscarEntregasPorPlano(Request $request, string $planoEntregaId): JsonResponse
    {
        try {
            $validatedId = PlanoEntregaRequestValidator::buscarEntregasPorPlano($planoEntregaId);
            $dto = new PlanoEntregaEntregaBuscaDTO($validatedId);
            $result = $this->service->buscarEntregasPorPlano($dto);
            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function buscarPorUnidade(Request $request): JsonResponse
    {
        try {
            $data = PlanoEntregaRequestValidator::buscarPorUnidade($request);
            $dto = PlanoEntregaBuscaDTO::fromArray($data);
            $result = $this->service->buscarPorUnidade($dto);
            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
