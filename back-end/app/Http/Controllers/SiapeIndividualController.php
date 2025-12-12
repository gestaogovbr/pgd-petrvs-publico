<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

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
        $lock = Cache::lock('siape:processaServidor:' . $tenantId, 600);
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
            
            $this->service->processaServidor($data['cpf']);
            $retorno['log'] = $this->getLogSiape();
            return response()->json(
                $retorno,
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            report($e);
            $retorno['success'] = false;
            $retorno['message'] = $e->getMessage();
            $retorno['log'] = $this->getLogSiape();
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
            return response()->json(
                $retorno,
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            $retorno['success'] = false;
            $retorno['message'] = $e->getMessage();
            $retorno['log'] = $this->getLogSiape();
            return response()->json($retorno, Response::HTTP_BAD_REQUEST);
        }
    }
}
