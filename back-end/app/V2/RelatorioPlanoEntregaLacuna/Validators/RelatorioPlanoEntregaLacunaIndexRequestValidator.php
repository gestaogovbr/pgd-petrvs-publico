<?php

declare(strict_types=1);

namespace App\V2\RelatorioPlanoEntregaLacuna\Validators;

use Illuminate\Http\Request;

class RelatorioPlanoEntregaLacunaIndexRequestValidator
{
    /** @return array<string, mixed> */
    public static function index(Request $request): array
    {
        return $request->validate([
            'page' => ['sometimes', 'integer', 'min:1'],
            'filters' => ['sometimes', 'array'],
            'filters.unidade_id' => ['sometimes', 'nullable', 'string', 'max:36'],
            'filters.incluir_unidades_subordinadas' => ['sometimes', 'nullable'],
            'filters.periodo_inicio' => ['sometimes', 'nullable', 'date'],
            'filters.periodo_fim' => ['sometimes', 'nullable', 'date'],
            'filters.unidadeHierarquia' => ['sometimes', 'nullable', 'string', 'max:256'],
            'filters.nome' => ['sometimes', 'nullable', 'string', 'max:256'],
            'filters.codigo' => ['sometimes', 'nullable', 'string', 'max:32'],
            'filters.lacuna' => ['sometimes', 'nullable', 'string', 'max:64'],
            'filters.quantidade_dias' => ['sometimes', 'nullable', 'string', 'max:8'],
        ]);
    }
}
