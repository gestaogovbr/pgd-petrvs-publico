<?php

use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Services\RelatorioGeracao\RelatorioPlanoTrabalhoExcelGerador;
use App\Services\RelatorioPlanoTrabalhoService;

test('gerador de PT consulta o serviço de exportação com página e limite', function () {
    $consulta = new RelatorioExcelConsultaPaginaDTO(
        filters: ['unidade_id' => 'u1'],
        orderBy: [['participanteNome', 'asc']],
        page: 3,
        limit: 1000,
    );

    $service = Mockery::mock(RelatorioPlanoTrabalhoService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with($consulta->toQueryArray(), null)
        ->andReturn([
            'count' => 1200,
            'rows' => collect([(object) ['id' => 'pt-1']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioPlanoTrabalhoExcelGerador($service);
    $result = $gerador->consultarPagina($consulta);

    expect($gerador->pageSize())->toBe(1000)
        ->and($result['count'])->toBe(1200)
        ->and($result['rows'])->toHaveCount(1);
});

test('gerador de PT reutiliza o total já conhecido nas páginas seguintes', function () {
    $service = Mockery::mock(RelatorioPlanoTrabalhoService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(fn (array $data) => $data['page'] === 1), null)
        ->andReturn([
            'count' => 2500,
            'rows' => collect([(object) ['id' => 'pt-1']]),
            'extra' => null,
        ]);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(fn (array $data) => $data['page'] === 2), 2500)
        ->andReturn([
            'count' => 2500,
            'rows' => collect([(object) ['id' => 'pt-2']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioPlanoTrabalhoExcelGerador($service);
    $gerador->consultarPagina(new RelatorioExcelConsultaPaginaDTO(filters: [], orderBy: [], page: 1, limit: 1000));
    $segunda = $gerador->consultarPagina(new RelatorioExcelConsultaPaginaDTO(filters: [], orderBy: [], page: 2, limit: 1000));

    expect($segunda['count'])->toBe(2500);
});
