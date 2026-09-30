<?php

namespace App\Http\Controllers;

use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;
use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Exports\RelatorioAgenteExport;
use App\Http\Controllers\ControllerBase;
use App\Services\RelatorioAgenteAuthorization;
use App\Services\RelatorioAgenteService;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

class RelatorioAgenteController extends ControllerBase
{
    protected function checkPermissions($action, $request, $service, $unidade, $usuario)
    {
        return true;
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws ServerException
     */
    public function query(Request $request)
    {
        $usuario = $this->getUsuario($request);
        $authorization = app(RelatorioAgenteAuthorization::class);
        $authorization->assertPodeConsultar($usuario);

        try {
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

            $queryDto = $authorization->aplicarFiltroParticipante(
                RelatorioAgenteQueryDTO::fromValidatedRequest($validated),
                $usuario,
            );

            $result = app(RelatorioAgenteService::class)->query($queryDto->toQueryArray());

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
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => "Ocorreu um erro inesperado."], 500);
        }
    }
}
