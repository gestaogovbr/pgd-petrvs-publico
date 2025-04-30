<?php

namespace App\Http\Controllers;

use App\Services\Validador\IValidador;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ClienteController extends ControllerBase
{
    private array $validators;

    public $updatable = ['nome', 'tipo_cliente_id', 'data_desativado'];

    public function __construct(IValidador ...$validator)
    {
        parent::__construct();
        $this->validators = $validator;
    }
    
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
       
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
                $validator->setTipo('update');
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
