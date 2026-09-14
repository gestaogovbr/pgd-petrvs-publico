<?php

declare(strict_types=1);

namespace App\V2\Relatorio\LacunaPlanoTrabalho;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Http\Controllers\Controller;
use App\Support\AuthenticatedUsuario;
use App\V2\Relatorio\LacunaPlanoTrabalho\Validators\LacunaPlanoTrabalhoIndexRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class LacunaPlanoTrabalhoController extends Controller
{
    public function __construct(
        private readonly LacunaPlanoTrabalhoService $service,
    ) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $this->assertPermission();
            $data = LacunaPlanoTrabalhoIndexRequestValidator::index($request);
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

    public function export(Request $request): BinaryFileResponse|JsonResponse
    {
        try {
            $this->assertPermission();
            $data = LacunaPlanoTrabalhoIndexRequestValidator::export($request);

            return $this->service->export($data);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function assertPermission(): void
    {
        $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
        if ($usuario === null || ! $usuario->hasPermissionTo('MOD_RELATORIO_PT')) {
            throw new ServerException(
                'RelatorioLacunaPlanoTrabalho',
                'Acesso negado ao relatório de Lacunas de Planos de Trabalho.'
            );
        }
    }
}
