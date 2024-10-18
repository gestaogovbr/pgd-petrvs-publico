<?php

namespace App\Services\Validador;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SolucaoValidador extends BaseValidador
{
    public function validarRegra(array $data): array
    {
        $validator = Validator::make($data, [
            'nome' => 'required|string|max:250',
            'sigla' => 'required|string|max:20',
            'unidade_id' => 'required|string|exists:unidades,id',
            'descricao' => 'required|string',
            'status' => 'required|integer|in:0,1',
            'url' => 'string|max:250'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
