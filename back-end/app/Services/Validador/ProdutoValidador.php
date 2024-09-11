<?php

namespace App\Services\Validador;

use App\Exceptions\DataInvalidException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ProdutoValidador implements IValidador
{
    public function validar(Request $request) : array
    {
        if(!isset($request->all()['entity'])) {
            throw new DataInvalidException('Entity não informado');
        }

        $entity = $request->all()['entity'];
        $validator = Validator::make($entity, [
            'nome' => 'required|string|max:100',
            'nome_fantasia' => 'nullable|string|max:255',
            'tipo' => 'required|string|in:produto,servico',
            'descricao' => 'required|string|max:255',
            'url' => 'nullable|url',
            'unidade_id' => 'required|uuid|exists:unidades,id',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
