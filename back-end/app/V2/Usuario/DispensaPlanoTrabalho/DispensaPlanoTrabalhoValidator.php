<?php

declare(strict_types=1);

namespace App\V2\Usuario\DispensaPlanoTrabalho;

use App\Exceptions\ValidateException;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

final class DispensaPlanoTrabalhoValidator
{
    /**
     * @return array{data_inicio: string, data_fim: string|null, ciencia: bool}
     */
    public function validarFormalizar(Request $request): array
    {
        $validator = Validator::make($request->all(), [
            'data_inicio' => ['required', 'date'],
            'data_fim' => ['nullable', 'date'],
            'ciencia' => ['accepted'],
        ], [
            'data_inicio.required' => 'A data de início da dispensa é obrigatória.',
            'ciencia.accepted' => 'É necessário fornecer a ciência para formalizar ou alterar a dispensa.',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $data = $validator->validated();
        $inicio = Carbon::parse($data['data_inicio'])->startOfDay();
        $fim = isset($data['data_fim']) && $data['data_fim'] !== null && $data['data_fim'] !== ''
            ? Carbon::parse($data['data_fim'])->startOfDay()
            : null;

        if ($fim !== null && $fim->lt($inicio)) {
            throw new ValidateException('A data de fim da dispensa não pode ser anterior à data de início.');
        }

        return [
            'data_inicio' => $inicio->toDateString(),
            'data_fim' => $fim?->toDateString(),
            'ciencia' => true,
        ];
    }

    /**
     * @return array{ciencia: bool}
     */
    public function validarEncerrar(Request $request): array
    {
        $validator = Validator::make($request->all(), [
            'ciencia' => ['accepted'],
        ], [
            'ciencia.accepted' => 'É necessário fornecer a ciência para encerrar a dispensa.',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return ['ciencia' => true];
    }
}
