<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao;

use App\Http\Controllers\Controller;
use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ConsolidacaoController extends Controller
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

    public function concluir(string $planoTrabalhoId, string $consolidacaoId): JsonResponse
    {
        try {
            $consolidacao = $this->service->concluir($planoTrabalhoId, $consolidacaoId, Auth::id());

            return response()->json(['success' => true, 'data' => $consolidacao]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
