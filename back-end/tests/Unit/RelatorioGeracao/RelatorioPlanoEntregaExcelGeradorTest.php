<?php

use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Services\RelatorioGeracao\RelatorioPlanoEntregaExcelGerador;
use App\Services\RelatorioPlanoEntregaService;

test('gerador de PE consulta o serviço de exportação com página e limite', function () {
    $consulta = new RelatorioExcelConsultaPaginaDTO(
        filters: ['unidade_id' => 'u1'],
        orderBy: [['numero', 'asc']],
        page: 1,
        limit: 1000,
    );

    $service = Mockery::mock(RelatorioPlanoEntregaService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with($consulta->toQueryArray(), null)
        ->andReturn([
            'count' => 10,
            'rows' => collect([(object) ['id' => 'pe-1']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioPlanoEntregaExcelGerador($service);
    $result = $gerador->consultarPagina($consulta);

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio-planos-entrega.xlsx')
        ->and($result['count'])->toBe(10)
        ->and($result['rows'])->toHaveCount(1);
});

test('gerador de PE reutiliza o total já conhecido nas páginas seguintes', function () {
    $service = Mockery::mock(RelatorioPlanoEntregaService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(fn (array $data) => $data['page'] === 1), null)
        ->andReturn([
            'count' => 1500,
            'rows' => collect([(object) ['id' => 'pe-1']]),
            'extra' => null,
        ]);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(fn (array $data) => $data['page'] === 2), 1500)
        ->andReturn([
            'count' => 1500,
            'rows' => collect([(object) ['id' => 'pe-2']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioPlanoEntregaExcelGerador($service);
    $gerador->consultarPagina(new RelatorioExcelConsultaPaginaDTO(filters: [], orderBy: [], page: 1, limit: 1000));
    $segunda = $gerador->consultarPagina(new RelatorioExcelConsultaPaginaDTO(filters: [], orderBy: [], page: 2, limit: 1000));

    expect($segunda['count'])->toBe(1500);
});
