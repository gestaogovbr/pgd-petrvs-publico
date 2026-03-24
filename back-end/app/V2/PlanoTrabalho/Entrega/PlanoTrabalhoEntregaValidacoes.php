<?php

namespace App\V2\PlanoTrabalho\Entrega;

use Illuminate\Http\Request;

class PlanoTrabalhoEntregaValidacoes
{
    public static function store(Request $request): array
    {
        return $request->validate([
            'entregas' => ['required', 'array', 'min:1'],
            'entregas.*.unidade_id' => ['sometimes', 'nullable', 'uuid'],
            'entregas.*.plano_entrega_entrega_id' => ['sometimes', 'nullable', 'uuid'],
            'entregas.*.forca_trabalho' => ['sometimes', 'nullable', 'numeric', 'between:0,100'],
            'entregas.*.descricao' => ['sometimes', 'nullable', 'string', 'max:1000'],
            'justificativa' => ['sometimes', 'nullable', 'string'],
        ], [
            'entregas.required' => 'O campo entregas é obrigatório.',
            'entregas.min' => 'Deve haver ao menos uma entrega.',
            'entregas.*.plano_entrega_entrega_id.uuid' => 'O vínculo com plano de entrega deve ser um UUID válido.',
            'entregas.*.forca_trabalho.between' => 'A força de trabalho deve estar entre 0 e 100.',
            'entregas.*.descricao.max' => 'A descrição não pode exceder 1000 caracteres.',
        ]);
    }

    public static function update(Request $request): array
    {
        return $request->validate([
            'entrega_id' => ['sometimes', 'uuid'],
            'unidade_id' => ['sometimes', 'nullable', 'uuid'],
            'plano_entrega_entrega_id' => ['sometimes', 'nullable', 'uuid'],
            'forca_trabalho' => ['sometimes', 'nullable', 'numeric', 'between:0,100'],
            'descricao' => ['sometimes', 'nullable', 'string', 'max:1000'],
        ], [
            'plano_entrega_entrega_id.uuid' => 'O vínculo com plano de entrega deve ser um UUID válido.',
            'forca_trabalho.between' => 'A força de trabalho deve estar entre 0 e 100.',
            'descricao.max' => 'A descrição não pode exceder 1000 caracteres.',
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
}
