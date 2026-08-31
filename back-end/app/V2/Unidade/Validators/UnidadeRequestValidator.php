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

    public static function minhasUnidades(Request $request): array
    {
        return $request->validate([
            'subordinadas' => ['nullable', 'in:1,0,true,false'],
        ], [
            'subordinadas.in' => 'O parâmetro subordinadas deve ser booleano.',
        ]);
    }
}
