<?php

use App\Enums\RelatorioGeracaoTipo;
use App\Services\RelatorioGeracao\RelatorioAgenteExcelGerador;
use App\Services\RelatorioGeracao\RelatorioEntregaExcelGerador;
use App\Services\RelatorioGeracao\RelatorioPlanoEntregaExcelGerador;
use App\Services\RelatorioGeracao\RelatorioPlanoTrabalhoExcelGerador;
use App\Services\RelatorioGeracao\RelatorioUnidadeExcelGerador;
use App\Services\RelatorioAgenteService;
use App\Services\RelatorioPlanoEntregaService;
use App\Services\RelatorioPlanoTrabalhoService;
use App\Services\RelatorioUnidadeService;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaQueryDTO;
use App\V2\RelatorioEntrega\RelatorioEntregaService;

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
        ->and(RelatorioGeracaoTipo::PLANO_ENTREGA->capacidade())->toBe('MOD_RELATORIO_PE')
        ->and(RelatorioGeracaoTipo::AGENTE->nome())->toBe('Relatório de Agentes Públicos')
        ->and(RelatorioGeracaoTipo::AGENTE->nomeExibicao())->toBe('Agentes Públicos')
        ->and(RelatorioGeracaoTipo::AGENTE->grupo())->toBe('agentes')
        ->and(RelatorioGeracaoTipo::AGENTE->arquivoNome())->toBe('relatorio-agentes.xlsx')
        ->and(RelatorioGeracaoTipo::AGENTE->capacidade())->toBe('MOD_RELATORIO_USUARIO')
        ->and(RelatorioGeracaoTipo::UNIDADE->nome())->toBe('Relatório de Unidades')
        ->and(RelatorioGeracaoTipo::UNIDADE->nomeExibicao())->toBe('Unidades')
        ->and(RelatorioGeracaoTipo::UNIDADE->grupo())->toBe('unidades')
        ->and(RelatorioGeracaoTipo::UNIDADE->arquivoNome())->toBe('relatorio-unidades.xlsx')
        ->and(RelatorioGeracaoTipo::UNIDADE->capacidade())->toBe('MOD_RELATORIO_UNIDADE')
        ->and(RelatorioGeracaoTipo::ENTREGA->nome())->toBe('Relatório de Entregas')
        ->and(RelatorioGeracaoTipo::ENTREGA->nomeExibicao())->toBe('Entregas')
        ->and(RelatorioGeracaoTipo::ENTREGA->grupo())->toBe('entregas')
        ->and(RelatorioGeracaoTipo::ENTREGA->arquivoNome())->toBe('relatorio_entregas.xlsx')
        ->and(RelatorioGeracaoTipo::ENTREGA->capacidade())->toBe('MOD_RELATORIO_PE')
        ->and(RelatorioGeracaoTipo::ENTREGA->capacidades())->toBe(['MOD_RELATORIO_PE', 'MOD_RELATORIO_ENTREGA']);
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
    $result = $gerador->consultarPagina([
        'where' => [['unidade_id', '==', 'u1']],
        'orderBy' => [['nome', 'asc']],
    ], 1, 1000);

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio-agentes.xlsx')
        ->and($result['count'])->toBe(300)
        ->and($result['rows'])->toHaveCount(1);
});

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
    $result = $gerador->consultarPagina([
        'where' => [['unidade_id', '==', 'u1']],
        'orderBy' => [['sigla', 'asc']],
    ], 1, 1000);

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio-unidades.xlsx')
        ->and($result['count'])->toBe(50)
        ->and($result['rows'])->toHaveCount(1);
});

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
    $result = $gerador->consultarPagina([
        'where' => [
            ['unidade_id', '==', 'u1'],
            ['incluir_unidades_subordinadas', '==', 1],
            ['periodo_inicio', '==', '2026-01-01'],
            ['periodo_fim', '==', '2026-01-31'],
        ],
        'orderBy' => [['entregaNome', 'asc']],
    ], 1, 1000);

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio_entregas.xlsx')
        ->and($result['count'])->toBe(120)
        ->and($result['rows'])->toHaveCount(1);
});
