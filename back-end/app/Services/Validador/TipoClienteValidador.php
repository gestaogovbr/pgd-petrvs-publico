<?php

namespace App\Services\Validador;

use App\Exceptions\DataInvalidException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class TipoClienteValidador implements IValidador
{
    public function validar(Request $request) : array
    {
        if(!isset($request->all()['entity'])) {
            throw new DataInvalidException('Entity não informado');
        }
        
        $entity = $request->all()['entity'];

        $validator = Validator::make($entity, [
            'nome' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
