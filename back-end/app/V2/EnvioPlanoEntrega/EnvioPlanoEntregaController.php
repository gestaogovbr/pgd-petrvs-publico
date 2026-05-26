<?php

declare(strict_types=1);

namespace App\V2\EnvioPlanoEntrega;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Http\Controllers\Controller;
use App\Support\AuthenticatedUsuario;
use App\V2\EnvioPlanoEntrega\Validators\EnvioPlanoEntregaIndexRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class EnvioPlanoEntregaController extends Controller
{
    public function __construct(
        private readonly EnvioPlanoEntregaService $service
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $data = EnvioPlanoEntregaIndexRequestValidator::index($request);

            $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
            if ($usuario === null || ! $usuario->hasPermissionTo('MOD_ENVIO_PE')) {
                throw new ServerException('RelatorioEnvioPlanoEntrega');
            }

            $result = $this->service->index($data, $request);

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
}
