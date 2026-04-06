<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\Validators;

use Illuminate\Http\Request;

class PlanoTrabalhoEntregaRequestValidator
{
    public static function store(Request $request): array
    {
        return self::validate($request);
    }

    public static function update(Request $request): array
    {
        return self::validate($request);
    }

    private static function validate(Request $request): array
    {
        return $request->validate([
            'origem' => ['required', 'string', 'in:PLANO_ENTREGA,OUTRO_ORGAO,SEM_ENTREGA'],
            'plano_entrega_entrega_id' => ['required_if:tipo,PLANO_ENTREGA', 'nullable', 'uuid'],
            'orgao' => ['required_if:tipo,OUTRO_ORGAO', 'nullable', 'string', 'max:256'],
            'forca_trabalho' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'descricao' => ['sometimes', 'nullable', 'string', 'max:1000'],
        ], [
            'origem.required' => 'A origem da entrega é obrigatório.',
            'origem.in' => 'A origem da entrega deve ser PLANO_ENTREGA, OUTRO_ORGAO ou SEM_ENTREGA.',
            'plano_entrega_entrega_id.required_if' => 'O vínculo com a entrega do plano de entregas é obrigatório para este tipo.',
            'plano_entrega_entrega_id.uuid' => 'O vínculo com plano de entrega deve ser um UUID válido.',
            'orgao.required_if' => 'O nome do órgão é obrigatório para este tipo.',
            'orgao.max' => 'O nome do órgão não pode exceder 256 caracteres.',
            'forca_trabalho.min' => 'A força de trabalho não pode ser negativa.',
            'descricao.max' => 'A descrição não pode exceder 1000 caracteres.',
        ]);
    }
}
