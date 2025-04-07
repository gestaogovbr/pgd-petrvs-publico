<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UsuarioController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}


    public function processaServidor(Request $request){
        $data = $request->validate([
            'cpf' => [],
          ]);

         return response()->json($this->service->processaServidor($data['cpf']), Response::HTTP_OK);

    }

    public function processaUnidade(Request $request){
        $data = $request->validate([
            'codigo_unidade' => [],
          ]);

    }
}
