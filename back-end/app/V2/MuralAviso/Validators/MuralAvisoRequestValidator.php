<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\Validators;

use App\Enums\MuralAvisoDestinatario;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MuralAvisoRequestValidator
{
    /**
     * @return array<string, mixed>
     */
    public static function store(Request $request): array
    {
        return $request->validate([
            'titulo' => ['required', 'string', 'max:255'],
            'conteudo' => ['required', 'string'],
            'destinatario' => ['required', 'string', Rule::in(array_column(MuralAvisoDestinatario::cases(), 'value'))],
            'tenant_id' => ['nullable', 'string'],
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public static function update(Request $request): array
    {
        return $request->validate([
            'titulo' => ['required', 'string', 'max:255'],
            'conteudo' => ['required', 'string'],
            'destinatario' => ['required', 'string', Rule::in(array_column(MuralAvisoDestinatario::cases(), 'value'))],
            'tenant_id' => ['nullable', 'string'],
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public static function index(Request $request): array
    {
        return $request->validate([
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);
    }
}
