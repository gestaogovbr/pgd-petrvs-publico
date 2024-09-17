<?php

namespace App\Services\Validador;

use App\Exceptions\DataInvalidException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ProdutoClienteValidador implements IValidador
{
    public function validar(Request $request) : array
    {
        if(!isset($request->all()['entity'])) {
            throw new DataInvalidException('Entity não informado');
        }
        
        $entity = $request->all()['entity'];
        if(!isset($entity['produto_cliente'])){
            return [];
        }
        $produtosCliente = $entity['produto_cliente'];
        
        if(empty($produtosCliente)){
            return [];
        }
        foreach ($produtosCliente as $produtoCliente) {
            $validator = Validator::make($produtoCliente, [
                'cliente_id' => 'required|uuid|exists:clientes,id',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
        }


        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
