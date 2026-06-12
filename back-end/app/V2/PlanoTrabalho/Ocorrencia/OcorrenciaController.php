<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaStoreDTO;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaUpdateDTO;
use App\V2\PlanoTrabalho\Ocorrencia\Validators\OcorrenciaRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class OcorrenciaController extends Controller
{
    public function __construct(
        private readonly OcorrenciaService $service,
        private readonly OcorrenciaImpactoPolicy $impactoPolicy,
    ) {}

    public function impactoConsolidacoes(Request $request): JsonResponse
    {
        try {
            $data = OcorrenciaRequestValidator::impactoConsolidacoes($request);

            $impacto = $this->impactoPolicy->calcularImpacto(
                $data['usuario_id'],
                $data['data_inicio'],
                $data['data_fim'],
                $data['ocorrencia_id'] ?? null,
                $data['operacao'],
            );

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

    public function store(Request $request, string $planoTrabalhoId): JsonResponse
    {
        try {
            $data = OcorrenciaRequestValidator::store($request);
            $dto = OcorrenciaStoreDTO::fromArray($data, $planoTrabalhoId);
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

    public function update(Request $request, string $planoTrabalhoId, string $ocorrenciaId): JsonResponse
    {
        try {
            $data = OcorrenciaRequestValidator::update($request);
            $dto = OcorrenciaUpdateDTO::fromArray($data, $planoTrabalhoId, $ocorrenciaId);
            $ocorrencia = $this->service->update($dto);

            return response()->json(['success' => true, 'data' => $ocorrencia]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $planoTrabalhoId, string $ocorrenciaId): JsonResponse
    {
        try {
            $this->service->destroy($planoTrabalhoId, $ocorrenciaId);

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
