<?php

declare(strict_types=1);

use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;

test('fromParametros monta filters e orderBy padronizados', function () {
    $consulta = RelatorioExcelConsultaPaginaDTO::fromParametros([
        'filters' => [
            'unidade_id' => 'u-1',
            'incluir_unidades_subordinadas' => true,
            'nome' => 'Ana',
            'dataInicio' => '2026-01-01',
        ],
        'orderBy' => [['nome', 'asc']],
    ], 2, 500);

    expect($consulta->page)->toBe(2)
        ->and($consulta->limit)->toBe(500)
        ->and($consulta->orderBy)->toBe([['nome', 'asc']])
        ->and($consulta->filters)->toBe([
            'unidade_id' => 'u-1',
            'incluir_unidades_subordinadas' => true,
            'nome' => 'Ana',
            'dataInicio' => '2026-01-01',
        ]);
});

test('fromParametros ignora where legado e usa lista vazia sem filters', function () {
    $consulta = RelatorioExcelConsultaPaginaDTO::fromParametros([
        'where' => [['unidade_id', '==', 'u-legado']],
        'orderBy' => [],
    ], 1, 1000);

    expect($consulta->filters)->toBe([])
        ->and($consulta->orderBy)->toBe([]);
});

test('toQueryArray devolve apenas filters, orderBy e paginação', function () {
    $consulta = new RelatorioExcelConsultaPaginaDTO(
        filters: ['unidade_id' => 'u-1'],
        orderBy: [['nome', 'asc']],
        page: 3,
        limit: 100,
    );

    expect($consulta->toQueryArray())->toBe([
        'page' => 3,
        'limit' => 100,
        'filters' => ['unidade_id' => 'u-1'],
        'orderBy' => [['nome', 'asc']],
    ]);
});
