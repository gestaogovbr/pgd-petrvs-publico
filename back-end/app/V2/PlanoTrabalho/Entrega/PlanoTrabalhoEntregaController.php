<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega;

use App\Http\Controllers\Controller;
use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaRequestValidator;
use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class PlanoTrabalhoEntregaController extends Controller
{
    public function __construct(
        private readonly PlanoTrabalhoEntregaService $service,
    ) {}

    public function store(Request $request, string $planoTrabalhoId): JsonResponse
    {
        try {
            $data = PlanoTrabalhoEntregaRequestValidator::store($request);
            $dto = PlanoTrabalhoEntregaStoreDTO::fromArray($data, $planoTrabalhoId);
            $entrega = $this->service->store($dto);

            return response()->json(['success' => true, 'data' => $entrega], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $planoTrabalhoId, string $entregaId): JsonResponse
    {
        try {
            $data = PlanoTrabalhoEntregaRequestValidator::update($request);
            $dto = PlanoTrabalhoEntregaStoreDTO::fromArray($data, $planoTrabalhoId, $entregaId);
            $entrega = $this->service->update($entregaId, $dto);

            return response()->json(['success' => true, 'data' => $entrega], Response::HTTP_OK);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $planoTrabalhoId, string $entregaId): JsonResponse
    {
        try {
            $this->service->destroy($planoTrabalhoId, $entregaId);

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
