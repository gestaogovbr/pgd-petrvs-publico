<?php

declare(strict_types=1);

namespace App\V2\Indicadores;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\Indicadores\DTOs\IndicadoresHorasFilterDTO;
use App\V2\Indicadores\Validators\IndicadoresHorasRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class IndicadoresHorasController extends Controller
{
    public function __construct(
        private readonly IndicadoresHorasService $service,
    ) {}

    public function horas(Request $request): JsonResponse
    {
        try {
            $data = IndicadoresHorasRequestValidator::horas($request);
            $filtro = IndicadoresHorasFilterDTO::fromArray($data);
            $result = $this->service->horas($filtro);

            return response()->json([
                'success' => true,
                'count' => count($result),
                'rows' => $result,
            ]);
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
