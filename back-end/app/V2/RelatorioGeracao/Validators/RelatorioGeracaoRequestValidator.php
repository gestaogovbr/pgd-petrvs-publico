<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao\Validators;

use App\Enums\RelatorioGeracaoStatus;
use App\Enums\RelatorioGeracaoTipo;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoIndexDTO;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStatusQueryDTO;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStoreDTO;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class RelatorioGeracaoRequestValidator
{
    public static function index(Request $request): RelatorioGeracaoIndexDTO
    {
        $validated = $request->validate([
            'page' => ['sometimes', 'integer', 'min:1'],
            'order_by' => ['sometimes', 'nullable', 'string', Rule::in(RelatorioGeracaoIndexDTO::SORTABLE_COLUMNS)],
            'order_dir' => ['sometimes', 'nullable', 'in:asc,desc'],
            'filters' => ['sometimes', 'array'],
            'filters.tipo' => ['sometimes', 'nullable', 'string', Rule::in(self::filtroTipoValues())],
            'filters.status' => ['sometimes', 'nullable', 'string', Rule::in(RelatorioGeracaoStatus::values())],
            'filters.geracao_inicio' => ['sometimes', 'nullable', 'date'],
            'filters.geracao_fim' => ['sometimes', 'nullable', 'date'],
        ]);

        $dto = RelatorioGeracaoIndexDTO::fromValidatedRequest($validated);
        self::validatePeriodo($dto);

        return $dto;
    }

    public static function store(Request $request): RelatorioGeracaoStoreDTO
    {
        $validated = $request->validate([
            'tipo' => ['required', 'string', Rule::in(self::tipoValues())],
            'where' => ['sometimes', 'array'],
            'orderBy' => ['sometimes', 'array'],
        ]);

        return RelatorioGeracaoStoreDTO::fromValidatedRequest($validated);
    }

    public static function status(Request $request): RelatorioGeracaoStatusQueryDTO
    {
        $validated = $request->validate([
            'ids' => ['required', 'array', 'min:1', 'max:'.RelatorioGeracaoIndexDTO::PAGE_SIZE],
            'ids.*' => ['required', 'uuid'],
        ]);

        return RelatorioGeracaoStatusQueryDTO::fromValidatedRequest($validated);
    }

    /**
     * @return list<string>
     */
    private static function tipoValues(): array
    {
        return array_map(
            static fn (RelatorioGeracaoTipo $tipo): string => $tipo->value,
            RelatorioGeracaoTipo::cases(),
        );
    }

    /**
     * @return list<string>
     */
    private static function filtroTipoValues(): array
    {
        return array_values(array_unique(array_merge(
            RelatorioGeracaoTipo::grupos(),
            self::tipoValues(),
        )));
    }

    private static function validatePeriodo(RelatorioGeracaoIndexDTO $dto): void
    {
        $filters = $dto->filters;

        if (
            $filters->hasPeriodoCompleto()
            && $filters->geracaoFim < $filters->geracaoInicio
        ) {
            throw ValidationException::withMessages([
                'filters.geracao_fim' => 'A data de fim não pode ser anterior à data de início.',
            ]);
        }
    }
}
