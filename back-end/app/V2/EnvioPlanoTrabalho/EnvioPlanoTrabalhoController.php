<?php

declare(strict_types=1);

namespace App\V2\EnvioPlanoTrabalho;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Http\Controllers\Controller;
use App\Support\AuthenticatedUsuario;
use App\V2\EnvioPlanoTrabalho\Validators\EnvioPlanoTrabalhoIndexRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class EnvioPlanoTrabalhoController extends Controller
{
    public function __construct(
        private readonly EnvioPlanoTrabalhoService $service
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $data = EnvioPlanoTrabalhoIndexRequestValidator::index($request);

            $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
            if ($usuario === null || ! $usuario->hasPermissionTo('MOD_ENVIO_PT')) {
                throw new ServerException('RelatorioEnvioPlanoTrabalho');
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
