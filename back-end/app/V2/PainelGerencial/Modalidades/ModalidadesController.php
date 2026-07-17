<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Modalidades;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PainelGerencial\Modalidades\DataProviders\ModalidadesPorUnidade;
use App\V2\PainelGerencial\Modalidades\DataProviders\TeletrabalhoExterior;
use App\V2\PainelGerencial\PainelGerencialService;
use App\V2\PainelGerencial\Validators\PainelRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ModalidadesController extends Controller
{
    public function __construct(
        private readonly PainelGerencialService $painelService,
        private readonly TeletrabalhoExterior $teletrabalhoExterior,
        private readonly ModalidadesPorUnidade $modalidadesPorUnidade,
    ) {}

    public function teletrabalhoSubstituicao(Request $request): JsonResponse
    {
        try {
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));
            $result = $this->teletrabalhoExterior->getDataSubstituicao($filtros);

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

    public function teletrabalhoDiscricionario(Request $request): JsonResponse
    {
        try {
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));
            $result = $this->teletrabalhoExterior->getDataDiscricionario($filtros);

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

    public function modalidadesPorUnidade(Request $request): JsonResponse
    {
        try {
            $filtros = $this->painelService->buildFiltros(PainelRequestValidator::filtros($request));
            $result = $this->modalidadesPorUnidade->getData($filtros);

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
