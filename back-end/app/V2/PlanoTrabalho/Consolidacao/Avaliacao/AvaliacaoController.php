<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs\AvaliacaoStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AvaliacaoController extends Controller
{
    public function __construct(
        private readonly AvaliacaoService $service,
    ) {}

    public function store(Request $request, string $planoTrabalhoId, string $consolidacaoId): JsonResponse
    {
        try {
            $data = AvaliacaoRequestValidator::store($request);
            $dto = AvaliacaoStoreDTO::fromArray($data, $planoTrabalhoId, $consolidacaoId, Auth::id());

            $avaliacao = $this->service->store($dto);

            return response()->json(['success' => true, 'data' => $avaliacao], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
