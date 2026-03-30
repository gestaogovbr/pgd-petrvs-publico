<?php

declare(strict_types=1);

namespace App\V2\Unidade\Validators;

use Illuminate\Http\Request;

class UnidadeRequestValidator
{
    public static function buscarPorNomeOuCodigo(Request $request): array
    {
        return $request->validate([
            'termo' => ['nullable', 'string', 'min:3'],
            'hierarquia' => ['nullable', 'boolean'],
            'todos' => ['nullable', 'boolean'],
        ], [
            'termo.min' => 'O termo deve ter ao menos 3 caracteres.',
        ]);
    }
}
