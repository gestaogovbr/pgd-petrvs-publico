<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Exports\RelatorioEntregaExport;
use App\Http\Controllers\Controller;
use App\Support\AuthenticatedUsuario;
use App\V2\RelatorioEntrega\Support\RelatorioEntregaUnidadeDefaultResolver;
use App\V2\RelatorioEntrega\Validators\RelatorioEntregaIndexRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class RelatorioEntregaController extends Controller
{
    public function __construct(
        private readonly RelatorioEntregaService $service,
        private readonly RelatorioEntregaUnidadeDefaultResolver $unidadeDefaultResolver,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $dto = RelatorioEntregaIndexRequestValidator::index($request);
            $this->authorizeRelatorio();

            $result = $this->service->index($dto, $request);

            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => collect($e->errors())->flatten()->first() ?? $e->getMessage()], 422);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function export(Request $request)
    {
        try {
            $dto = RelatorioEntregaIndexRequestValidator::index($request);
            $this->authorizeRelatorio();

            $rows = $this->service->exportRows($dto);

            return Excel::download(
                new RelatorioEntregaExport($rows),
                'relatorio_entregas.xlsx'
            );
        } catch (ValidationException $e) {
            return response()->json(['error' => collect($e->errors())->flatten()->first() ?? $e->getMessage()], 422);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function unidadePadrao(): JsonResponse
    {
        try {
            $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
            $this->authorizeRelatorio();

            $unidadeId = $this->unidadeDefaultResolver->resolve($usuario);

            return response()->json([
                'success' => true,
                'data' => ['unidade_id' => $unidadeId],
            ]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function authorizeRelatorio(): void
    {
        $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
        if ($usuario === null || (
            ! $usuario->hasPermissionTo('MOD_RELATORIO_PE')
            && ! $usuario->hasPermissionTo('MOD_RELATORIO_ENTREGA')
        )) {
            throw new ServerException('RelatorioCapacidade', 'Acesso negado ao relatório de Entregas.');
        }
    }
}
