<?php

use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Services\RelatorioGeracao\RelatorioEntregaExcelGerador;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaQueryDTO;
use App\V2\RelatorioEntrega\RelatorioEntregaService;

test('gerador de Entregas reconstrói filtros tipados e consulta o serviço', function () {
    $service = Mockery::mock(RelatorioEntregaService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(function (RelatorioEntregaQueryDTO $query): bool {
            return $query->page === 1
                && $query->limit === 1000
                && $query->filters->unidadeId === 'u1'
                && $query->filters->incluirUnidadesSubordinadas === true
                && $query->filters->periodoInicio === '2026-01-01'
                && $query->filters->periodoFim === '2026-01-31'
                && $query->orderBy === [['entregaNome', 'asc']];
        }), null)
        ->andReturn([
            'count' => 120,
            'rows' => collect([(object) ['id' => 'ent-1']]),
        ]);

    $gerador = new RelatorioEntregaExcelGerador($service);
    $result = $gerador->consultarPagina(new RelatorioExcelConsultaPaginaDTO(
        where: [
            ['unidade_id', '==', 'u1'],
            ['incluir_unidades_subordinadas', '==', 1],
            ['periodo_inicio', '==', '2026-01-01'],
            ['periodo_fim', '==', '2026-01-31'],
        ],
        orderBy: [['entregaNome', 'asc']],
        page: 1,
        limit: 1000,
    ));

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio_entregas.xlsx')
        ->and($result['count'])->toBe(120)
        ->and($result['rows'])->toHaveCount(1);
});
