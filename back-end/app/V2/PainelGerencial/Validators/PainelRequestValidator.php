<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Validators;

use Illuminate\Http\Request;

class PainelRequestValidator
{
    public static function filtros(Request $request): array
    {
        return $request->validate([
            'tipo_consulta' => ['required', 'in:situacao_atual,historico'],
            'unidade_id' => ['required', 'uuid'],
            'data_inicio' => ['required_if:tipo_consulta,historico', 'nullable', 'date'],
            'data_fim' => ['required_if:tipo_consulta,historico', 'nullable', 'date', 'after_or_equal:data_inicio'],
        ]);
    }
}
