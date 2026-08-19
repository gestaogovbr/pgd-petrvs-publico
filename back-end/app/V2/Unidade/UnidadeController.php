<?php

declare(strict_types=1);

namespace App\V2\Unidade;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\Unidade\DTOs\UnidadeIndexDTO;
use App\V2\Unidade\Validators\UnidadeRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class UnidadeController extends Controller
{
    public function __construct(
        private readonly UnidadeService $service,
    ) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $data = UnidadeRequestValidator::index($request);
            $dto = UnidadeIndexDTO::fromRequest($data);
            $result = $this->service->index($dto);

            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function isGestorHierarquia(Request $request, string $unidadeId): JsonResponse
    {
        $isGestor = $this->service->isGestorHierarquia($unidadeId);

        return response()->json(['data' => $isGestor]);
    }
}
