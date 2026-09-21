<?php

namespace App\Services\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\Enums\RelatorioGeracaoTipo;
use App\Exports\RelatorioPlanoTrabalhoDetalhadoExport;
use App\Services\RelatorioPlanoTrabalhoDetalhadoService;
use Illuminate\Support\Collection;

class RelatorioPlanoTrabalhoDetalhadoExcelGerador implements RelatorioExcelGeradorContract
{
    public const PAGE_SIZE = 1000;

    private ?int $totalCount = null;

    public function __construct(
        private RelatorioPlanoTrabalhoDetalhadoService $service
    ) {
    }

    public function pageSize(): int
    {
        return self::PAGE_SIZE;
    }

    public function arquivoNome(): string
    {
        return RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->arquivoNome();
    }

    public function criarExport(): object
    {
        return new RelatorioPlanoTrabalhoDetalhadoExport(new Collection());
    }

    public function consultarPagina(array $parametros, int $page, int $limit): array
    {
        $result = $this->service->queryForExport([
            'page' => $page,
            'limit' => $limit,
            'where' => $parametros['where'] ?? [],
            'orderBy' => $parametros['orderBy'] ?? [],
        ], $this->totalCount);

        $this->totalCount = (int) $result['count'];

        return $result;
    }
}
