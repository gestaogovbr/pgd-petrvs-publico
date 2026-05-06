<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators;

use Illuminate\Http\Request;

class AtividadeRequestValidator
{
    private const MAX_DESCRICAO_LENGTH = 1500;

    public static function store(Request $request): array
    {
        return $request->validate([
            'plano_trabalho_entrega_id' => ['required', 'uuid'],
            'descricao' => ['required', 'string', 'max:' . self::MAX_DESCRICAO_LENGTH],
        ], [
            'plano_trabalho_entrega_id.required' => 'A entrega é obrigatória.',
            'descricao.required' => 'A descrição do trabalho executado é obrigatória.',
            'descricao.max' => 'A descrição não pode exceder ' . self::MAX_DESCRICAO_LENGTH . ' caracteres.',
        ]);
    }

    public static function update(Request $request): array
    {
        return $request->validate([
            'plano_trabalho_entrega_id' => ['sometimes', 'uuid'],
            'descricao' => ['sometimes', 'string', 'max:' . self::MAX_DESCRICAO_LENGTH],
        ], [
            'descricao.max' => 'A descrição não pode exceder ' . self::MAX_DESCRICAO_LENGTH . ' caracteres.',
        ]);
    }
}
