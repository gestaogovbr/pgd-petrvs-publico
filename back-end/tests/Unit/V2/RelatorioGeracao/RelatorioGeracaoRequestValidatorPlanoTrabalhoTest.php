<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoTipo;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStoreDTO;
use App\V2\RelatorioGeracao\Validators\RelatorioGeracaoRequestValidator;
use Illuminate\Http\Request;
use Tests\TestCase;

uses(TestCase::class);

test('store aceita tipo de plano de trabalho com filters', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'POST', [
        'tipo' => RelatorioGeracaoTipo::PLANO_TRABALHO->value,
        'filters' => ['unidade_id' => 'u-1'],
        'orderBy' => [['numero', 'asc']],
    ]);

    $dto = RelatorioGeracaoRequestValidator::store($request);

    expect($dto)->toBeInstanceOf(RelatorioGeracaoStoreDTO::class)
        ->and($dto->tipo)->toBe(RelatorioGeracaoTipo::PLANO_TRABALHO)
        ->and($dto->filters)->toBe(['unidade_id' => 'u-1'])
        ->and($dto->orderBy)->toBe([['numero', 'asc']]);
});

test('index normaliza tipo interno de PT para o grupo da listagem', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'filters' => ['tipo' => RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->value],
    ]);

    $dto = RelatorioGeracaoRequestValidator::index($request);

    expect($dto->filters->tipo)->toBe('planos_trabalho')
        ->and($dto->filters->tipos())->toContain(RelatorioGeracaoTipo::PLANO_TRABALHO->value)
        ->and($dto->filters->tipos())->toContain(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->value);
});
