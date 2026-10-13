<?php

use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Services\RelatorioGeracao\RelatorioLacunaPlanoTrabalhoExcelGerador;
use App\V2\Relatorio\LacunaPlanoTrabalho\LacunaPlanoTrabalhoService;

test('gerador de Lacunas de Plano de Trabalho consulta o serviço de exportação com página e limite', function () {
    $consulta = new RelatorioExcelConsultaPaginaDTO(
        filters: [
            'unidade_id' => 'u1',
            'periodo_inicio' => '2024-01-01',
            'periodo_fim' => '2024-01-31',
            'incluir_unidades_subordinadas' => true,
        ],
        orderBy: [],
        page: 1,
        limit: 1000,
    );

    $service = Mockery::mock(LacunaPlanoTrabalhoService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with($consulta->toQueryArray(), null)
        ->andReturn([
            'count' => 12,
            'rows' => collect([(object) ['id' => 'lacuna-1']]),
        ]);

    $gerador = new RelatorioLacunaPlanoTrabalhoExcelGerador($service);
    $result = $gerador->consultarPagina($consulta);

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio-lacunas-plano-trabalho.xlsx')
        ->and($result['count'])->toBe(12)
        ->and($result['rows'])->toHaveCount(1);
});
