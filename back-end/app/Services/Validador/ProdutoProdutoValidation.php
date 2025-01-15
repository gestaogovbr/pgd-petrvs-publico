<?php

namespace App\Services\Validador;

use App\Exceptions\DataInvalidException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ProdutoProdutoValidation extends BaseValidador
{
    public function validarRegra(array $data): array
    {
        $entity = $this->getTipo() === self::TIPO_STORE ? $data['entity'] : $data['data'];
        
        if(!isset($entity['produto_produto'])){
            return [];
        }
        $produtoProdutos =  $entity['produto_produto'];
        $id = $this->getTipo() === self::TIPO_STORE ? $entity['id'] : 0;
        
        if(empty($produtoProdutos)){
            return [];
        }
        foreach ($produtoProdutos as $produtoProduto) {
            $validator = Validator::make($produtoProduto, [
                'produto_id' => [
                    'required',
                    'uuid',
                    'exists:produtos,id',
                    function ($attribute, $value, $fail) use ($id) {
                        if ($value === $id) {
                            $fail('O campo :attribute deve ser diferente do produto_base_id.');
                        }
                    },
                ],
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
