<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoTipo;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStoreDTO;
use App\V2\RelatorioGeracao\Validators\RelatorioGeracaoRequestValidator;
use Illuminate\Http\Request;
use Tests\TestCase;

uses(TestCase::class);

test('store aceita tipo de entregas com filters', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'POST', [
        'tipo' => RelatorioGeracaoTipo::ENTREGA->value,
        'filters' => [
            'unidade_id' => 'u-1',
            'periodo_inicio' => '2026-01-01',
            'periodo_fim' => '2026-01-31',
        ],
        'orderBy' => [['entregaNome', 'asc']],
    ]);

    $dto = RelatorioGeracaoRequestValidator::store($request);

    expect($dto)->toBeInstanceOf(RelatorioGeracaoStoreDTO::class)
        ->and($dto->tipo)->toBe(RelatorioGeracaoTipo::ENTREGA)
        ->and($dto->filters)->toBe([
            'unidade_id' => 'u-1',
            'periodo_inicio' => '2026-01-01',
            'periodo_fim' => '2026-01-31',
        ])
        ->and($dto->orderBy)->toBe([['entregaNome', 'asc']]);
});

test('index normaliza tipo interno de Entregas para o grupo da listagem', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'filters' => ['tipo' => RelatorioGeracaoTipo::ENTREGA->value],
    ]);

    $dto = RelatorioGeracaoRequestValidator::index($request);

    expect($dto->filters->tipo)->toBe('entregas')
        ->and($dto->filters->tipos())->toBe([RelatorioGeracaoTipo::ENTREGA->value]);
});
