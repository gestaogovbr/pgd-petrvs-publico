<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega;

use App\Http\Controllers\Controller;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaRequestValidator;
use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class EntregaController extends Controller
{
    public function __construct(
        private readonly PlanoTrabalhoEntregaService $service,
    ) {}

    public function store(Request $request, string $planoTrabalhoId): JsonResponse
    {
        try {
            $data = PlanoTrabalhoEntregaRequestValidator::store($request);
            $entrega = $this->service->store($planoTrabalhoId, $data);

            return response()->json(['success' => true, 'data' => $entrega], Response::HTTP_CREATED);
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
