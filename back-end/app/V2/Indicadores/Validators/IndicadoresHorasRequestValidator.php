<?php

declare(strict_types=1);

namespace App\V2\Indicadores\Validators;

use Illuminate\Http\Request;

class IndicadoresHorasRequestValidator
{
    public static function horas(Request $request): array
    {
        return $request->validate([
            'unidade_id' => ['required', 'uuid'],
            'incluir_subordinadas' => ['sometimes', 'boolean'],
            'data_inicial' => ['sometimes', 'nullable', 'date'],
            'data_final' => ['sometimes', 'nullable', 'date'],
            'somente_vigentes' => ['sometimes', 'boolean'],
        ]);
    }
}
