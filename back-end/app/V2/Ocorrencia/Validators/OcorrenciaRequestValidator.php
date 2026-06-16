<?php

declare(strict_types=1);

namespace App\V2\Ocorrencia\Validators;

use Illuminate\Http\Request;

class OcorrenciaRequestValidator
{
    public static function store(Request $request): array
    {
        return $request->validate([
            'usuario_id' => ['required', 'uuid'],
            'observacoes' => ['required', 'string'],
            'data_inicio' => ['required', 'date'],
            'data_fim' => ['required', 'date', 'after_or_equal:data_inicio'],
            'tipo_motivo_afastamento_id' => ['required', 'uuid'],
            'horas' => ['nullable', 'integer', 'min:1', 'max:9999'],
        ], [
            'usuario_id.required' => 'O ID do usuário é obrigatório.',
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
            'usuario_id' => ['required', 'uuid'],
            'observacoes' => ['sometimes', 'string'],
            'tipo_motivo_afastamento_id' => ['sometimes', 'uuid'],
            'horas' => ['nullable', 'integer', 'min:1', 'max:9999'],
            'data_inicio' => ['sometimes', 'date'],
            'data_fim' => ['sometimes', 'date', 'after_or_equal:data_inicio'],
        ], [
            'usuario_id.required' => 'O ID do usuário é obrigatório.',
        ]);
    }

    public static function destroy(Request $request): array
    {
        return $request->validate([
            'usuario_id' => ['required', 'uuid'],
        ], [
            'usuario_id.required' => 'O ID do usuário é obrigatório.',
        ]);
    }

    public static function impactoConsolidacoes(Request $request): array
    {
        return $request->validate([
            'usuario_id' => ['required', 'uuid'],
            'data_inicio' => ['required', 'date'],
            'data_fim' => ['required', 'date', 'after_or_equal:data_inicio'],
            'ocorrencia_id' => ['required_if:operacao,editar', 'required_if:operacao,excluir', 'nullable', 'uuid'],
            'operacao' => ['required', 'in:criar,editar,excluir'],
            'tipo_motivo_afastamento_id' => ['nullable', 'uuid'],
        ], [
            'usuario_id.required' => 'O ID do usuário é obrigatório.',
            'data_inicio.required' => 'A data de início é obrigatória.',
            'data_fim.required' => 'A data de fim é obrigatória.',
            'data_fim.after_or_equal' => 'A data de fim deve ser igual ou posterior à data de início.',
            'operacao.required' => 'A operação é obrigatória (criar, editar, excluir).',
        ]);
    }
}
