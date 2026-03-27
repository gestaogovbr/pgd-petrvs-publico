<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\Validators;

use Illuminate\Http\Request;

class PlanoTrabalhoEntregaRequestValidator
{
    public static function store(Request $request): array
    {
        return $request->validate([
            'plano_entrega_entrega_id' => ['required', 'uuid'],
            'forca_trabalho' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'descricao' => ['sometimes', 'nullable', 'string', 'max:1000'],
        ], [
            'plano_entrega_entrega_id.required' => 'O vínculo com plano de entrega é obrigatório.',
            'plano_entrega_entrega_id.uuid' => 'O vínculo com plano de entrega deve ser um UUID válido.',
            'forca_trabalho.min' => 'A força de trabalho não pode ser negativa.',
            'descricao.max' => 'A descrição não pode exceder 1000 caracteres.',
        ]);
    }
}
