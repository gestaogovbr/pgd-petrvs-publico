<?php

namespace App\Contracts;

use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;

interface RelatorioExcelGeradorContract
{
    public function pageSize(): int;

    public function arquivoNome(): string;

    public function criarExport(): object;

    /**
     * @return array{count: int, rows: mixed, extra?: mixed}
     */
    public function consultarPagina(RelatorioExcelConsultaPaginaDTO $consulta): array;
}
