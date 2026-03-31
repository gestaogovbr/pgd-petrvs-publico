<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\Validators;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlanoEntregaRequestValidator
{
    public static function buscarPorUnidade(Request $request): array
    {
        return $request->validate([
            'unidade_id' => ['required', 'uuid'],
        ], [
            'unidade_id.required' => 'O id da unidade é obrigatório.',
            'unidade_id.uuid' => 'O id da unidade deve ser um UUID válido.',
        ]);
    }

    public static function buscarEntregasPorPlano(string $planoEntregaId): string
    {
        Validator::make(
            ['plano_entrega_id' => $planoEntregaId],
            ['plano_entrega_id' => ['required', 'uuid']],
            [
                'plano_entrega_id.required' => 'O id do plano de entrega é obrigatório.',
                'plano_entrega_id.uuid'     => 'O id do plano de entrega deve ser um UUID válido.',
            ]
        )->validate();

        return $planoEntregaId;
    }
}
