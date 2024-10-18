<?php

namespace App\Services\Validador;

use App\Exceptions\DataInvalidException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ProdutoProcessoCadeiaValorValidation extends BaseValidador
{
    public function validarRegra(array $data): array
    {
        $entity = $this->getTipo() === self::TIPO_STORE ? $data['entity'] : $data['data'];

        if (!isset($entity['produto_processo_cadeia_valor'])) {
            return [];
        }
        $produtoProcessoCadeiaValores = $entity['produto_processo_cadeia_valor'];
        if(empty($produtoProcessoCadeiaValores)){
            return [];
        }
        foreach ($produtoProcessoCadeiaValores as $produtoProcessoCadeiaValore) {
            $validator = Validator::make($produtoProcessoCadeiaValore, [
                'cadeia_valor_processo_id' => 'required|uuid|exists:cadeias_valores_processos,id',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
        }

        return $validator->validated();
    }
}
