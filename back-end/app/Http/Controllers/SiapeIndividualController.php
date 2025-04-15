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
        $data = $request->validate([
            'cpf' => [],
        ]);

        return response()->json(
            $this->service->processaServidor($data['cpf']),
            Response::HTTP_OK
        );
    }

    public function consultaServidor(Request $request){
        $data = $request->validate([
            'cpf' => [],
        ]);

        $cpf = preg_replace('/[^0-9]/', '', $data['cpf']);

        return response()->json(
            $this->service->processaServidor($cpf),
            Response::HTTP_OK
        );
    }

    public function processaUnidade(Request $request){
        $request->validate([
            'codigo_unidade' => [],
        ]);
    }
}
