<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Validators;

use Illuminate\Http\Request;

class PlanoTrabalhoConsolidacaoRequestValidator
{
    public static function reabrir(Request $request): array
    {
        return $request->validate([
            'justificativa' => ['required', 'string', 'max:500'],
        ], [
            'justificativa.required' => 'A justificativa é obrigatória.',
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
        ]);
    }

    public static function recurso(Request $request): array
    {
        return $request->validate([
            'justificativa' => ['required', 'string', 'max:500'],
        ], [
            'justificativa.required' => 'A justificativa do recurso é obrigatória.',
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
        ]);
    }
}
