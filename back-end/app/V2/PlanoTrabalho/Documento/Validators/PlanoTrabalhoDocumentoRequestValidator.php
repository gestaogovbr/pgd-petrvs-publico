<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\Validators;

use Illuminate\Http\Request;

class PlanoTrabalhoDocumentoRequestValidator
{
    public static function store(Request $request): array
    {
        return $request->validate([
            'justificativa' => ['nullable', 'string', 'max:500'],
        ], [
            'justificativa.max' => 'A justificativa não pode exceder 500 caracteres.',
        ]);
    }
}
