<?php

declare(strict_types=1);

use App\V2\EnvioPlanoTrabalho\DTOs\EnvioPlanoTrabalhoIndexFiltersDTO;

uses(Tests\TestCase::class);

test('monta where vazio quando filtros vazios', function () {
    $dto = EnvioPlanoTrabalhoIndexFiltersDTO::fromArray([]);
    expect($dto->toWhereArray())->toBe([]);
});

test('monta numero unidade e status conhecidos', function () {
    $dto = EnvioPlanoTrabalhoIndexFiltersDTO::fromArray([
        'numero' => ' 12 ',
        'unidade_id' => '  uuid-1  ',
        'status' => 'Pendentes',
    ]);
    $where = $dto->toWhereArray();

    expect($where)->toContain(['numero', '12']);
    expect($where)->toContain(['unidade_id', 'uuid-1']);
    expect($where)->toContain(['isPendente', true]);
});

test('ignora status Todos', function () {
    $dto = EnvioPlanoTrabalhoIndexFiltersDTO::fromArray(['status' => 'Todos']);
    expect($dto->toWhereArray())->toBe([]);
});

test('monta intervalos de data e concluidos', function () {
    $dto = EnvioPlanoTrabalhoIndexFiltersDTO::fromArray([
        'alteracao_inicio' => '2025-01-01',
        'envio_fim' => '2025-12-31',
        'status' => 'Concluídos',
    ]);
    $where = $dto->toWhereArray();

    expect($where)->toContain(['updated_at_gte', '2025-01-01']);
    expect($where)->toContain(['data_envio_api_pgd_lte', '2025-12-31']);
    expect($where)->toContain(['isConcluido', true]);
});
