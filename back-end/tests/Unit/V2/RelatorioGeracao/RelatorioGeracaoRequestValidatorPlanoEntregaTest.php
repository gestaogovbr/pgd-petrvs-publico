<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoTipo;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStoreDTO;
use App\V2\RelatorioGeracao\Validators\RelatorioGeracaoRequestValidator;
use Illuminate\Http\Request;
use Tests\TestCase;

uses(TestCase::class);

test('store aceita tipo de plano de entrega e filtros', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'POST', [
        'tipo' => RelatorioGeracaoTipo::PLANO_ENTREGA->value,
        'where' => [['unidade_id', '==', 'u-1']],
        'orderBy' => [['numero', 'asc']],
    ]);

    $dto = RelatorioGeracaoRequestValidator::store($request);

    expect($dto)->toBeInstanceOf(RelatorioGeracaoStoreDTO::class)
        ->and($dto->tipo)->toBe(RelatorioGeracaoTipo::PLANO_ENTREGA)
        ->and($dto->where)->toBe([['unidade_id', '==', 'u-1']])
        ->and($dto->orderBy)->toBe([['numero', 'asc']])
        ->and($dto->toParametros())->toBe([
            'filters' => [],
            'where' => [['unidade_id', '==', 'u-1']],
            'orderBy' => [['numero', 'asc']],
        ]);
});

test('index normaliza tipo interno de PE para o grupo da listagem', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'filters' => ['tipo' => RelatorioGeracaoTipo::PLANO_ENTREGA->value],
    ]);

    $dto = RelatorioGeracaoRequestValidator::index($request);

    expect($dto->filters->tipo)->toBe('planos_entrega')
        ->and($dto->filters->tipos())->toBe([RelatorioGeracaoTipo::PLANO_ENTREGA->value]);
});
