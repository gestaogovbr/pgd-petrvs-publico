<?php

namespace App\V2\PlanoEntrega;

use App\Http\Controllers\Controller;
use App\V2\PlanoEntrega\DataProviders\AvaliacaoPendentePEDataProvider;
use App\V2\PlanoEntrega\DataProviders\HomologacaoPendentePEDataProvider;
use App\V2\PlanoEntrega\DataProviders\RegistroExecucaoAtrasoPEDataProvider;
use App\V2\PlanoEntrega\DataProviders\VigentesPEDataProvider;
use App\V2\PlanoEntrega\DTOs\PlanoEntregaBuscaDTO;
use App\V2\PlanoEntrega\DTOs\PlanoEntregaEntregaBuscaDTO;
use App\V2\PlanoEntrega\Validators\PlanoEntregaRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * TODO: a extensão de `Controller` (base V1) é apenas momentânea. Este controller deve se
 * tornar uma classe stand-alone no futuro, sem herdar do controller base do Laravel/V1,
 * alinhando-se ao padrão V2 (controller apenas orquestra request → DTO → service → JSON).
 */
class PlanoEntregaController extends Controller
{
    protected PlanoEntregaService $service;

    public function __construct(
        PlanoEntregaService $service,
        private readonly AvaliacaoPendentePEDataProvider $avaliacaoPendente,
        private readonly HomologacaoPendentePEDataProvider $homologacaoPendente,
        private readonly RegistroExecucaoAtrasoPEDataProvider $registroExecucaoAtraso,
        private readonly VigentesPEDataProvider $vigentes,
    ) {
        $this->service = $service;
    }

    public function avaliacaoPendente(Request $request): JsonResponse
    {
        try {
            $page = (int) $request->input('page', 1);
            $perPage = (int) $request->input('size', 15);

            $result = $this->avaliacaoPendente->buscar(Auth::id(), $page, $perPage);

            return response()->json(['success' => true, 'data' => $result]);
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function homologacaoPendente(Request $request): JsonResponse
    {
        try {
            $page = (int) $request->input('page', 1);
            $perPage = (int) $request->input('size', 15);

            $result = $this->homologacaoPendente->buscar(Auth::id(), $page, $perPage);

            return response()->json(['success' => true, 'data' => $result]);
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function registroExecucaoAtraso(Request $request): JsonResponse
    {
        try {
            $page = (int) $request->input('page', 1);
            $perPage = (int) $request->input('size', 15);

            $result = $this->registroExecucaoAtraso->buscar(Auth::id(), $page, $perPage);

            return response()->json(['success' => true, 'data' => $result]);
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function vigentes(Request $request): JsonResponse
    {
        try {
            $page = (int) $request->input('page', 1);
            $perPage = (int) $request->input('size', 15);

            $result = $this->vigentes->buscar(Auth::id(), $page, $perPage);

            return response()->json(['success' => true, 'data' => $result]);
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
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
