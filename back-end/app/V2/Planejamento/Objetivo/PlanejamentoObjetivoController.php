<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class PlanejamentoObjetivoController extends Controller
{
    public function __construct(
        private readonly PlanejamentoObjetivoService $service,
    ) {}

    public function esforcoTotal(string $id): JsonResponse
    {
        try {
            $data = $this->service->getEsforcoTotal($id);

            return response()->json(['success' => true, 'data' => $data]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function entregas(string $id): JsonResponse
    {
        try {
            $data = $this->service->getEntregasComEsforco($id);

            return response()->json(['success' => true, 'data' => $data]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
