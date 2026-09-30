<?php

use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Services\RelatorioGeracao\RelatorioAgenteExcelGerador;
use App\Services\RelatorioAgenteService;

test('gerador de Agentes consulta o serviço de exportação com página e limite', function () {
    $service = Mockery::mock(RelatorioAgenteService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(function (array $data) {
            return $data['page'] === 1
                && $data['limit'] === 1000
                && $data['where'] === [['unidade_id', '==', 'u1']]
                && $data['orderBy'] === [['nome', 'asc']];
        }), null)
        ->andReturn([
            'count' => 300,
            'rows' => collect([(object) ['id' => 'ag-1']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioAgenteExcelGerador($service);
    $result = $gerador->consultarPagina(new RelatorioExcelConsultaPaginaDTO(
        where: [['unidade_id', '==', 'u1']],
        orderBy: [['nome', 'asc']],
        page: 1,
        limit: 1000,
    ));

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio-agentes.xlsx')
        ->and($result['count'])->toBe(300)
        ->and($result['rows'])->toHaveCount(1);
});
