<?php

namespace App\Services\Validador;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SolucaoValidador implements IValidador
{
    public function validar(Request $request) : array
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:250',
            'sigla' => 'required|string|max:20',
            'unidade_id' => 'required|string|exists:unidades,id',
            'responsavel_id' => 'required|string|exists:usuarios,id',
            'descricao' => 'required|string',
            'url' => 'string|max:250'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
