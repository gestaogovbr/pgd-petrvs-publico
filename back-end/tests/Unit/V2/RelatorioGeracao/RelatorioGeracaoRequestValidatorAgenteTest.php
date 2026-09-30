<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoTipo;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStoreDTO;
use App\V2\RelatorioGeracao\Validators\RelatorioGeracaoRequestValidator;
use Illuminate\Http\Request;
use Tests\TestCase;

uses(TestCase::class);

test('store aceita tipo de agentes públicos e filtros tipados', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'POST', [
        'tipo' => RelatorioGeracaoTipo::AGENTE->value,
        'filters' => [
            'unidade_id' => 'u-1',
            'nome' => 'Ana',
        ],
        'orderBy' => [['nome', 'asc']],
    ]);

    $dto = RelatorioGeracaoRequestValidator::store($request);

    expect($dto)->toBeInstanceOf(RelatorioGeracaoStoreDTO::class)
        ->and($dto->tipo)->toBe(RelatorioGeracaoTipo::AGENTE)
        ->and($dto->filters)->toBe([
            'unidade_id' => 'u-1',
            'nome' => 'Ana',
        ])
        ->and($dto->orderBy)->toBe([['nome', 'asc']]);
});

test('index normaliza tipo interno de Agentes para o grupo da listagem', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'filters' => ['tipo' => RelatorioGeracaoTipo::AGENTE->value],
    ]);

    $dto = RelatorioGeracaoRequestValidator::index($request);

    expect($dto->filters->tipo)->toBe('agentes')
        ->and($dto->filters->tipos())->toBe([RelatorioGeracaoTipo::AGENTE->value]);
});
