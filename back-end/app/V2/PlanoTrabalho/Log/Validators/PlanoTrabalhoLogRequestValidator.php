<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Log\Validators;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PlanoTrabalhoLogRequestValidator
{
    public static function index(Request $request): array
    {
        return $request->validate([
            'page' => ['sometimes', 'integer', 'min:1'],
            'size' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'filters' => ['sometimes', 'array'],
            'filters.usuario_id' => ['sometimes', 'nullable', 'uuid'],
            'filters.usuario_nome' => ['sometimes', 'nullable', 'string', 'max:255'],
            'filters.data_inicio' => ['sometimes', 'nullable', 'date'],
            'filters.data_fim' => ['sometimes', 'nullable', 'date', 'after_or_equal:filters.data_inicio'],
            'filters.event' => ['sometimes', 'nullable', 'string', Rule::in(['created', 'updated', 'deleted'])],
            'filters.search' => ['sometimes', 'nullable', 'string', 'max:255'],
            'filters.modelo' => ['sometimes', 'nullable', 'string', 'max:255'],
        ]);
    }
}
