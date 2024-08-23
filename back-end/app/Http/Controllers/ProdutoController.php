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
    private array $validators;
    public function __construct(IValidador ...$validator)
    {
        parent::__construct();
        $this->validators = $validator;
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario)
    {
       
    }

    public function store(Request $request)
    {
        try {

            foreach ($this->validators as $validator) {
                $validator->validar($request);
            }

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

            foreach ($this->validators as $validator) {
                $validator->validar($request);
            }

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
