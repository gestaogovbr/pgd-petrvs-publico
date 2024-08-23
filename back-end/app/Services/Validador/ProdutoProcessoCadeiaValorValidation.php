<?php

namespace App\Services\Validador;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ProdutoProcessoCadeiaValorValidation implements IValidador
{
    public function validar(Request $request) : array
    {
        if(!isset($request->all()['entity'])) {
            throw new ValidationException('Entity não informado');
        }
        
        $entity = $request->all()['entity'];
        if(!isset($entity['produto_processo_cadeia_valor'])){
            return [];
        }
        $validator = Validator::make($entity['produto_processo_cadeia_valor'], [
            'produto_id' => 'required|uuid|exists:produtos,id',
            'cadeia_valor_processo_id' => 'required|uuid|exists:cadeias_valores_processos,id',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
