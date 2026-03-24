<?php

namespace App\V2\PlanoTrabalho\Entrega;

use App\Http\Controllers\Controller;
use App\V2\PlanoTrabalho\Entrega\PlanoTrabalhoEntregaValidacoes;
use App\V2\PlanoTrabalho\Entrega\PlanoTrabalhoEntregaService;
use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class EntregaController extends Controller
{
    protected PlanoTrabalhoEntregaService $service;

    public function __construct(PlanoTrabalhoEntregaService $service)
    {
        $this->service = $service;
    }

    public function store(Request $request, string $planoTrabalhoId): JsonResponse
    {
        try {
            $data = PlanoTrabalhoEntregaValidacoes::store($request);
            $results = [];
            foreach ($data['entregas'] as $entrega) {
                $entrega['plano_trabalho_id'] = $planoTrabalhoId;
                $entity = $this->service->store($entrega, null);
                $results[] = $entity;
            }
            return response()->json(['success' => true, 'rows' => $results], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $planoTrabalhoId, string $entregaId): JsonResponse
    {
        try {
            $data = PlanoTrabalhoEntregaValidacoes::update($request);
            $data['id'] = $entregaId;
            $data['plano_trabalho_id'] = $planoTrabalhoId;
            $entity = $this->service->update($data, null);
            return response()->json(['success' => true, 'rows' => [$entity]]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Request $request, string $planoTrabalhoId, string $entregaId): JsonResponse
    {
        try {
            return response()->json(['success' => $this->service->destroy($entregaId)]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
