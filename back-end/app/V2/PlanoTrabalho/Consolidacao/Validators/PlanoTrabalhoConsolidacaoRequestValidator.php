<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Validators;

use Illuminate\Http\Request;

class PlanoTrabalhoConsolidacaoRequestValidator
{
    public static function dispensas(string $planoTrabalhoId): void
    {
        validator(
            ['plano_trabalho_id' => $planoTrabalhoId],
            ['plano_trabalho_id' => ['required', 'uuid']],
        )->validate();
    }

    /**
     * @return array<string, mixed>
     */
    public static function concluir(Request $request): array
    {
        return $request->validate([
            'justificativa_carga_horaria' => ['sometimes', 'nullable', 'string', 'max:500'],
        ], [
            'justificativa_carga_horaria.max' => 'A justificativa não pode exceder 500 caracteres.',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public static function reabrir(Request $request): array
    {
        return $request->validate([
            'justificativa' => ['required', 'string', 'max:500'],
        ], [
            'justificativa.required' => 'A justificativa é obrigatória.',
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
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
