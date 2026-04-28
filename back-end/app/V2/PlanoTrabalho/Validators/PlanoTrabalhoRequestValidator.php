<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Support\ModalidadePgd;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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
            'filters.modalidade_pgd' => ['sometimes', 'nullable', 'string', Rule::in(ModalidadePgd::keys())],
            'filters.status' => ['sometimes', 'nullable', 'uuid'],
            'filters.hierarquia' => ['sometimes', 'boolean'],
            'filters.usuario_nome' => ['sometimes', 'nullable', 'string'],
            'filters.unidade_regramento' => ['sometimes', 'nullable', 'string'],
            'order_by' => ['sometimes', 'nullable', 'string', 'in:numero,usuario_nome'],
            'order_dir' => ['sometimes', 'nullable', 'string', 'in:asc,desc'],
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
            'modalidade_pgd' => ['required', 'string', Rule::in(ModalidadePgd::keys())],
            'justificativa' => ['nullable', 'string', 'max:500'],
            'justificativa_modalidade' => ['nullable', 'string', 'max:500'],
        ], [
            'usuario_id.required' => 'O participante é obrigatório.',
            'usuario_id.uuid' => 'O valor informado para o participante é inválido.',
            'unidade_id.required' => 'A unidade executora é obrigatória.',
            'unidade_id.uuid' => 'O valor informado para a unidade executora é inválido.',
            'programa_id.required' => 'O regramento é obrigatório.',
            'programa_id.uuid' => 'O valor informado para o regramento é inválido.',
            'data_inicio.required' => 'A data de início é obrigatória.',
            'data_fim.required' => 'A data de fim é obrigatória.',
            'data_fim.after_or_equal' => 'A data de fim deve ser igual ou posterior à data de início.',
            'modalidade_pgd.required' => 'A modalidade é obrigatória.',
            'modalidade_pgd.in' => 'A modalidade informada não é válida.',
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
            'justificativa_modalidade.max' => 'A justificativa da modalidade não pode exceder 500 caracteres.',
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
            'modalidade_pgd' => ['required', 'string', Rule::in(ModalidadePgd::keys())],
            'justificativa' => ['nullable', 'string', 'max:500'],
            'justificativa_modalidade' => ['nullable', 'string', 'max:500'],
        ], [
            'usuario_id.required' => 'O participante é obrigatório.',
            'usuario_id.uuid' => 'O valor informado para o participante é inválido.',
            'unidade_id.required' => 'A unidade executora é obrigatória.',
            'unidade_id.uuid' => 'O valor informado para a unidade executora é inválido.',
            'programa_id.required' => 'O regramento é obrigatório.',
            'programa_id.uuid' => 'O valor informado para o regramento é inválido.',
            'data_inicio.required' => 'A data de início é obrigatória.',
            'data_fim.required' => 'A data de fim é obrigatória.',
            'data_fim.after_or_equal' => 'A data de fim deve ser igual ou posterior à data de início.',
            'modalidade_pgd.required' => 'A modalidade é obrigatória.',
            'modalidade_pgd.in' => 'A modalidade informada não é válida.',
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
            'justificativa_modalidade.max' => 'A justificativa da modalidade não pode exceder 500 caracteres.',
        ]);
    }


    public static function cancelar(Request $request): array
    {
        return $request->validate([
            'justificativa' => ['required', 'string', 'max:500'],
        ], [
            'justificativa.required' => 'A justificativa é obrigatória.',
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
        ]);
    }

    public static function encerrar(Request $request): array
    {
        return $request->validate([
            'justificativa' => ['required', 'string', 'max:500'],
        ], [
            'justificativa.required' => 'A justificativa é obrigatória.',
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
        ]);
    }
}
