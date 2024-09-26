<?php

namespace App\Services\Validador;

use App\Exceptions\DataInvalidException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class TipoClienteValidador extends BaseValidador
{
    public function validarRegra(array $data): array
    {
        if(!isset($data['entity'])) {
            throw new DataInvalidException('Entity não informado');
        }
        
        $entity = $data['entity'];

        $validator = Validator::make($entity, [
            'nome' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
