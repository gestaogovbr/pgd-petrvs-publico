<?php

namespace App\V2\PlanoTrabalho;

use Illuminate\Http\Request;

class PlanoTrabalhoValidacoes
{
    public static function index(Request $request): array
    {
        return $request->validate([
            'include_arquivados' => ['sometimes', 'boolean'],
            'include_from_unidades_subordinadas' => ['sometimes', 'boolean'],
            'unidade_id' => ['required_with:include_from_unidades_subordinadas', 'nullable', 'uuid'],
            'only_vigentes' => ['sometimes', 'boolean'],
            'only_meus_planos' => ['sometimes', 'boolean'],
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
            'modalidade' => ['required'],
            'justificativa' => ['required_with:modalidade', 'nullable', 'string', 'max:500'],
        ], [
            'usuario_id.required' => 'O participante é obrigatório.',
            'unidade_id.required' => 'A unidade executora é obrigatória.',
            'programa_id.required' => 'O regramento é obrigatório.',
            'data_inicio.required' => 'A data de início é obrigatória.',
            'data_fim.required' => 'A data de fim é obrigatória.',
            'data_fim.after_or_equal' => 'A data de fim deve ser igual ou posterior à data de início.',
            'modalidade.required' => 'A modalidade é obrigatória.',
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
        ]);
    }

    public static function update(Request $request): array
    {
        return $request->validate([
            'entity' => ['required'],
            'entity.id' => ['required', 'uuid'],
            'entity.tipo_modalidade_id' => ['required', 'uuid'],
            'entity.carga_horaria' => ['required', 'numeric', 'min:0.01'],
            'entity.data_inicio' => ['required', 'date'],
            'entity.data_fim' => ['required', 'date', 'after_or_equal:entity.data_inicio'],
            'entity.entregas' => ['required', 'array', 'min:1'],
            'entity.documento_id' => ['required', 'uuid'],
            'with' => ['array'],
        ], [
            'entity.id.required' => 'O campo :attribute é obrigatório para edição.',
            'entity.id.uuid' => 'O campo :attribute deve ser um UUID válido.',
            'entity.tipo_modalidade_id.required' => 'O campo :attribute (modalidade) é obrigatório.',
            'entity.carga_horaria.required' => 'O campo :attribute é obrigatório.',
            'entity.carga_horaria.min' => 'O campo :attribute deve ser maior que zero.',
            'entity.data_inicio.required' => 'O campo :attribute é obrigatório.',
            'entity.data_fim.required' => 'O campo :attribute é obrigatório.',
            'entity.data_fim.after_or_equal' => 'O campo :attribute deve ser igual ou posterior à data de início.',
            'entity.entregas.required' => 'O campo :attribute é obrigatório.',
            'entity.entregas.min' => 'O plano deve possuir ao menos uma entrega.',
            'entity.documento_id.required' => 'O campo :attribute (TCR) é obrigatório.',
        ]);
    }

    public static function getById(Request $request): array
    {
        return $request->validate([
            'id' => ['required', 'uuid'],
            'with' => ['array'],
        ]);
    }

    public static function query(Request $request): array
    {
        return $request->validate([
            'page' => ['required', 'integer', 'min:1'],
            'limit' => ['required', 'integer', 'min:1'],
            'orderBy' => ['array'],
            'where' => ['array'],
            'with' => ['array'],
            'fields' => ['array'],
        ]);
    }

    public static function destroy(Request $request): array
    {
        return $request->validate([
            'id' => ['required', 'uuid'],
        ]);
    }
}
