<?php

declare(strict_types=1);

namespace App\V2\Ocorrencia;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\Ocorrencia\DTOs\OcorrenciaOperacaoDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaStoreDTO;
use App\V2\Ocorrencia\Validators\OcorrenciaRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class OcorrenciaController extends Controller
{
    public function __construct(
        private readonly OcorrenciaService $service,
    ) {}

    public function agentes(Request $request): JsonResponse
    {
        try {
            $data = OcorrenciaRequestValidator::agentes($request);
            $termo = $data['filters']['termo'] ?? null;
            $page = (int) ($data['page'] ?? 1);
            $perPage = (int) ($data['size'] ?? 20);

            $result = $this->service->agentes($termo, $page, $perPage);

            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $result = $this->service->index($request->all());

            return response()->json(['success' => true, 'data' => $result]);
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function impactoConsolidacoes(Request $request): JsonResponse
    {
        try {
            $data = OcorrenciaRequestValidator::impactoConsolidacoes($request);
            $dto = OcorrenciaOperacaoDTO::fromArray($data);

            $impacto = $this->service->impactoConsolidacoes($dto);

            return response()->json(['success' => true, 'data' => $impacto->toArray()]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $data = OcorrenciaRequestValidator::store($request);
            $dto = OcorrenciaStoreDTO::fromArray($data);
            $ocorrencia = $this->service->store($dto);

            return response()->json(['success' => true, 'data' => $ocorrencia], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Request $request, string $ocorrenciaId): JsonResponse
    {
        try {
            $data = OcorrenciaRequestValidator::destroy($request);
            $this->service->destroy($ocorrenciaId, $data['usuario_id']);

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
