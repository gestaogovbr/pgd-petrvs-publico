<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;
use App\Exceptions\Contracts\IBaseException;
use App\Exports\RelatorioAgenteExport;
use App\Services\RelatorioAgenteAuthorization;
use App\Services\RelatorioAgenteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class RelatorioAgenteController extends Controller
{
    public function __construct(
        private readonly RelatorioAgenteService $service,
        private readonly RelatorioAgenteAuthorization $authorization,
    ) {
    }

    public function query(Request $request): JsonResponse|BinaryFileResponse
    {
        try {
            $usuario = $this->authorization->usuarioAutorizado();

            $validated = $request->validate([
                'page' => ['nullable'],
                'limit' => ['nullable'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'filters' => ['array'],
                'filters.unidade_id' => ['nullable', 'string'],
                'filters.incluir_unidades_subordinadas' => ['nullable', 'boolean'],
                'filters.usuario_id' => ['nullable', 'string'],
                'filters.nome' => ['nullable', 'string'],
                'filters.unidadeHierarquia' => ['nullable', 'string'],
                'filters.matricula' => ['nullable', 'string'],
                'filters.situacao' => ['nullable', 'string'],
                'filters.participantePGD' => ['nullable', 'string'],
                'filters.programaNome' => ['nullable', 'string'],
                'filters.modalidade_pgd' => ['nullable', 'string'],
                'filters.modalidadeSouGov' => ['nullable', 'string'],
                'filters.comparacaoSouGovPetrvs' => ['nullable', 'string'],
                'filters.tipo_pedagio' => ['nullable', 'string'],
                'filters.data_inicial_pedagio' => ['nullable', 'date'],
                'filters.data_final_pedagio' => ['nullable', 'date'],
                'filters.dispensa_plano_trabalho' => ['nullable', 'string'],
                'filters.data_inicio_dispensa_pt' => ['nullable', 'date'],
                'filters.data_fim_dispensa_pt' => ['nullable', 'date'],
                'filters.atribuicao' => ['nullable', 'string'],
                'filters.plano_entrega_entrega_id' => ['nullable', 'string'],
                'filters.somente_vigentes' => ['nullable', 'boolean'],
            ]);

            $queryDto = $this->authorization->aplicarFiltroParticipante(
                RelatorioAgenteQueryDTO::fromValidatedRequest($validated),
                $usuario,
            );

            $result = $this->service->query($queryDto->toQueryArray());

            if ($request->is('*/xls')) {
                return Excel::download(
                    new RelatorioAgenteExport($result['rows']),
                    'relatorio-agentes.xlsx'
                );
            }

            return response()->json([
                'success' => true,
                'count' => $result['count'],
                'rows' => $result['rows'],
                'extra' => [],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => collect($e->errors())->flatten()->first() ?? $e->getMessage(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
