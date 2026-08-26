<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\Validators;

use App\Enums\MuralAvisoDestinatario;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MuralAvisoRequestValidator
{
    private const MESSAGES = [
        'titulo.required' => 'O título é obrigatório.',
        'titulo.max' => 'O título deve ter no máximo 255 caracteres.',
        'conteudo.required' => 'O conteúdo é obrigatório.',
        'destinatario.required' => 'O destinatário é obrigatório.',
        'destinatario.in' => 'O destinatário informado é inválido.',
        'data_publicacao.required' => 'A data de publicação é obrigatória.',
        'data_publicacao.date' => 'A data de publicação deve ser uma data válida.',
        'data_publicacao.after_or_equal' => 'A data de publicação deve ser a partir do momento atual.',
        'data_expiracao.required' => 'A data de expiração é obrigatória.',
        'data_expiracao.date' => 'A data de expiração deve ser uma data válida.',
        'data_expiracao.after_or_equal' => 'A data de expiração deve ser igual ou posterior à data de publicação.',
    ];

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
            'data_publicacao' => ['required', 'date', 'after_or_equal:now'],
            'data_expiracao' => ['required', 'date', 'after_or_equal:data_publicacao'],
        ], self::MESSAGES);
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
            'data_publicacao' => ['required', 'date', 'after_or_equal:now'],
            'data_expiracao' => ['required', 'date', 'after_or_equal:data_publicacao'],
        ], self::MESSAGES);
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
