<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoTipo;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStoreDTO;
use App\V2\RelatorioGeracao\Validators\RelatorioGeracaoRequestValidator;
use Illuminate\Http\Request;
use Tests\TestCase;

uses(TestCase::class);

test('store aceita tipo de lacunas de plano de trabalho com filters', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'POST', [
        'tipo' => RelatorioGeracaoTipo::LACUNA_PLANO_TRABALHO->value,
        'filters' => [
            'unidade_id' => 'u-1',
            'periodo_inicio' => '2026-01-01',
            'periodo_fim' => '2026-01-31',
        ],
        'orderBy' => [],
    ]);

    $dto = RelatorioGeracaoRequestValidator::store($request);

    expect($dto)->toBeInstanceOf(RelatorioGeracaoStoreDTO::class)
        ->and($dto->tipo)->toBe(RelatorioGeracaoTipo::LACUNA_PLANO_TRABALHO)
        ->and($dto->filters)->toBe([
            'unidade_id' => 'u-1',
            'periodo_inicio' => '2026-01-01',
            'periodo_fim' => '2026-01-31',
        ])
        ->and($dto->orderBy)->toBe([]);
});

test('index normaliza tipo interno de Lacunas para o grupo da listagem', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'filters' => ['tipo' => RelatorioGeracaoTipo::LACUNA_PLANO_TRABALHO->value],
    ]);

    $dto = RelatorioGeracaoRequestValidator::index($request);

    expect($dto->filters->tipo)->toBe('lacunas_plano_trabalho')
        ->and($dto->filters->tipos())->toBe([RelatorioGeracaoTipo::LACUNA_PLANO_TRABALHO->value]);
});
