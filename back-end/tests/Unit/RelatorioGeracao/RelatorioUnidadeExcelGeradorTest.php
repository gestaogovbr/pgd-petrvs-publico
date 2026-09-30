<?php

use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Services\RelatorioGeracao\RelatorioUnidadeExcelGerador;
use App\Services\RelatorioUnidadeService;

test('gerador de Unidades consulta o serviço de exportação com página e limite', function () {
    $service = Mockery::mock(RelatorioUnidadeService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(function (array $data) {
            return $data['page'] === 1
                && $data['limit'] === 1000
                && $data['where'] === [['unidade_id', '==', 'u1']]
                && $data['orderBy'] === [['sigla', 'asc']];
        }), null)
        ->andReturn([
            'count' => 50,
            'rows' => collect([(object) ['id' => 'un-1']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioUnidadeExcelGerador($service);
    $result = $gerador->consultarPagina(new RelatorioExcelConsultaPaginaDTO(
        where: [['unidade_id', '==', 'u1']],
        orderBy: [['sigla', 'asc']],
        page: 1,
        limit: 1000,
    ));

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio-unidades.xlsx')
        ->and($result['count'])->toBe(50)
        ->and($result['rows'])->toHaveCount(1);
});
