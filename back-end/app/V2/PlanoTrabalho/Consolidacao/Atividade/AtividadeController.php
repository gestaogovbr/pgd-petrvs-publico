<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
            $data = AtividadeRequestValidator::validarStore($request->all());
            $atividade = $this->service->store($planoTrabalhoId, $consolidacaoId, $data);

            return response()->json(['success' => true, 'data' => $atividade], Response::HTTP_CREATED);
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
            $data = AtividadeRequestValidator::validarUpdate($request->all());
            $atividade = $this->service->update($planoTrabalhoId, $consolidacaoId, $atividadeId, $data);

            return response()->json(['success' => true, 'data' => $atividade]);
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
            $this->service->destroy($planoTrabalhoId, $consolidacaoId, $atividadeId);

            return response()->json(['success' => true]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
