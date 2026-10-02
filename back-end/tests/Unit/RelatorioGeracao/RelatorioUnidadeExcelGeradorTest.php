<?php

use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Services\RelatorioGeracao\RelatorioUnidadeExcelGerador;
use App\Services\RelatorioUnidadeService;

test('gerador de Unidades consulta o serviço de exportação com página e limite', function () {
    $consulta = new RelatorioExcelConsultaPaginaDTO(
        filters: ['unidade_id' => 'u1'],
        orderBy: [['sigla', 'asc']],
        page: 1,
        limit: 1000,
    );

    $service = Mockery::mock(RelatorioUnidadeService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with($consulta->toQueryArray(), null)
        ->andReturn([
            'count' => 50,
            'rows' => collect([(object) ['id' => 'un-1']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioUnidadeExcelGerador($service);
    $result = $gerador->consultarPagina($consulta);

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio-unidades.xlsx')
        ->and($result['count'])->toBe(50)
        ->and($result['rows'])->toHaveCount(1);
});
