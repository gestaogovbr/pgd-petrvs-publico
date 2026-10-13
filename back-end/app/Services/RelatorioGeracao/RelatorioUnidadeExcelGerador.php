<?php

declare(strict_types=1);

namespace App\Services\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Enums\RelatorioGeracaoTipo;
use App\Exports\RelatorioUnidadeExport;
use App\Services\RelatorioUnidadeService;
use Illuminate\Support\Collection;

class RelatorioUnidadeExcelGerador implements RelatorioExcelGeradorContract
{
    public const PAGE_SIZE = 1000;

    private ?int $totalCount = null;

    public function __construct(
        private RelatorioUnidadeService $service
    ) {
    }

    public function pageSize(): int
    {
        return self::PAGE_SIZE;
    }

    public function arquivoNome(): string
    {
        return RelatorioGeracaoTipo::UNIDADE->arquivoNome();
    }

    public function criarExport(): object
    {
        return new RelatorioUnidadeExport(new Collection());
    }

    public function consultarPagina(RelatorioExcelConsultaPaginaDTO $consulta): array
    {
        $result = $this->service->queryForExport($consulta->toQueryArray(), $this->totalCount);

        $this->totalCount = (int) $result['count'];

        return $result;
    }
}
