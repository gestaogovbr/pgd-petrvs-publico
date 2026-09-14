<?php

declare(strict_types=1);

namespace App\V2\Relatorio\LacunaPlanoTrabalho\Validators;

use Illuminate\Http\Request;

class LacunaPlanoTrabalhoIndexRequestValidator
{
    /** @return array<string, mixed> */
    public static function index(Request $request): array
    {
        return $request->validate([
            'page' => ['sometimes', 'integer', 'min:1'],
            'filters' => ['sometimes', 'array'],
            'filters.unidade_id' => ['required', 'uuid'],
            'filters.periodo_inicio' => ['required', 'date'],
            'filters.periodo_fim' => ['required', 'date', 'after_or_equal:filters.periodo_inicio'],
            'filters.incluir_unidades_subordinadas' => ['sometimes', 'nullable'],
            'filters.nome' => ['sometimes', 'nullable', 'string', 'max:255'],
            'filters.matricula' => ['sometimes', 'nullable', 'string', 'max:64'],
            'filters.unidadeHierarquia' => ['sometimes', 'nullable', 'string', 'max:255'],
            'filters.lacuna' => ['sometimes', 'nullable', 'string', 'max:255'],
            'filters.quantidade_dias' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'filters.ocorrencias_texto' => ['sometimes', 'nullable', 'string', 'max:500'],
        ]);
    }

    /** @return array<string, mixed> */
    public static function export(Request $request): array
    {
        return self::index($request);
    }
}
