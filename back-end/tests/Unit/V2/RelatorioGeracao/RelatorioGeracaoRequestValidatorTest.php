<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoTipo;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoIndexDTO;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStoreDTO;
use App\V2\RelatorioGeracao\Validators\RelatorioGeracaoRequestValidator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

uses(TestCase::class);

test('index usa ordenação padrão quando query vem vazia', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET');

    $dto = RelatorioGeracaoRequestValidator::index($request);

    expect($dto)->toBeInstanceOf(RelatorioGeracaoIndexDTO::class)
        ->and($dto->page)->toBe(1)
        ->and($dto->orderBy)->toBe(RelatorioGeracaoIndexDTO::DEFAULT_ORDER_BY)
        ->and($dto->orderDir)->toBe(RelatorioGeracaoIndexDTO::DEFAULT_ORDER_DIR)
        ->and($dto->filters->tipo)->toBeNull()
        ->and($dto->filters->status)->toBeNull()
        ->and($dto->filters->geracaoInicio)->toBeNull()
        ->and($dto->filters->geracaoFim)->toBeNull();
});

test('index aceita pagina e ordenação válidas', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'page' => 3,
        'order_by' => 'nome',
        'order_dir' => 'asc',
    ]);

    $dto = RelatorioGeracaoRequestValidator::index($request);

    expect($dto->page)->toBe(3)
        ->and($dto->orderBy)->toBe('nome')
        ->and($dto->orderDir)->toBe('asc');
});

test('index aceita filtros de relatório, período e status', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'filters' => [
            'tipo' => 'planos_trabalho',
            'status' => 'CONCLUIDA',
            'geracao_inicio' => '2026-09-01',
            'geracao_fim' => '2026-09-14',
        ],
    ]);

    $dto = RelatorioGeracaoRequestValidator::index($request);

    expect($dto->filters->tipo)->toBe('planos_trabalho')
        ->and($dto->filters->tipos())->toBe([
            RelatorioGeracaoTipo::PLANO_TRABALHO->value,
            RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->value,
        ])
        ->and($dto->filters->status)->toBe('CONCLUIDA')
        ->and($dto->filters->geracaoInicio)->toBe('2026-09-01')
        ->and($dto->filters->geracaoFim)->toBe('2026-09-14');
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

test('index rejeita tipo de relatório inválido', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'filters' => ['tipo' => 'inexistente'],
    ]);

    RelatorioGeracaoRequestValidator::index($request);
})->throws(ValidationException::class);

test('index rejeita status inválido', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'filters' => ['status' => 'PENDENTE'],
    ]);

    RelatorioGeracaoRequestValidator::index($request);
})->throws(ValidationException::class);

test('index rejeita data de fim anterior à de início', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'filters' => [
            'geracao_inicio' => '2026-09-14',
            'geracao_fim' => '2026-09-01',
        ],
    ]);

    RelatorioGeracaoRequestValidator::index($request);
})->throws(ValidationException::class);

test('index rejeita coluna de ordenação inválida', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'GET', [
        'order_by' => 'arquivo_path',
    ]);

    RelatorioGeracaoRequestValidator::index($request);
})->throws(ValidationException::class);

test('store rejeita tipo inválido', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'POST', [
        'tipo' => 'inexistente',
    ]);

    RelatorioGeracaoRequestValidator::store($request);
})->throws(ValidationException::class);

test('store aceita tipo de plano de trabalho e filtros', function () {
    $request = Request::create('/api/v2/relatorio-exportacao', 'POST', [
        'tipo' => RelatorioGeracaoTipo::PLANO_TRABALHO->value,
        'where' => [['unidade_id', '==', 'u-1']],
        'orderBy' => [['numero', 'asc']],
    ]);

    $dto = RelatorioGeracaoRequestValidator::store($request);

    expect($dto)->toBeInstanceOf(RelatorioGeracaoStoreDTO::class)
        ->and($dto->tipo)->toBe(RelatorioGeracaoTipo::PLANO_TRABALHO)
        ->and($dto->where)->toBe([['unidade_id', '==', 'u-1']])
        ->and($dto->orderBy)->toBe([['numero', 'asc']])
        ->and($dto->toParametros())->toBe([
            'where' => [['unidade_id', '==', 'u-1']],
            'orderBy' => [['numero', 'asc']],
        ]);
});

test('status rejeita lista de ids vazia', function () {
    $request = Request::create('/api/v2/relatorio-exportacao/status', 'GET', [
        'ids' => [],
    ]);

    RelatorioGeracaoRequestValidator::status($request);
})->throws(ValidationException::class);

test('status rejeita id que não é uuid', function () {
    $request = Request::create('/api/v2/relatorio-exportacao/status', 'GET', [
        'ids' => ['geracao-1'],
    ]);

    RelatorioGeracaoRequestValidator::status($request);
})->throws(ValidationException::class);

test('status aceita uuids e remove duplicatas', function () {
    $id = '550e8400-e29b-41d4-a716-446655440000';
    $request = Request::create('/api/v2/relatorio-exportacao/status', 'GET', [
        'ids' => [$id, $id],
    ]);

    $dto = RelatorioGeracaoRequestValidator::status($request);

    expect($dto->ids)->toBe([$id]);
});
