<?php

namespace App\Services\Validador;

use App\Exceptions\DataInvalidException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ProdutoInsumoValidation extends BaseValidador
{
    public function validarRegra(array $data): array
    {
        $entity = $this->getTipo() === self::TIPO_STORE ? $data['entity'] : $data['data'];
        
        if(!isset($entity['produto_insumo'])){
            return [];
        }
        $insumos =  $entity['produto_insumo'];
        $id = $this->getTipo() === self::TIPO_STORE ? $entity['id'] : 0;
        
        if(empty($insumos)){
            return [];
        }
        foreach ($insumos as $insumo) {
            
            $validator = Validator::make($insumo, [
                'origem' => ['required', 'in:interno,externo'],
                'unidade_id' => [
                    'required_if:origem,interno',
                    'uuid',
                    'exists:unidades,id',
                ],
                'produto_insumo_id' => [
                    function ($attribute, $value, $fail) use ($insumo, $id) {
                        if (!empty($insumo['unidade_id'])) {
                            $validator = Validator::make(['produto_insumo_id' => $value], [
                                'produto_insumo_id' => ['required', 'exists:produtos,id']
                            ]);

                            if ($validator->fails()) {
                                foreach ($validator->errors()->all() as $error) {
                                    $fail($error);
                                }
                            }

                            if ($value === $id) {
                                $fail('O produto não pode ser associado a si mesmo.');
                            }
                        }
                    },
                ],
                'cliente_id' => [
                    'required_if:origem,externo',
                    'uuid',
                    'exists:clientes,id',
                ],
                'descricao' => [
                    function ($attribute, $value, $fail) use ($insumo, $id) {
                        if (!empty($insumo['cliente_id'])) {
                            $validator = Validator::make(['descricao' => $value], [
                                'descricao' => ['required']
                            ]);

                            if ($validator->fails()) {
                                foreach ($validator->errors()->all() as $error) {
                                    $fail($error);
                                }
                            }
                        }
                    },
                ],
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
        }


        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
