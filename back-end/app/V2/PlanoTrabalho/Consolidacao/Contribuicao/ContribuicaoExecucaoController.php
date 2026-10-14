<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Contribuicao;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\DTOs\ContribuicaoExecucaoStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\Validators\ContribuicaoExecucaoRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ContribuicaoExecucaoController extends Controller
{
    public function __construct(
        private readonly ContribuicaoExecucaoService $service,
    ) {}

    public function store(Request $request, string $planoTrabalhoId, string $consolidacaoId): JsonResponse
    {
        try {
            $data = ContribuicaoExecucaoRequestValidator::store($request);
            $dto = ContribuicaoExecucaoStoreDTO::fromArray($data, $planoTrabalhoId, $consolidacaoId);

            $contribuicao = $this->service->store($dto);

            return response()->json(['success' => true, 'data' => $contribuicao], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $planoTrabalhoId, string $consolidacaoId, string $contribuicaoId): JsonResponse
    {
        try {
            $data = ContribuicaoExecucaoRequestValidator::update($request);
            $dto = ContribuicaoExecucaoStoreDTO::fromArray($data, $planoTrabalhoId, $consolidacaoId, $contribuicaoId);

            $contribuicao = $this->service->update($dto);

            return response()->json(['success' => true, 'data' => $contribuicao]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $planoTrabalhoId, string $consolidacaoId, string $contribuicaoId): JsonResponse
    {
        try {
            $this->service->destroy($planoTrabalhoId, $consolidacaoId, $contribuicaoId);

            return response()->json(['success' => true]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
