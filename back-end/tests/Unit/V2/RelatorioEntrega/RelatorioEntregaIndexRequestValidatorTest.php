<?php

declare(strict_types=1);

use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaIndexDTO;
use App\V2\RelatorioEntrega\Validators\RelatorioEntregaIndexRequestValidator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

uses(TestCase::class);

test('rejeita consulta com apenas periodo de inicio preenchido', function () {
    $request = Request::create('/api/v2/relatorio-entrega', 'GET', [
        'filters' => [
            'periodo_inicio' => '2026-01-01',
        ],
    ]);

    RelatorioEntregaIndexRequestValidator::index($request);
})->throws(
    ValidationException::class,
    'Para realizar a consulta por período, informe as datas de início e fim.',
);

test('rejeita consulta com apenas periodo de fim preenchido', function () {
    $request = Request::create('/api/v2/relatorio-entrega', 'GET', [
        'filters' => [
            'periodo_fim' => '2026-01-31',
        ],
    ]);

    RelatorioEntregaIndexRequestValidator::index($request);
})->throws(
    ValidationException::class,
    'Para realizar a consulta por período, informe as datas de início e fim.',
);

test('aceita consulta sem periodo informado', function () {
    $request = Request::create('/api/v2/relatorio-entrega', 'GET', [
        'filters' => [
            'unidade_id' => 'unidade-1',
        ],
    ]);

    $dto = RelatorioEntregaIndexRequestValidator::index($request);

    expect($dto)->toBeInstanceOf(RelatorioEntregaIndexDTO::class)
        ->and($dto->filters->unidadeId)->toBe('unidade-1')
        ->and($dto->filters->usaDataConsultaHoje())->toBeTrue();
});

test('aceita consulta com periodo completo', function () {
    $request = Request::create('/api/v2/relatorio-entrega', 'GET', [
        'filters' => [
            'periodo_inicio' => '2026-01-01',
            'periodo_fim' => '2026-01-31',
        ],
    ]);

    $dto = RelatorioEntregaIndexRequestValidator::index($request);

    expect($dto->filters->periodoInicio)->toBe('2026-01-01')
        ->and($dto->filters->periodoFim)->toBe('2026-01-31')
        ->and($dto->filters->hasPeriodoCompleto())->toBeTrue();
});

test('aceita filtro incluir unidades subordinadas quando informado', function () {
    $request = Request::create('/api/v2/relatorio-entrega', 'GET', [
        'filters' => [
            'unidade_id' => 'unidade-1',
            'incluir_unidades_subordinadas' => '1',
        ],
    ]);

    $dto = RelatorioEntregaIndexRequestValidator::index($request);

    expect($dto->filters->incluirUnidadesSubordinadas)->toBeTrue();
});

test('nao exige filtro incluir unidades subordinadas quando ausente', function () {
    $request = Request::create('/api/v2/relatorio-entrega', 'GET', [
        'filters' => [
            'unidade_id' => 'unidade-1',
        ],
    ]);

    $dto = RelatorioEntregaIndexRequestValidator::index($request);

    expect($dto->filters->incluirUnidadesSubordinadas)->toBeFalse();
});

test('monta query dto tipado para o repositorio', function () {
    $request = Request::create('/api/v2/relatorio-entrega', 'GET', [
        'page' => 2,
        'filters' => [
            'unidade_id' => 'unidade-1',
        ],
    ]);

    $index = RelatorioEntregaIndexRequestValidator::index($request);
    $query = $index->toQuery(true);

    expect($query->page)->toBe(2)
        ->and($query->limit)->toBe(RelatorioEntregaIndexDTO::PAGE_SIZE)
        ->and($query->filters->unidadeId)->toBe('unidade-1');
});
