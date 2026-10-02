<?php

namespace App\Contracts;

interface RelatorioExcelGeradorContract
{
    public function pageSize(): int;

    public function arquivoNome(): string;

    public function criarExport(): object;

    /**
     * @param array{where?: array, orderBy?: array} $parametros
     * @return array{count: int, rows: mixed, extra?: mixed}
     */
    public function consultarPagina(array $parametros, int $page, int $limit): array;
}
