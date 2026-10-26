<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Contribuicao\Validators;

use App\Enums\ContribuicaoExecucaoOrigem;
use Illuminate\Http\Request;

class ContribuicaoExecucaoRequestValidator
{
    private const MAX_DESCRICAO_LENGTH = 1000;
    private const MAX_ESFORCO = 999.99;

    /**
     * @return array<string, mixed>
     */
    public static function store(Request $request): array
    {
        return self::validate($request);
    }

    /**
     * @return array<string, mixed>
     */
    public static function update(Request $request): array
    {
        return self::validate($request);
    }

    /**
     * @return array<string, mixed>
     */
    private static function validate(Request $request): array
    {
        $origensPermitidas = implode(',', ContribuicaoExecucaoOrigem::values());

        return $request->validate([
            'origem' => ['required', 'string', 'in:' . $origensPermitidas],
            'plano_entrega_entrega_id' => ['required_if:origem,' . ContribuicaoExecucaoOrigem::PROPRIA_UNIDADE->value, 'required_if:origem,' . ContribuicaoExecucaoOrigem::OUTRA_UNIDADE->value, 'nullable', 'uuid'],
            'orgao' => ['required_if:origem,' . ContribuicaoExecucaoOrigem::OUTRO_ORGAO->value, 'nullable', 'string', 'max:256'],
            'descricao' => ['required', 'string', 'max:' . self::MAX_DESCRICAO_LENGTH],
            'esforco_executado' => ['required', 'numeric', 'min:0', 'max:' . self::MAX_ESFORCO],
        ], [
            'origem.required' => 'A origem da contribuição é obrigatória.',
            'origem.in' => 'A origem da contribuição deve ser PROPRIA_UNIDADE, OUTRA_UNIDADE, OUTRO_ORGAO ou SEM_ENTREGA.',
            'plano_entrega_entrega_id.required_if' => 'O vínculo com a entrega do plano de entregas é obrigatório para este tipo.',
            'plano_entrega_entrega_id.uuid' => 'O valor informado para o vínculo com plano de entrega é inválido.',
            'orgao.required_if' => 'O nome do órgão é obrigatório para este tipo.',
            'orgao.max' => 'O nome do órgão não pode exceder 256 caracteres.',
            'descricao.required' => 'A descrição do trabalho executado é obrigatória.',
            'descricao.max' => 'A descrição não pode exceder ' . self::MAX_DESCRICAO_LENGTH . ' caracteres.',
            'esforco_executado.required' => 'O esforço executado é obrigatório.',
            'esforco_executado.min' => 'O esforço executado não pode ser negativo.',
        ]);
    }
}
