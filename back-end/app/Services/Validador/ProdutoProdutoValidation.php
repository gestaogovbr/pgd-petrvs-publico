<?php

namespace App\Services\Validador;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ProdutoProdutoValidation implements IValidador
{
    public function validar(Request $request) : array
    {
        if(!isset($request->all()['entity'])) {
            throw new ValidationException('Entity não informado');
        }
        
        $entity = $request->all()['entity'];
        if(!isset($entity['produto_produto'])){
            return [];
        }
        $validator = Validator::make($entity['produto_produto'], [
            'produto_id' => 'required|uuid|exists:produtos,id',
            'produto_base_id' => 'required|uuid|exists:produtos,id',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
