<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
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
        $parametros = $this->resolverParametrosConsulta($geracao);

        $export = new RelatorioExcelPaginadoExport(
            $gerador->criarExport(),
            fn (int $page, int $limit): array => $gerador->consultarPagina(
                RelatorioExcelConsultaPaginaDTO::fromParametros($parametros, $page, $limit)
            ),
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

    /**
     * @return array{filters: array<string, mixed>, orderBy: array<int, mixed>}
     */
    private function resolverParametrosConsulta(RelatorioGeracao $geracao): array
    {
        $parametros = is_array($geracao->parametros) ? $geracao->parametros : [];

        return [
            'filters' => is_array($parametros['filters'] ?? null) ? $parametros['filters'] : [],
            'orderBy' => is_array($parametros['orderBy'] ?? null) ? $parametros['orderBy'] : [],
        ];
    }

    private function resolverRelatorioGerador(RelatorioGeracao $geracao): RelatorioExcelGeradorContract
    {
        $tipo = RelatorioGeracaoTipo::from((string) $geracao->tipo);

        return $this->geradorFactory->make($tipo, $geracao);
    }
}
