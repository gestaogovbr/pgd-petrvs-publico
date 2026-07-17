<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PainelGerencial\Adesao\DataProviders\EvolucaoAdesaoParticipantes;
use App\V2\PainelGerencial\Adesao\DataProviders\EvolucaoAdesaoUnidades;
use App\V2\PainelGerencial\Adesao\DataProviders\ParticipantesPGD;
use App\V2\PainelGerencial\Adesao\DataProviders\UnidadesExecutoras;
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
        private readonly UnidadesExecutoras $unidadesExecutoras,
        private readonly EvolucaoAdesaoUnidades $evolucaoUnidades,
        private readonly ParticipantesPGD $participantesPGD,
        private readonly EvolucaoAdesaoParticipantes $evolucaoParticipantes,
    ) {}

    public function unidadesExecutoras(Request $request): JsonResponse
    {
        try {
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
            $periodos = \Illuminate\Support\Facades\DB::table('serie_unidades_executoras')
                ->distinct()
                ->orderBy('periodo')
                ->pluck('periodo')
                ->toArray();

            return response()->json(['success' => true, 'data' => $periodos]);
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
