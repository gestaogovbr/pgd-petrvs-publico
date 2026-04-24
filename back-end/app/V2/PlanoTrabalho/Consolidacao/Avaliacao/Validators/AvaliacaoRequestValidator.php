<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators;

use Illuminate\Http\Request;

class AvaliacaoRequestValidator
{
    public static function store(Request $request): array
    {
        return $request->validate([
            'tipo_avaliacao_nota_id' => ['required', 'uuid'],
            'justificativa' => ['nullable', 'string', 'max:500'],
        ], [
            'tipo_avaliacao_nota_id.required' => 'A nota de avaliação é obrigatória.',
            'tipo_avaliacao_nota_id.uuid' => 'O valor informado para a nota de avaliação é inválido.',
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
        ]);
    }
}
