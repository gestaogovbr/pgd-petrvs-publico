<?php

namespace App\Services\Validador;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SolucaoValidador extends BaseValidador
{
    public function validarRegra(array $data): array
    {
        $validator = Validator::make($data['entity'], [
            'nome' => 'required|string|max:250',
            'sigla' => 'required|string|max:20',
            'descricao' => 'required|string',
            'status' => 'integer|in:0,1',
            'url' => 'required|url'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
