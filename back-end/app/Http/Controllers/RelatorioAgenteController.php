<?php

namespace App\Http\Controllers;

use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;
use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Exports\RelatorioAgenteExport;
use App\Http\Controllers\ControllerBase;
use App\Models\Usuario;
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

        if (!$usuario->hasPermissionTo('MOD_RELATORIO_USUARIO')) {
            throw new ServerException("RelatorioAgente", "Acesso negado ao relatório de Agentes.");
        }

        try {
            $validated = $request->validate([
                'page' => ['nullable'],
                'limit' => ['nullable'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'where' => ['array'],
            ]);

            $queryDto = $this->applyFiltroParticipante(
                RelatorioAgenteQueryDTO::fromValidatedRequest($validated),
                $usuario,
            );

            $service = new RelatorioAgenteService();
            $result = $service->query($queryDto->toQueryArray());

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

    /**
     * Perfil participante vê apenas seus próprios dados.
     */
    private function applyFiltroParticipante(RelatorioAgenteQueryDTO $dto, Usuario $usuario): RelatorioAgenteQueryDTO
    {
        return (new RelatorioAgenteService())->aplicarFiltroParticipanteWhere($dto, $usuario);
    }
}
