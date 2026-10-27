<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Validators;

use App\Rules\AfterOrEqualField;
use Illuminate\Http\Request;

class PainelRequestValidator
{
    public static function filtros(Request $request): array
    {
        return $request->validate([
            'tipo_consulta' => ['required', 'in:situacao_atual,historico'],
            'unidade_id' => ['required', 'uuid'],
            'data_inicio' => ['required_if:tipo_consulta,historico', 'nullable', 'date'],
            'data_fim' => ['required_if:tipo_consulta,historico', 'nullable', 'date', new AfterOrEqualField('data_inicio', 'A data de fim deve ser igual ou posterior à data de início.')],
        ]);
    }

    public static function filtrosSemHistorico(Request $request): array
    {
        return $request->validate([
            'unidade_id' => ['required', 'uuid'],
        ]);
    }
}
