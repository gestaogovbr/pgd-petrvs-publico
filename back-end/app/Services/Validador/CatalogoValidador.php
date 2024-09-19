<?php

namespace App\Services\Validador;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CatalogoValidador extends BaseValidador
{
    public function validarRegra(array $data): array
    {
        $validator = Validator::make($data, [
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
