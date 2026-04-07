<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PlanoTrabalho\Consolidacao\Validators\PlanoTrabalhoConsolidacaoRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class PlanoTrabalhoConsolidacaoController extends Controller
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoService $service,
    ) {}

    public function index(string $planoTrabalhoId): JsonResponse
    {
        try {
            $consolidacoes = $this->service->index($planoTrabalhoId);

            return response()->json(['success' => true, 'data' => $consolidacoes]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function notasAvaliacao(string $planoTrabalhoId): JsonResponse
    {
        try {
            $notas = $this->service->notasAvaliacao($planoTrabalhoId);

            return response()->json(['success' => true, 'data' => $notas]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function concluir(string $planoTrabalhoId, string $consolidacaoId): JsonResponse
    {
        try {
            $consolidacao = $this->service->concluir($planoTrabalhoId, $consolidacaoId);

            return response()->json(['success' => true, 'data' => $consolidacao]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function reabrir(Request $request, string $planoTrabalhoId, string $consolidacaoId): JsonResponse
    {
        try {
            $data = PlanoTrabalhoConsolidacaoRequestValidator::reabrir($request);

            $consolidacao = $this->service->reabrir($planoTrabalhoId, $consolidacaoId, $data['justificativa']);

            return response()->json(['success' => true, 'data' => $consolidacao]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
