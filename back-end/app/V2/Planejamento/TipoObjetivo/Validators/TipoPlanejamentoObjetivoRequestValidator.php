<?php

declare(strict_types=1);

namespace App\V2\Planejamento\TipoObjetivo\Validators;

use App\Enums\EstruturaElementoEnum;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TipoPlanejamentoObjetivoRequestValidator
{
    /** @return array<string, mixed> */
    public static function index(Request $request): array
    {
        return $request->validate([
            'estrutura' => ['nullable', 'string', Rule::enum(EstruturaElementoEnum::class)],
        ], [
            'estrutura.Illuminate\Validation\Rules\Enum' => 'A estrutura deve ser: planejamento institucional ou cadeia de valor.',
        ]);
    }

    /** @return array<string, mixed> */
    public static function store(Request $request): array
    {
        return $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
            'estrutura' => ['required', 'string', Rule::enum(EstruturaElementoEnum::class)],
        ], [
            'nome.required' => 'O nome do tipo de objetivo é obrigatório.',
            'nome.max' => 'O nome não pode ter mais de 255 caracteres.',
            'estrutura.required' => 'A estrutura é obrigatória.',
            'estrutura.Illuminate\Validation\Rules\Enum' => 'A estrutura deve ser: planejamento institucional ou cadeia de valor.',
        ]);
    }

    /** @return array<string, mixed> */
    public static function update(Request $request): array
    {
        return $request->validate([
            'nome' => ['sometimes', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
            'estrutura' => ['sometimes', 'string', Rule::enum(EstruturaElementoEnum::class)],
        ], [
            'nome.max' => 'O nome não pode ter mais de 255 caracteres.',
            'estrutura.Illuminate\Validation\Rules\Enum' => 'A estrutura deve ser: planejamento institucional ou cadeia de valor.',
        ]);
    }
}
