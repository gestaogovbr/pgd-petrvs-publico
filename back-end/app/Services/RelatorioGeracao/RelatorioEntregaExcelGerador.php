<?php

declare(strict_types=1);

namespace App\Services\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Enums\RelatorioGeracaoTipo;
use App\Exports\RelatorioEntregaExport;
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
        $result = $this->service->queryForExport($consulta->toQueryArray(), $this->totalCount);

        $this->totalCount = (int) $result['count'];

        return $result;
    }
}
