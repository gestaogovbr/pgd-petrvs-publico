<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeDestroyDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeUpdateDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AtividadeController extends Controller
{
    public function __construct(
        private readonly AtividadeService $service,
    ) {}

    public function store(Request $request, string $planoTrabalhoId, string $consolidacaoId): JsonResponse
    {
        try {
            $data = AtividadeRequestValidator::store($request);
            $dto = AtividadeStoreDTO::fromArray($data, $planoTrabalhoId, $consolidacaoId, Auth::id());

            $atividade = $this->service->store($dto);

            return response()->json(['success' => true, 'data' => $atividade], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $planoTrabalhoId, string $consolidacaoId, string $atividadeId): JsonResponse
    {
        try {
            $data = AtividadeRequestValidator::update($request);
            $dto = AtividadeUpdateDTO::fromArray($data, $planoTrabalhoId, $consolidacaoId, $atividadeId, Auth::id());

            $atividade = $this->service->update($dto);

            return response()->json(['success' => true, 'data' => $atividade]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $planoTrabalhoId, string $consolidacaoId, string $atividadeId): JsonResponse
    {
        try {
            $this->service->destroy(new AtividadeDestroyDTO($planoTrabalhoId, $consolidacaoId, $atividadeId, Auth::id()));

            return response()->json(['success' => true]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
