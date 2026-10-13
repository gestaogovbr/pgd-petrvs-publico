<?php

use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Services\RelatorioGeracao\RelatorioEntregaExcelGerador;
use App\V2\RelatorioEntrega\RelatorioEntregaService;

test('gerador de Entregas consulta o serviço com parâmetros já montados', function () {
    $consulta = RelatorioExcelConsultaPaginaDTO::fromParametros([
        'filters' => [
            'unidade_id' => 'u1',
            'incluir_unidades_subordinadas' => true,
            'periodo_inicio' => '2026-01-01',
            'periodo_fim' => '2026-01-31',
        ],
        'orderBy' => [['entregaNome', 'asc']],
    ], 1, 1000);

    $service = Mockery::mock(RelatorioEntregaService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with($consulta->toQueryArray(), null)
        ->andReturn([
            'count' => 120,
            'rows' => collect([(object) ['id' => 'ent-1']]),
        ]);

    $gerador = new RelatorioEntregaExcelGerador($service);
    $result = $gerador->consultarPagina($consulta);

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio_entregas.xlsx')
        ->and($result['count'])->toBe(120)
        ->and($result['rows'])->toHaveCount(1)
        ->and($consulta->filters)->toBe([
            'unidade_id' => 'u1',
            'incluir_unidades_subordinadas' => true,
            'periodo_inicio' => '2026-01-01',
            'periodo_fim' => '2026-01-31',
        ]);
});
