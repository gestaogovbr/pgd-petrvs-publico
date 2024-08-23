<?php

namespace App\Services\Validador;

use App\Exceptions\DataInvalidException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ProdutoProdutoValidation implements IValidador
{
    public function validar(Request $request) : array
    {
        if(!isset($request->all()['entity'])) {
            throw new DataInvalidException('Entity não informado');
        }
        
        $entity = $request->all()['entity'];
        if(!isset($entity['produto_produto'])){
            return [];
        }
        $produtoProdutos = $entity['produto_produto'];

        foreach ($produtoProdutos as $produtoProduto) {
            $validator = Validator::make($produtoProduto, [
                'produto_id' => 'required|uuid|exists:produtos,id',
                // 'produto_base_id' => 'required|uuid|exists:produtos,id',
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
