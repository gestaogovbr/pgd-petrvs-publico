<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Conformidade;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PainelGerencial\Conformidade\DataProviders\AvaliacaoPE;
use App\V2\PainelGerencial\Conformidade\DataProviders\AvaliacaoPT;
use App\V2\PainelGerencial\Conformidade\DataProviders\RegistroExecucaoPE;
use App\V2\PainelGerencial\Conformidade\DataProviders\RegistroExecucaoPT;
use App\V2\PainelGerencial\Conformidade\DataProviders\UnidadesExecutorasPE;
use App\V2\PainelGerencial\PainelGerencialService;
use App\V2\PainelGerencial\Validators\PainelRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ConformidadeController extends Controller
{
    public function __construct(
        private readonly PainelGerencialService $painelService,
        private readonly RegistroExecucaoPE $registroExecucaoPE,
        private readonly AvaliacaoPE $avaliacaoPE,
        private readonly RegistroExecucaoPT $registroExecucaoPT,
        private readonly AvaliacaoPT $avaliacaoPT,
        private readonly UnidadesExecutorasPE $unidadesExecutorasPE,
    ) {}

    public function registroExecucaoPE(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));

            return response()->json(['success' => true, 'data' => $this->registroExecucaoPE->getData($filtros)->toArray()]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function avaliacaoPE(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));

            return response()->json(['success' => true, 'data' => $this->avaliacaoPE->getData($filtros)->toArray()]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function registroExecucaoPT(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));

            return response()->json(['success' => true, 'data' => $this->registroExecucaoPT->getData($filtros)->toArray()]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function avaliacaoPT(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));

            return response()->json(['success' => true, 'data' => $this->avaliacaoPT->getData($filtros)->toArray()]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function unidadesExecutorasPE(Request $request): JsonResponse
    {
        try {
            $this->painelService->validarAcesso();
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));

            return response()->json(['success' => true, 'data' => $this->unidadesExecutorasPE->getData($filtros)->toArray()]);
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
