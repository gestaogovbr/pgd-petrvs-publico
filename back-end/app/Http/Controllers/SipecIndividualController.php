<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SipecIndividualController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario): bool
    {
        return true;
    }

    public function processaServidor(Request $request)
    {
        $retorno = ['success' => true, 'message' => 'Processamento concluído.'];

        try {
            $data = $request->validate(['cpf' => ['required', 'string']]);

            $retorno['resumo'] = $this->service->processaServidor($data['cpf']);
            $this->anexarRelatorioCarga($retorno);

            return response()->json($retorno, Response::HTTP_OK);
        } catch (\Exception $e) {
            report($e);
            $retorno['success'] = false;
            $retorno['message'] = $e->getMessage();
            $retorno['resumo']  = $this->service->getResumo();
            $this->anexarRelatorioCarga($retorno);

            return response()->json($retorno, Response::HTTP_BAD_REQUEST);
        }
    }

    public function processaUnidade(Request $request)
    {
        $retorno = ['success' => true, 'message' => 'Processamento concluído.'];

        try {
            $data = $request->validate(['codUorg' => ['required', 'string']]);

            $retorno['resumo'] = $this->service->processaUnidade($data['codUorg']);
            $this->anexarRelatorioCarga($retorno);

            return response()->json($retorno, Response::HTTP_OK);
        } catch (\Exception $e) {
            report($e);
            $retorno['success'] = false;
            $retorno['message'] = $e->getMessage();
            $retorno['resumo']  = $this->service->getResumo();
            $this->anexarRelatorioCarga($retorno);

            return response()->json($retorno, Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Preview sem persistência — retorna o JSON bruto do SIPEC para a UORG informada.
     * Útil para inspecionar o payload antes de processar.
     */
    public function consultaUnidade(Request $request)
    {
        try {
            $data = $request->validate(['codUorg' => ['required', 'string']]);

            return response()->json(
                $this->service->consultaUnidade($data['codUorg']),
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    private function anexarRelatorioCarga(array &$retorno): void
    {
        $relatorioCarga = $this->service->getRelatorioCarga();
        if (!$relatorioCarga) return;

        $retorno['relatorio_carga']    = $relatorioCarga;
        $retorno['relatorio_carga_id'] = $relatorioCarga['id'] ?? null;
    }
}
