<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Log;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PlanoTrabalho\Log\DTOs\PlanoTrabalhoLogIndexDTO;
use App\V2\PlanoTrabalho\Log\Validators\PlanoTrabalhoLogRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class PlanoTrabalhoLogController extends Controller
{
    public function __construct(
        private readonly PlanoTrabalhoLogService $service,
    ) {}

    public function index(Request $request, string $planoTrabalhoId): JsonResponse
    {
        try {
            $data = PlanoTrabalhoLogRequestValidator::index($request);
            $dto = PlanoTrabalhoLogIndexDTO::fromRequest($planoTrabalhoId, $data);
            $result = $this->service->index($dto);

            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function modelos(string $planoTrabalhoId): JsonResponse
    {
        try {
            $modelos = $this->service->modelos();

            return response()->json(['success' => true, 'data' => $modelos]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
