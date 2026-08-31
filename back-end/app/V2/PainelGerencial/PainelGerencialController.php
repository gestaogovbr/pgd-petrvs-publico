<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class PainelGerencialController extends Controller
{
    public function __construct(
        private readonly PainelGerencialService $service,
    ) {}

    public function unidadeInicial(): JsonResponse
    {
        try {
            $this->service->validarAcesso();
            $result = $this->service->getUnidadeInicial();

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
}
