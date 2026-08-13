<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators;

use Illuminate\Http\Request;

class AtividadeRequestValidator
{
    private const MAX_DESCRICAO_LENGTH = 10000;

    public static function store(Request $request): array
    {
        return $request->validate([
            'plano_trabalho_entrega_id' => ['required', 'uuid'],
            'descricao' => ['required', 'string', 'max:' . self::MAX_DESCRICAO_LENGTH],
            'esforco_executado' => ['required', 'numeric', 'min:0', 'max:999.99'],
        ], [
            'plano_trabalho_entrega_id.required' => 'A entrega é obrigatória.',
            'descricao.required' => 'A descrição do trabalho executado é obrigatória.',
            'descricao.max' => 'A descrição não pode exceder ' . self::MAX_DESCRICAO_LENGTH . ' caracteres.',
            'esforco_executado.required' => 'O esforço executado é obrigatório.',
            'esforco_executado.min' => 'O esforço executado não pode ser negativo.',
        ]);
    }

    public static function update(Request $request): array
    {
        return $request->validate([
            'plano_trabalho_entrega_id' => ['sometimes', 'uuid'],
            'descricao' => ['sometimes', 'string', 'max:' . self::MAX_DESCRICAO_LENGTH],
            'esforco_executado' => ['sometimes', 'numeric', 'min:0', 'max:999.99'],
        ], [
            'descricao.max' => 'A descrição não pode exceder ' . self::MAX_DESCRICAO_LENGTH . ' caracteres.',
            'esforco_executado.min' => 'O esforço executado não pode ser negativo.',
        ]);
    }
}
