<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PainelGerencial\Adesao\DataProviders\EvolucaoAdesaoParticipantesDataProvider;
use App\V2\PainelGerencial\Adesao\DataProviders\EvolucaoAdesaoUnidadesDataProvider;
use App\V2\PainelGerencial\Adesao\DataProviders\ParticipantesPGDDataProvider;
use App\V2\PainelGerencial\Adesao\DataProviders\UnidadesExecutorasDataProvider;
use App\V2\PainelGerencial\PainelGerencialService;
use App\V2\PainelGerencial\Validators\PainelRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AdesaoController extends Controller
{
    public function __construct(
        private readonly PainelGerencialService $painelService,
        private readonly UnidadesExecutorasDataProvider $unidadesExecutoras,
        private readonly EvolucaoAdesaoUnidadesDataProvider $evolucaoUnidades,
        private readonly ParticipantesPGDDataProvider $participantesPGD,
        private readonly EvolucaoAdesaoParticipantesDataProvider $evolucaoParticipantes,
    ) {}

    public function unidadesExecutoras(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));
            $result = $this->unidadesExecutoras->getData($filtros);

            return response()->json(['success' => true, 'data' => $result->toArray()]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function evolucaoUnidades(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));
            $result = $this->evolucaoUnidades->getData($filtros);

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

    public function participantesPGD(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));
            $result = $this->participantesPGD->getData($filtros);

            return response()->json(['success' => true, 'data' => $result->toArray()]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function evolucaoParticipantes(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));
            $result = $this->evolucaoParticipantes->getData($filtros);

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

    public function periodosDisponiveis(): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $periodos = $this->evolucaoUnidades->getPeriodosDisponiveis();

            return response()->json(['success' => true, 'data' => $periodos]);
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
