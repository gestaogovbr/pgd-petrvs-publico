<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia\Validators;

use Illuminate\Http\Request;

class OcorrenciaRequestValidator
{
    public static function store(Request $request): array
    {
        return $request->validate([
            'observacoes' => ['required', 'string'],
            'data_inicio' => ['required', 'date'],
            'data_fim' => ['required', 'date', 'after_or_equal:data_inicio'],
            'tipo_motivo_afastamento_id' => ['required', 'uuid'],
            'horas' => ['nullable', 'integer', 'min:1'],
        ], [
            'observacoes.required' => 'A descrição da ocorrência é obrigatória.',
            'data_inicio.required' => 'A data de início é obrigatória.',
            'data_fim.required' => 'A data de fim é obrigatória.',
            'data_fim.after_or_equal' => 'A data de fim deve ser igual ou posterior à data de início.',
            'tipo_motivo_afastamento_id.required' => 'O motivo do afastamento é obrigatório.',
        ]);
    }

    public static function update(Request $request): array
    {
        return $request->validate([
            'observacoes' => ['sometimes', 'string'],
            'tipo_motivo_afastamento_id' => ['sometimes', 'uuid'],
            'horas' => ['nullable', 'integer', 'min:1'],
            'data_inicio' => ['sometimes', 'date'],
            'data_fim' => ['sometimes', 'date', 'after_or_equal:data_inicio'],
        ]);
    }
}
