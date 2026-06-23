<?php

declare(strict_types=1);

use App\V2\EnvioPlanoEntrega\DTOs\EnvioPlanoEntregaIndexFiltersDTO;

uses(Tests\TestCase::class);

test('monta where vazio quando filtros vazios', function () {
    $dto = EnvioPlanoEntregaIndexFiltersDTO::fromArray([]);
    expect($dto->toWhereArray())->toBe([]);
});

test('monta numero nome unidade e status pendentes', function () {
    $dto = EnvioPlanoEntregaIndexFiltersDTO::fromArray([
        'numero' => ' 10 ',
        'nome' => ' Alpha ',
        'unidade_id' => 'uuid-1',
        'status' => 'Pendentes',
    ]);
    $where = $dto->toWhereArray();

    expect($where)->toContain(['numero', 'like', '%10%']);
    expect($where)->toContain(['nome', 'like', '%Alpha%']);
    expect($where)->toContain(['unidade_id', '==', 'uuid-1']);
    expect($where)->toContain(['envios_pendentes', '==', 1]);
});

test('ignora status Todos', function () {
    $dto = EnvioPlanoEntregaIndexFiltersDTO::fromArray(['status' => 'Todos']);
    expect($dto->toWhereArray())->toBe([]);
});

test('monta datas e concluidos', function () {
    $dto = EnvioPlanoEntregaIndexFiltersDTO::fromArray([
        'alteracao_inicio' => '2025-01-01',
        'alteracao_fim' => '2025-01-31',
        'envio_fim' => '2025-12-31',
        'status' => 'Concluídos',
    ]);
    $where = $dto->toWhereArray();

    expect($where)->toContain(['updated_at', '>=', '2025-01-01']);
    expect($where)->toContain(['updated_at', '<', '2025-02-01']);
    expect($where)->toContain(['data_envio_api_pgd', '<', '2026-01-01']);
    expect($where)->toContain(['isConcluido', '==', true]);
});
