<?php

namespace App\Services\Validador;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CatalogoValidador implements IValidador
{
    public function validar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'unidade_id' => 'required|string|exists:unidades,id',
            'curador_responsavel_id' => 'required|string|exists:usuarios,id',
            'data_inicio' => 'required|date',
            'data_inicio' => 'required|date',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
