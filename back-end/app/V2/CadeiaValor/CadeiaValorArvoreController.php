<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class CadeiaValorArvoreController extends Controller
{
    public function __construct(
        private readonly CadeiaValorArvoreService $arvoreService,
        private readonly CadeiaValorResumoService $resumoService,
        private readonly CadeiaValorEntregasService $entregasService,
    ) {}

    /**
     * GET /api/v2/cadeia-valor/{cadeiaValorId}/arvore/{processoId}
     */
    public function arvore(string $cadeiaValorId, string $processoId): JsonResponse
    {
        try {
            $data = $this->arvoreService->getArvore($cadeiaValorId, $processoId);

            return response()->json(['success' => true, 'data' => $data]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * GET /api/v2/cadeia-valor/{cadeiaValorId}/processo/{processoId}/resumo
     *
     * Query params: unidade_id
     */
    public function resumo(string $cadeiaValorId, string $processoId, Request $request): JsonResponse
    {
        try {
            $unidadeId = $request->query('unidade_id');
            $data = $this->resumoService->getResumo($cadeiaValorId, $processoId, $unidadeId);

            return response()->json(['success' => true, 'data' => $data]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * GET /api/v2/cadeia-valor/{cadeiaValorId}/processo/{processoId}/entregas
     *
     * Query params: unidade_id, plano_entrega_entrega_id, data_inicio, data_fim
     */
    public function entregas(string $cadeiaValorId, string $processoId, Request $request): JsonResponse
    {
        try {
            $filtros = [
                'unidade_id' => $request->query('unidade_id'),
                'plano_entrega_entrega_id' => $request->query('plano_entrega_entrega_id'),
                'data_inicio' => $request->query('data_inicio'),
                'data_fim' => $request->query('data_fim'),
            ];

            $data = $this->entregasService->getEntregas($cadeiaValorId, $processoId, $filtros);

            return response()->json(['success' => true, 'data' => $data]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
