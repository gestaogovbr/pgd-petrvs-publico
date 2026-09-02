<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega\Validators;

use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaIndexDTO;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RelatorioEntregaIndexRequestValidator
{
    /** @var list<string> */
    private const SORTABLE_COLUMNS = [
        'unidadeHierarquia',
        'demandanteHierarquia',
        'destinatario',
        'entregaNome',
        'data_inicio',
        'data_fim',
        'meta_planejado',
        'meta_alcancado',
        'meta_tipo',
        'meta_percentual',
        'qtd_planejamento_institucional',
        'qtd_cadeia_valor',
        'qtd_outras_entregas',
        'situacao',
        'plano_nome',
        'plano_rotulo',
        'plano_numero',
        'plano_status',
        'qtd_participantes',
        'qtd_planos_trabalho',
    ];

    public static function index(Request $request): RelatorioEntregaIndexDTO
    {
        $validated = $request->validate([
            'page' => ['sometimes', 'integer', 'min:1'],
            'order_by' => ['sometimes', 'nullable', 'string', 'in:'.implode(',', self::SORTABLE_COLUMNS)],
            'order_dir' => ['sometimes', 'nullable', 'in:asc,desc'],
            'filters' => ['sometimes', 'array'],
            'filters.unidade_id' => ['sometimes', 'nullable', 'string', 'max:36'],
            'filters.incluir_unidades_subordinadas' => ['sometimes'],
            'filters.periodo_inicio' => ['sometimes', 'nullable', 'date'],
            'filters.periodo_fim' => ['sometimes', 'nullable', 'date'],
        ]);

        $dto = RelatorioEntregaIndexDTO::fromValidatedRequest($validated);
        self::validatePeriodo($dto);

        return $dto;
    }

    private static function validatePeriodo(RelatorioEntregaIndexDTO $dto): void
    {
        $filters = $dto->filters;

        if ($filters->hasPeriodoParcial()) {
            throw ValidationException::withMessages([
                'filters.periodo_inicio' => 'Para realizar a consulta por período, informe as datas de início e fim.',
            ]);
        }

        if ($filters->hasPeriodoCompleto() && $filters->periodoFim < $filters->periodoInicio) {
            throw ValidationException::withMessages([
                'filters.periodo_fim' => 'A data de fim não pode ser anterior à data de início.',
            ]);
        }
    }
}
