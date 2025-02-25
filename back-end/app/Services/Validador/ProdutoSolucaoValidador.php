<?php

namespace App\Services\Validador;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ProdutoSolucaoValidador extends BaseValidador
{
    public function validarRegra(array $data): array
    {
        $entity = $this->getTipo() === self::TIPO_STORE ? $data['entity'] : $data['data'];
        
        if(!isset($entity['produto_solucoes'])){
            return [];
        }
        $produtosSolucoes = $entity['produto_solucoes'];
        
        if(empty($produtosSolucoes)){
            return [];
        }
        foreach ($produtosSolucoes as $produtoSolucao) {
            $validator = Validator::make(
                $produtoSolucao,
                [
                    'solucao_id' => 'required|uuid|exists:solucao_produtos_servicos,id',
                ],
                [
                    'solucao_id.required' => 'O campo solução é obrigatório.',
                    'solucao_id.uuid' => 'O campo solução deve ser um UUID válido.',
                    'solucao_id.exists' => 'A solução informada não foi encontrada.',
                ]
            );

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
