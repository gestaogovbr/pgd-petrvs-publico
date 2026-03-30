<?php

namespace App\V2\Unidade;

use App\Http\Controllers\Controller;
use App\V2\Unidade\DTOs\UnidadeBuscaDTO;
use App\V2\Unidade\Validators\UnidadeRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class UnidadeController extends Controller
{
    protected UnidadeService $service;

    public function __construct(UnidadeService $service)
    {
        $this->service = $service;
    }

    public function buscarPorNomeOuCodigo(Request $request): JsonResponse
    {
        try {
            $data = UnidadeRequestValidator::buscarPorNomeOuCodigo($request);
            $dto = UnidadeBuscaDTO::fromArray($data);
            $result = $this->service->buscarPorNomeOuCodigo($dto, Auth::id());
            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
