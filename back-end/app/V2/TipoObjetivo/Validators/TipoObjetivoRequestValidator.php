<?php

declare(strict_types=1);

namespace App\V2\TipoObjetivo\Validators;

use Illuminate\Http\Request;

class TipoObjetivoRequestValidator
{
    /** @return array<string, mixed> */
    public static function store(Request $request): array
    {
        return $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
        ], [
            'nome.required' => 'O nome do tipo de objetivo é obrigatório.',
            'nome.max' => 'O nome não pode ter mais de 255 caracteres.',
        ]);
    }

    /** @return array<string, mixed> */
    public static function update(Request $request): array
    {
        return $request->validate([
            'nome' => ['sometimes', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
        ], [
            'nome.max' => 'O nome não pode ter mais de 255 caracteres.',
        ]);
    }
}
