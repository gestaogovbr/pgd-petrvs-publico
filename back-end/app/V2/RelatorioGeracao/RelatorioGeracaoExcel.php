<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\Enums\RelatorioGeracaoTipo;
use App\Exports\RelatorioExcelPaginadoExport;
use App\Exports\RelatorioExcelPaginadoWriter;
use App\Models\RelatorioGeracao;
use App\Services\RelatorioGeracao\RelatorioExcelGeradorFactory;

class RelatorioGeracaoExcel
{
    public function __construct(
        private readonly RelatorioExcelGeradorFactory $geradorFactory,
        private readonly RelatorioExcelPaginadoWriter $excelWriter,
        private readonly RelatorioGeracaoStorage $storage,
    ) {
    }

    /**
     * @param callable(int $processadas, ?int $total): void $onProgress
     * @return array{path: string, nome: string}
     */
    public function gerar(RelatorioGeracao $geracao, callable $onProgress): array
    {
        $gerador = $this->resolverRelatorioGerador($geracao);
        $path = $this->storage->caminho((string) $geracao->id);

        $export = new RelatorioExcelPaginadoExport(
            $gerador->criarExport(),
            fn (int $page, int $limit): array => $gerador->consultarPagina($geracao->parametros ?? [], $page, $limit),
            $gerador->pageSize(),
            $onProgress,
        );

        $this->storage->garantirDiretorio();
        $this->excelWriter->store($export, $this->storage->caminhoAbsoluto($path));

        return [
            'path' => $path,
            'nome' => $gerador->arquivoNome(),
        ];
    }

    private function resolverRelatorioGerador(RelatorioGeracao $geracao): RelatorioExcelGeradorContract
    {
        $tipo = RelatorioGeracaoTipo::from((string) $geracao->tipo);

        return $this->geradorFactory->make($tipo);
    }
}
