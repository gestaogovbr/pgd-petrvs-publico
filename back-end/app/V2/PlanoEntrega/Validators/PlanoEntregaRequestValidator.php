<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\Validators;

use Illuminate\Http\Request;

class PlanoEntregaRequestValidator
{
    public static function buscarPorUnidade(Request $request): array
    {
        return $request->validate([
            'unidade_id' => ['required', 'uuid'],
        ], [
            'unidade_id.required' => 'O id da unidade é obrigatório.',
            'unidade_id.uuid' => 'O id da unidade deve ser um UUID válido.',
        ]);
    }
}
