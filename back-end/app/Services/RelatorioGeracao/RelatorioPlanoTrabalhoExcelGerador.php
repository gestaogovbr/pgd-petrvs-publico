<?php

namespace App\Services\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\Enums\RelatorioGeracaoTipo;
use App\Exports\RelatorioPlanoTrabalhoExport;
use App\Services\RelatorioPlanoTrabalhoService;
use Illuminate\Support\Collection;

class RelatorioPlanoTrabalhoExcelGerador implements RelatorioExcelGeradorContract
{
    public const PAGE_SIZE = 1000;

    private ?int $totalCount = null;

    public function __construct(
        private RelatorioPlanoTrabalhoService $service
    ) {
    }

    public function pageSize(): int
    {
        return self::PAGE_SIZE;
    }

    public function arquivoNome(): string
    {
        return RelatorioGeracaoTipo::PLANO_TRABALHO->arquivoNome();
    }

    public function criarExport(): object
    {
        return new RelatorioPlanoTrabalhoExport(new Collection());
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
