<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators;

use App\Exceptions\ValidateException;
use Illuminate\Support\Facades\Validator;

class AtividadeRequestValidator
{
    private const MAX_DESCRICAO_LENGTH = 1500;

    public static function validarStore(array $data): array
    {
        $validator = Validator::make($data, [
            'plano_trabalho_entrega_id' => 'required|uuid',
            'descricao' => 'required|string|max:' . self::MAX_DESCRICAO_LENGTH,
        ]);

        if ($validator->fails()) {
            throw new ValidateException($validator->errors()->first());
        }

        return $validator->validated();
    }

    public static function validarUpdate(array $data): array
    {
        $validator = Validator::make($data, [
            'plano_trabalho_entrega_id' => 'sometimes|uuid',
            'descricao' => 'sometimes|string|max:' . self::MAX_DESCRICAO_LENGTH,
        ]);

        if ($validator->fails()) {
            throw new ValidateException($validator->errors()->first());
        }

        return $validator->validated();
    }
}
