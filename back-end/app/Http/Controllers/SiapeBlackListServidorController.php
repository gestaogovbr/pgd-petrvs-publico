<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class SiapeBlackListServidorController extends ControllerBase
{
    protected function checkPermissions($action, $request, $service, $unidade, $usuario)
    {
        return true;
    }

    public function remover(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'cpf' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'CPF é obrigatório',
                    'errors' => $validator->errors()
                ], Response::HTTP_BAD_REQUEST);
            }

            $cpf = preg_replace('/[^0-9]/', '', $request->input('cpf'));
            
            if (strlen($cpf) !== 11) {
                return response()->json([
                    'success' => false,
                    'message' => 'CPF deve ter 11 dígitos'
                ], Response::HTTP_BAD_REQUEST);
            }

            $resultado = $this->service->remover($cpf);
            
            if (!$resultado['success']) {
                return response()->json([
                    'success' => false,
                    'message' => $resultado['message']
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'success' => true,
                'message' => $resultado['message'],
                'count' => $resultado['count']
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro interno do servidor: ' . $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}