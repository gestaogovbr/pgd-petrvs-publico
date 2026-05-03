<?php

namespace App\Http\Controllers;
use App\Services\Siape\CargaIndividual\CargaIndividualSiapeRelatorioService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Stancl\Tenancy\Facades\GlobalCache;

class SiapeIndividualController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        return true;
    }

    public function processaServidor(Request $request){
        $retorno = [
            'success' => true,
            'message' => 'Processamento concluído.',
            'log' => null,
        ];
        $tenantId = function_exists('tenant') ? (tenant('id') ?? 'central') : 'central';
        $lock = GlobalCache::lock('siape:processaServidor:' . $tenantId, 600);
        if (!$lock->get()) {
            $retorno['success'] = false;
            $retorno['message'] = 'já existe uma requisição ativa nesse tenant neste momento, por favor aguarde e tente novamente em instantes';
            $retorno['log'] = $this->getLogSiape();
            return response()->json($retorno, Response::HTTP_BAD_REQUEST);
        }
        try {
            $data = $request->validate([
                'cpf' => [],
            ]);
            
            $resultado = $this->service->processaServidor($data['cpf']);
            $retorno['log'] = $this->getLogSiape();
            $retorno['resumo'] = $resultado;
            $this->anexarRelatorioCarga($retorno);
            return response()->json(
                $retorno,
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            report($e);
            $retorno['success'] = false;
            $retorno['message'] = $e->getMessage();
            $retorno['log'] = $this->getLogSiape();
            $retorno['resumo'] = $this->service->getResumo();
            $this->anexarRelatorioCarga($retorno);
            return response()->json($retorno, Response::HTTP_BAD_REQUEST);
        } finally {
            $lock->release();
        }
    }

    private function getLogSiape(){
        $tenantId = function_exists('tenant') ? (tenant('id') ?? 'central') : 'central';
        $logPath = storage_path('logs/siape_' . $tenantId . '.log');
      
        if (!file_exists($logPath)) {
            return null;
        }

        $linhas = explode("\n", file_get_contents($logPath));
        return implode("\n", $linhas);
    }

    public function consultaServidor(Request $request){
        try {
            $data = $request->validate([
                'cpf' => [],
            ]);

            return response()->json(
                $this->service->consultaServidor($data['cpf']),
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function processaUnidade(Request $request){
        $retorno = [
            'success' => true,
            'message' => 'Processamento concluído.',
            'log' => null,
        ];
        try {
            $data = $request->validate([
                'unidade' => [],
            ]);

            $this->service->processaUnidade($data['unidade']);
            $retorno['log'] = $this->getLogSiape();
            $retorno['resumo'] = $this->service->getResumo();
            $this->anexarRelatorioCarga($retorno);
            return response()->json(
                $retorno,
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            $retorno['success'] = false;
            $retorno['message'] = $e->getMessage();
            $retorno['log'] = $this->getLogSiape();
            $retorno['resumo'] = $this->service->getResumo();
            $this->anexarRelatorioCarga($retorno);
            return response()->json($retorno, Response::HTTP_BAD_REQUEST);
        }
    }

    public function relatorioProcessamentoUnidade(Request $request)
    {
        $data = $request->validate([
            'unidade' => ['required'],
        ]);

        try {
            $codUnidade = (string) $data['unidade'];

            return response()->json(
                $this->service->relatorioProcessamentoUnidade($codUnidade),
                Response::HTTP_OK
            );
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function relatorioCargaIndividual(Request $request, CargaIndividualSiapeRelatorioService $relatorioService)
    {
        try {
            $usuario = $this->getUsuario($request);
            if (!$usuario?->hasPermissionTo('MOD_SIAPE_RELATORIO_CARGA')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuário não tem permissão para acessar este relatório.',
                ], Response::HTTP_FORBIDDEN);
            }

            $data = $request->validate([
                'id' => ['nullable', 'string'],
                'tipo' => ['nullable', 'in:servidor,unidade'],
                'chave' => ['nullable', 'string'],
                'limit' => ['nullable', 'integer', 'min:1', 'max:50'],
            ]);

            if (!empty($data['id'])) {
                $relatorio = $relatorioService->buscarPorId($data['id']);

                if (!$relatorio) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Relatório não encontrado.',
                    ], Response::HTTP_NOT_FOUND);
                }

                return response()->json([
                    'success' => true,
                    'relatorio' => $relatorioService->toArray($relatorio),
                ], Response::HTTP_OK);
            }

            $relatorios = $relatorioService->listarRecentes(
                $data['tipo'] ?? null,
                $data['chave'] ?? null,
                (int) ($data['limit'] ?? 20),
            );

            return response()->json([
                'success' => true,
                'relatorios' => $relatorios->map(fn($relatorio) => $relatorioService->toArray($relatorio))->values(),
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            report($e);

            return response()->json([
                'success' => false,
                'message' => 'Não foi possível carregar o relatório da carga individual.',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param array<string, mixed> $retorno
     */
    private function anexarRelatorioCarga(array &$retorno): void
    {
        $relatorioCarga = $this->service->getRelatorioCarga();

        if (!$relatorioCarga) {
            return;
        }

        $retorno['relatorio_carga'] = $relatorioCarga;
        $retorno['relatorio_carga_id'] = $relatorioCarga['id'] ?? null;
    }
}
