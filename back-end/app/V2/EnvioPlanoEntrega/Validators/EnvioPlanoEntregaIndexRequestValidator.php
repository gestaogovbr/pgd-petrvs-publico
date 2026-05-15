<?php

declare(strict_types=1);

namespace App\V2\EnvioPlanoEntrega\Validators;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EnvioPlanoEntregaIndexRequestValidator
{
    /** @return array<string, mixed> */
    public static function index(Request $request): array
    {
        $statusValues = [
            'Todos',
            'Não agendados',
            'Agendados',
            'Pendentes',
            'Não enviados',
            'Concluídos',
            'Enviados',
            'Com falha',
        ];

        return $request->validate([
            'page' => ['sometimes', 'integer', 'min:1'],
            'filters' => ['sometimes', 'array'],
            'filters.numero' => ['sometimes', 'nullable', 'string', 'max:64'],
            'filters.nome' => ['sometimes', 'nullable', 'string', 'max:256'],
            'filters.unidade_id' => ['sometimes', 'nullable', 'string', 'max:36'],
            'filters.status' => ['sometimes', 'nullable', 'string', Rule::in($statusValues)],
            'filters.alteracao_inicio' => ['sometimes', 'nullable', 'date'],
            'filters.alteracao_fim' => ['sometimes', 'nullable', 'date'],
            'filters.conclusao_inicio' => ['sometimes', 'nullable', 'date'],
            'filters.conclusao_fim' => ['sometimes', 'nullable', 'date'],
            'filters.envio_inicio' => ['sometimes', 'nullable', 'date'],
            'filters.envio_fim' => ['sometimes', 'nullable', 'date'],
        ]);
    }
}
