<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
            $retorno['success'] = false;
            $retorno['message'] = $e->getMessage();
            $retorno['log'] = $this->getLogSiape();
            return response()->json($retorno, Response::HTTP_BAD_REQUEST);
        }
    }

    private function getLogSiape(array &$retorno){
        $logPath = storage_path('logs/siape.log');
        if (File::exists($logPath)) {
            $linhas = explode("\n", File::get($logPath));
            $ultimasLinhas = array_slice($linhas, -2000); 
            $retorno['log'] = implode("\n", $ultimasLinhas);
        }
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
        $request->validate([
            'codigo_unidade' => [],
        ]);
    }
}
