<?php

namespace App\Http\Controllers;


use App\Models\Produto;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use App\Services\Validador\IValidador;
use Illuminate\Validation\ValidationException;
use Throwable;

class ProdutoController extends ControllerBase
{

    public function __construct(private IValidador $validator)
    {
        parent::__construct();
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario)
    {
       
    }

    public function store(Request $request)
    {
        try {

            $this->validator->validar($request);

            return parent::store($request);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação.',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    public function update(Request $request)
    {
        try {

            $this->validator->validar($request);

            return parent::update($request);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação.',
                'errors' => $e->errors(),
            ], 422);
        }
    }
}
