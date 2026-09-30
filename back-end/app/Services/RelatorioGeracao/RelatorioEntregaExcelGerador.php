<?php

namespace App\Services\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Enums\RelatorioGeracaoTipo;
use App\Exports\RelatorioEntregaExport;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaIndexFiltersDTO;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaQueryDTO;
use App\V2\RelatorioEntrega\RelatorioEntregaService;
use Illuminate\Support\Collection;

class RelatorioEntregaExcelGerador implements RelatorioExcelGeradorContract
{
    public const PAGE_SIZE = 1000;

    private ?int $totalCount = null;

    public function __construct(
        private RelatorioEntregaService $service
    ) {
    }

    public function pageSize(): int
    {
        return self::PAGE_SIZE;
    }

    public function arquivoNome(): string
    {
        return RelatorioGeracaoTipo::ENTREGA->arquivoNome();
    }

    public function criarExport(): object
    {
        return new RelatorioEntregaExport(new Collection());
    }

    public function consultarPagina(RelatorioExcelConsultaPaginaDTO $consulta): array
    {
        $result = $this->service->queryForExport(
            $this->consultaParaQuery($consulta),
            $this->totalCount,
        );

        $this->totalCount = (int) $result['count'];

        return $result;
    }

    private function consultaParaQuery(RelatorioExcelConsultaPaginaDTO $consulta): RelatorioEntregaQueryDTO
    {
        $filters = [];
        foreach ($consulta->where as $condition) {
            if (! is_array($condition) || ! isset($condition[0])) {
                continue;
            }

            $field = (string) $condition[0];
            $value = $condition[2] ?? null;

            match ($field) {
                'unidade_id' => $filters['unidade_id'] = $value,
                'incluir_unidades_subordinadas' => $filters['incluir_unidades_subordinadas'] = true,
                'periodo_inicio' => $filters['periodo_inicio'] = $value,
                'periodo_fim' => $filters['periodo_fim'] = $value,
                default => null,
            };
        }

        $orderBy = $consulta->orderBy;
        if ($orderBy === []) {
            $orderBy = [['unidadeHierarquia', 'asc'], ['entregaNome', 'asc']];
        }

        return new RelatorioEntregaQueryDTO(
            page: $consulta->page,
            limit: $consulta->limit,
            filters: RelatorioEntregaIndexFiltersDTO::fromArray($filters),
            orderBy: $orderBy,
        );
    }
}
