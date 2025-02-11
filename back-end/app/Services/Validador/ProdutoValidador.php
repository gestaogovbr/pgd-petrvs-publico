<?php

namespace App\Services\Validador;

use App\Exceptions\DataInvalidException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\Usuario;

class ProdutoValidador extends BaseValidador
{
    public function validarRegra(array $data): array
    {
        $entity = $this->getTipo() === self::TIPO_STORE ? $data['entity'] : $data['data'];

        $validator = Validator::make($entity, $this->regrasValidacao());

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    
    private function regrasValidacao(): array
    {
        $regrasComuns = [
            'nome_fantasia' => 'nullable|string|max:255',
            'url' => 'nullable|url',
            'unidade_id' => 'uuid|exists:unidades,id',
            'data_ativado' => 'nullable|date',
            'data_desativado' => 'nullable|date',
            'responsavel_id' => [
            'required',
            'uuid',
            'exists:usuarios,id',
                function ($attribute, $value, $fail) {
                    $usuario = Usuario::find($value);
                    if (!$usuario || !$usuario->isCurador()) {
                        $fail('O usuário selecionado não é um curador válido.');
                    }
                },
            ],
        ];
        
        if ($this->getTipo() === self::TIPO_STORE) {
            return array_merge($regrasComuns, [
                'nome' => 'required|string|max:100',
                'tipo' => 'required|string|in:produto,servico',
                'descricao' => 'required|string|max:255',
            ]);
        }

        if ($this->getTipo() === self::TIPO_UPDATE) {
            return array_merge($regrasComuns, [
                'nome' => 'sometimes|string|max:100',
                'tipo' => 'sometimes|string|in:produto,servico',
                'descricao' => 'sometimes|string|max:255',
            ]);
        }

        return $regrasComuns; 
    }
}
