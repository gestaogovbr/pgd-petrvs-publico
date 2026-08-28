<?php

declare(strict_types=1);

namespace App\V2\Unidade\Validators;

use Illuminate\Http\Request;

class UnidadeRequestValidator
{
    public static function buscarPorNomeOuCodigo(Request $request): array
    {
        return $request->validate([
            'nome_codigo' => ['nullable', 'string', 'min:3'],
            'todos' => ['nullable', 'boolean'],
        ], [
            'nome_codigo.min' => 'O termo de busca deve ter ao menos 3 caracteres.',
        ]);
    }

    public static function index(Request $request): array
    {
        return $request->validate([
            'size' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'page' => ['sometimes', 'integer', 'min:1'],
            'filters' => ['sometimes', 'array'],
            'filters.termo' => ['sometimes', 'nullable', 'string'],
        ]);
    }
}
