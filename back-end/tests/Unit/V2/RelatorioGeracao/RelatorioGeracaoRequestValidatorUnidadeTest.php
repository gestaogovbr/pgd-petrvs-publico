<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoTipo;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStoreDTO;
use App\V2\RelatorioGeracao\Validators\RelatorioGeracaoRequestValidator;
use Illuminate\Http\Request;
use Tests\TestCase;

uses(TestCase::class);

test('store aceita tipo de unidades com filters', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'POST', [
        'tipo' => RelatorioGeracaoTipo::UNIDADE->value,
        'filters' => ['unidade_id' => 'u-1'],
        'orderBy' => [['sigla', 'asc']],
    ]);

    $dto = RelatorioGeracaoRequestValidator::store($request);

    expect($dto)->toBeInstanceOf(RelatorioGeracaoStoreDTO::class)
        ->and($dto->tipo)->toBe(RelatorioGeracaoTipo::UNIDADE)
        ->and($dto->filters)->toBe(['unidade_id' => 'u-1'])
        ->and($dto->orderBy)->toBe([['sigla', 'asc']]);
});

test('index normaliza tipo interno de Unidades para o grupo da listagem', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'filters' => ['tipo' => RelatorioGeracaoTipo::UNIDADE->value],
    ]);

    $dto = RelatorioGeracaoRequestValidator::index($request);

    expect($dto->filters->tipo)->toBe('unidades')
        ->and($dto->filters->tipos())->toBe([RelatorioGeracaoTipo::UNIDADE->value]);
});
