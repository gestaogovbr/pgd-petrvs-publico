<?php

namespace App\Http\Controllers;

use App\Enums\PerfilEnum;
use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Exports\RelatorioAgenteExport;
use App\Http\Controllers\ControllerBase;
use App\Services\RelatorioAgenteService;
use App\Support\AuthenticatedUsuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
            $data = $request->validate([
                'page' => ['nullable'],
                'limit' => ['nullable'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'where' => ['array'],
            ]);

            $data = $this->applyFiltroParticipante($data, $usuario);

            $service = new RelatorioAgenteService();
            $result = $service->query($data);

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
    private function applyFiltroParticipante(array $data, $usuario): array
    {
        $nivelPerfil = (int) ($usuario->perfil->nivel ?? PerfilEnum::PARTICIPANTE->value);

        if ($nivelPerfil >= PerfilEnum::PARTICIPANTE->value) {
            $data['where'] = array_filter($data['where'] ?? [], function ($condition) {
                return !is_array($condition) || !in_array($condition[0], ['unidade_id', 'incluir_unidades_subordinadas']);
            });
            $data['where'][] = ['usuario_id', '==', $usuario->id];
        }

        return $data;
    }
}
