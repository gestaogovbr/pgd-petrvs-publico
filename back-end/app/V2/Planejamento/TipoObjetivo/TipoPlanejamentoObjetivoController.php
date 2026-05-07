<?php

declare(strict_types=1);

namespace App\V2\Planejamento\TipoObjetivo;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\Planejamento\TipoObjetivo\DTOs\TipoPlanejamentoObjetivoStoreDTO;
use App\V2\Planejamento\TipoObjetivo\DTOs\TipoPlanejamentoObjetivoUpdateDTO;
use App\V2\Planejamento\TipoObjetivo\Validators\TipoPlanejamentoObjetivoRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class TipoPlanejamentoObjetivoController extends Controller
{
    public function __construct(
        private readonly TipoPlanejamentoObjetivoService $service,
    ) {}

    public function index(): JsonResponse
    {
        try {
            return response()->json(['success' => true, 'data' => $this->service->index()]);
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $data = TipoPlanejamentoObjetivoRequestValidator::store($request);
            $dto = TipoPlanejamentoObjetivoStoreDTO::fromArray($data);
            $tipoObjetivo = $this->service->store($dto);

            return response()->json(['success' => true, 'data' => $tipoObjetivo], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $data = TipoPlanejamentoObjetivoRequestValidator::update($request);
            $dto = TipoPlanejamentoObjetivoUpdateDTO::fromArray($data, $id);
            $tipoObjetivo = $this->service->update($dto);

            return response()->json(['success' => true, 'data' => $tipoObjetivo]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->service->destroy($id);

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
