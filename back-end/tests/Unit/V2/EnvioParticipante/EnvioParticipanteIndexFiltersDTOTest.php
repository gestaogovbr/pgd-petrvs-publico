<?php

declare(strict_types=1);

use App\V2\EnvioParticipante\DTOs\EnvioParticipanteIndexFiltersDTO;

uses(Tests\TestCase::class);

test('monta where vazio quando filtros vazios', function () {
    $dto = EnvioParticipanteIndexFiltersDTO::fromArray([]);
    expect($dto->toWhereArray())->toBe([]);
});

test('monta cpf nome e status conhecidos', function () {
    $dto = EnvioParticipanteIndexFiltersDTO::fromArray([
        'cpf' => ' 123 ',
        'nome' => ' Maria ',
        'status' => 'Pendentes',
    ]);
    $where = $dto->toWhereArray();

    expect($where)->toContain(['cpf', '123']);
    expect($where)->toContain(['nome', 'Maria']);
    expect($where)->toContain(['isPendente', true]);
});

test('ignora status Todos', function () {
    $dto = EnvioParticipanteIndexFiltersDTO::fromArray(['status' => 'Todos']);
    expect($dto->toWhereArray())->toBe([]);
});

test('monta intervalos de data', function () {
    $dto = EnvioParticipanteIndexFiltersDTO::fromArray([
        'agendamento_inicio' => '2025-01-01',
        'envio_fim' => '2025-12-31',
    ]);
    $where = $dto->toWhereArray();

    expect($where)->toContain(['data_agendamento_envio_gte', '2025-01-01']);
    expect($where)->toContain(['data_envio_api_pgd_lte', '2025-12-31']);
});
