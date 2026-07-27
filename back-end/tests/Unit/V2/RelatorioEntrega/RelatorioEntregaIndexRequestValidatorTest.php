<?php

declare(strict_types=1);

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

    $validated = RelatorioEntregaIndexRequestValidator::index($request);

    expect($validated)->toBeArray()
        ->and($validated['filters']['unidade_id'] ?? null)->toBe('unidade-1');
});

test('aceita consulta com periodo completo', function () {
    $request = Request::create('/api/v2/relatorio-entrega', 'GET', [
        'filters' => [
            'periodo_inicio' => '2026-01-01',
            'periodo_fim' => '2026-01-31',
        ],
    ]);

    $validated = RelatorioEntregaIndexRequestValidator::index($request);

    expect($validated['filters']['periodo_inicio'])->toBe('2026-01-01')
        ->and($validated['filters']['periodo_fim'])->toBe('2026-01-31');
});

test('aceita filtro incluir unidades subordinadas quando informado', function () {
    $request = Request::create('/api/v2/relatorio-entrega', 'GET', [
        'filters' => [
            'unidade_id' => 'unidade-1',
            'incluir_unidades_subordinadas' => '1',
        ],
    ]);

    $validated = RelatorioEntregaIndexRequestValidator::index($request);

    expect($validated['filters'])->toHaveKey('incluir_unidades_subordinadas');
});

test('nao exige filtro incluir unidades subordinadas quando ausente', function () {
    $request = Request::create('/api/v2/relatorio-entrega', 'GET', [
        'filters' => [
            'unidade_id' => 'unidade-1',
        ],
    ]);

    $validated = RelatorioEntregaIndexRequestValidator::index($request);

    expect($validated['filters'])->not->toHaveKey('incluir_unidades_subordinadas');
});
