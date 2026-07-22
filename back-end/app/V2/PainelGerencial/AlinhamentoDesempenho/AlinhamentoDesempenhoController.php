<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\AlinhamentoDesempenho;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PainelGerencial\AlinhamentoDesempenho\DataProviders\AlinhamentoInstitucional;
use App\V2\PainelGerencial\AlinhamentoDesempenho\DataProviders\AvaliacoesPlanoEntrega;
use App\V2\PainelGerencial\AlinhamentoDesempenho\DataProviders\AvaliacoesPlanoTrabalho;
use App\V2\PainelGerencial\PainelGerencialService;
use App\V2\PainelGerencial\Validators\PainelRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AlinhamentoDesempenhoController extends Controller
{
    public function __construct(
        private readonly PainelGerencialService $painelService,
        private readonly AlinhamentoInstitucional $alinhamentoInstitucional,
        private readonly AvaliacoesPlanoEntrega $avaliacoesPlanoEntrega,
        private readonly AvaliacoesPlanoTrabalho $avaliacoesPlanoTrabalho,
    ) {}

    public function alinhamentoInstitucional(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));
            $result = $this->alinhamentoInstitucional->getData($filtros);

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

    public function avaliacoesPlanoEntrega(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));
            $result = $this->avaliacoesPlanoEntrega->getData($filtros);

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

    public function avaliacoesPlanoTrabalho(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));
            $result = $this->avaliacoesPlanoTrabalho->getData($filtros);

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
}
