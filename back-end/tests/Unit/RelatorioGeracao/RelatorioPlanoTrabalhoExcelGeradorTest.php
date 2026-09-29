<?php

use App\Enums\RelatorioGeracaoTipo;
use App\Services\RelatorioGeracao\RelatorioPlanoEntregaExcelGerador;
use App\Services\RelatorioGeracao\RelatorioPlanoTrabalhoExcelGerador;
use App\Services\RelatorioPlanoEntregaService;
use App\Services\RelatorioPlanoTrabalhoService;

test('tipos de geração conhecidos expõem nome, arquivo e capacidade', function () {
    expect(RelatorioGeracaoTipo::PLANO_TRABALHO->nome())->toBe('Relatório de Planos de Trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->arquivoNome())->toBe('relatorio-planos-trabalho.xlsx')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->capacidade())->toBe('MOD_RELATORIO_PT')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->nome())->toContain('Períodos Avaliativos')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->nomeExibicao())->toBe('Planos de Trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->nomeExibicao())->toBe('Planos de Trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->grupo())->toBe('planos_trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->grupo())->toBe('planos_trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->capacidade())->toBe('MOD_RELATORIO_PT')
        ->and(RelatorioGeracaoTipo::PLANO_ENTREGA->nome())->toBe('Relatório de Planos de Entrega')
        ->and(RelatorioGeracaoTipo::PLANO_ENTREGA->nomeExibicao())->toBe('Planos de Entrega')
        ->and(RelatorioGeracaoTipo::PLANO_ENTREGA->grupo())->toBe('planos_entrega')
        ->and(RelatorioGeracaoTipo::PLANO_ENTREGA->arquivoNome())->toBe('relatorio-planos-entrega.xlsx')
        ->and(RelatorioGeracaoTipo::PLANO_ENTREGA->capacidade())->toBe('MOD_RELATORIO_PE');
});

test('gerador de PT consulta o serviço de exportação com página e limite', function () {
    $service = Mockery::mock(RelatorioPlanoTrabalhoService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(function (array $data) {
            return $data['page'] === 3
                && $data['limit'] === 1000
                && $data['where'] === [['unidade_id', '==', 'u1']]
                && $data['orderBy'] === [['participanteNome', 'asc']];
        }), null)
        ->andReturn([
            'count' => 1200,
            'rows' => collect([(object) ['id' => 'pt-1']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioPlanoTrabalhoExcelGerador($service);
    $result = $gerador->consultarPagina([
        'where' => [['unidade_id', '==', 'u1']],
        'orderBy' => [['participanteNome', 'asc']],
    ], 3, 1000);

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
    $gerador->consultarPagina(['where' => [], 'orderBy' => []], 1, 1000);
    $segunda = $gerador->consultarPagina(['where' => [], 'orderBy' => []], 2, 1000);

    expect($segunda['count'])->toBe(2500);
});

test('gerador de PE consulta o serviço de exportação com página e limite', function () {
    $service = Mockery::mock(RelatorioPlanoEntregaService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(function (array $data) {
            return $data['page'] === 2
                && $data['limit'] === 1000
                && $data['where'] === [['unidade_id', '==', 'u1']]
                && $data['orderBy'] === [['numero', 'asc']];
        }), null)
        ->andReturn([
            'count' => 800,
            'rows' => collect([(object) ['id' => 'pe-1']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioPlanoEntregaExcelGerador($service);
    $result = $gerador->consultarPagina([
        'where' => [['unidade_id', '==', 'u1']],
        'orderBy' => [['numero', 'asc']],
    ], 2, 1000);

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio-planos-entrega.xlsx')
        ->and($result['count'])->toBe(800)
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
    $gerador->consultarPagina(['where' => [], 'orderBy' => []], 1, 1000);
    $segunda = $gerador->consultarPagina(['where' => [], 'orderBy' => []], 2, 1000);

    expect($segunda['count'])->toBe(1500);
});
