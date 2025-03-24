<?php

namespace App\Services\Validador;

use App\Exceptions\DataInvalidException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ClienteValidador extends BaseValidador
{
    public function validarRegra(array $data): array
    {
        $entity = $this->getTipo() === self::TIPO_STORE ? $data['entity'] : $data['data'];
        
        $validator = Validator::make($entity, [
            'nome' => 'required|string|max:255',
            'tipo_cliente_id' => 'required|uuid|exists:tipos_clientes,id',
            'unidade_id' => 'nullable|uuid|exists:unidades,id',
            'data_desativado' => 'nullable|date'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
