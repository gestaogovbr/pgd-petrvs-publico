<?php

declare(strict_types=1);

namespace App\Services\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Enums\RelatorioGeracaoTipo;
use App\Exports\RelatorioPlanoEntregaExport;
use App\Services\RelatorioPlanoEntregaService;
use Illuminate\Support\Collection;

class RelatorioPlanoEntregaExcelGerador implements RelatorioExcelGeradorContract
{
    public const PAGE_SIZE = 1000;

    private ?int $totalCount = null;

    public function __construct(
        private RelatorioPlanoEntregaService $service
    ) {
    }

    public function pageSize(): int
    {
        return self::PAGE_SIZE;
    }

    public function arquivoNome(): string
    {
        return RelatorioGeracaoTipo::PLANO_ENTREGA->arquivoNome();
    }

    public function criarExport(): object
    {
        return new RelatorioPlanoEntregaExport(new Collection());
    }

    public function consultarPagina(RelatorioExcelConsultaPaginaDTO $consulta): array
    {
        $result = $this->service->queryForExport($consulta->toQueryArray(), $this->totalCount);

        $this->totalCount = (int) $result['count'];

        return $result;
    }
}
