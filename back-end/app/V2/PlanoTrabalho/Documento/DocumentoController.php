<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento;

use App\Http\Controllers\Controller;
use App\Exceptions\Contracts\IBaseException;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class DocumentoController extends Controller
{
    public function __construct(
        private readonly PlanoTrabalhoDocumentoService $service,
    ) {}

    public function show(string $planoTrabalhoId): JsonResponse
    {
        try {
            $data = $this->service->show($planoTrabalhoId);

            return response()->json(['success' => true, 'data' => $data]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request, string $planoTrabalhoId): JsonResponse
    {
        try {
            $data = PlanoTrabalhoDocumentoRequestValidator::store($request);

            $documento = $this->service->store($planoTrabalhoId, $data['justificativa'] ?? null);

            return response()->json(['success' => true, 'data' => $documento], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function assinar(string $planoTrabalhoId): JsonResponse
    {
        try {
            $assinatura = $this->service->assinar($planoTrabalhoId);

            return response()->json(['success' => true, 'data' => $assinatura], Response::HTTP_CREATED);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function cancelarAssinatura(string $planoTrabalhoId): JsonResponse
    {
        try {
            $this->service->cancelarAssinatura($planoTrabalhoId);

            return response()->json(['success' => true]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
