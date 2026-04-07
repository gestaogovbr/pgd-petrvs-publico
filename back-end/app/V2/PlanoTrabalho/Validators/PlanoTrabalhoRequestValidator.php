<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use Illuminate\Http\Request;

class PlanoTrabalhoRequestValidator
{
    public static function index(Request $request): array
    {
        return $request->validate([
            'size' => ['sometimes', 'integer', 'min:1'],
            'page' => ['sometimes', 'integer', 'min:1'],
            'filters' => ['sometimes', 'array'],
            'filters.data_inicio' => ['sometimes', 'nullable', 'date'],
            'filters.data_fim' => ['sometimes', 'nullable', 'date'],
            'filters.vigentes' => ['sometimes', 'boolean'],
            'filters.arquivados' => ['sometimes', 'boolean'],
            'filters.usuario_id' => ['sometimes', 'nullable', 'uuid'],
            'filters.unidade_id' => ['sometimes', 'nullable', 'uuid'],
            'filters.incluir_subordinadas' => ['sometimes', 'boolean'],
            'filters.numero' => ['sometimes', 'nullable', 'integer'],
            'filters.tipo_modalidade_id' => ['sometimes', 'nullable', 'uuid'],
            'filters.status' => ['sometimes', 'nullable', 'uuid'],
            'filters.hierarquia' => ['sometimes', 'boolean'],
            'filters.usuario_nome' => ['sometimes', 'nullable', 'string'],
            'filters.unidade_regramento' => ['sometimes', 'nullable', 'string'],
        ]);
    }

    public static function store(Request $request): array
    {
        return $request->validate([
            'usuario_id' => ['required', 'uuid'],
            'unidade_id' => ['required', 'uuid'],
            'programa_id' => ['required', 'uuid'],
            'data_inicio' => ['required', 'date'],
            'data_fim' => ['required', 'date', 'after_or_equal:data_inicio'],
            'tipo_modalidade_id' => ['required', 'uuid'],
            'justificativa' => ['nullable', 'string', 'max:500'],
        ], [
            'usuario_id.required' => 'O participante é obrigatório.',
            'unidade_id.required' => 'A unidade executora é obrigatória.',
            'programa_id.required' => 'O regramento é obrigatório.',
            'data_inicio.required' => 'A data de início é obrigatória.',
            'data_fim.required' => 'A data de fim é obrigatória.',
            'data_fim.after_or_equal' => 'A data de fim deve ser igual ou posterior à data de início.',
            'tipo_modalidade_id.required' => 'A modalidade é obrigatória.',
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
        ]);
    }

    public static function update(Request $request): array
    {
        return $request->validate([
            'usuario_id' => ['required', 'uuid'],
            'unidade_id' => ['required', 'uuid'],
            'programa_id' => ['required', 'uuid'],
            'data_inicio' => ['required', 'date'],
            'data_fim' => ['required', 'date', 'after_or_equal:data_inicio'],
            'tipo_modalidade_id' => ['required', 'uuid'],
            'justificativa' => ['nullable', 'string', 'max:500'],
        ], [
            'usuario_id.required' => 'O participante é obrigatório.',
            'unidade_id.required' => 'A unidade executora é obrigatória.',
            'programa_id.required' => 'O regramento é obrigatório.',
            'data_inicio.required' => 'A data de início é obrigatória.',
            'data_fim.required' => 'A data de fim é obrigatória.',
            'data_fim.after_or_equal' => 'A data de fim deve ser igual ou posterior à data de início.',
            'tipo_modalidade_id.required' => 'A modalidade é obrigatória.',
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
        ]);
    }

}
