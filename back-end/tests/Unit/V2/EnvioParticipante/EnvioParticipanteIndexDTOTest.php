<?php

declare(strict_types=1);

use App\V2\EnvioParticipante\DTOs\EnvioParticipanteIndexDTO;

uses(Tests\TestCase::class);

test('fromValidatedRequest aplica defaults de paginação', function () {
    $dto = EnvioParticipanteIndexDTO::fromValidatedRequest([]);

    expect($dto->page)->toBe(1);
    expect(EnvioParticipanteIndexDTO::PAGE_SIZE)->toBe(50);
    expect($dto->filters->toWhereArray())->toBe([]);
});

test('fromValidatedRequest ignora size na request e usa PAGE_SIZE fixo', function () {
    $dto = EnvioParticipanteIndexDTO::fromValidatedRequest([
        'page' => 2,
        'size' => 10,
        'filters' => ['cpf' => '1'],
    ]);
    $payload = $dto->toEnvioUsuarioQueryPayload();

    expect($dto->page)->toBe(2);
    expect($payload['page'])->toBe(2);
    expect($payload['limit'])->toBe(EnvioParticipanteIndexDTO::PAGE_SIZE);
    expect($payload['orderBy'])->toBe([['data_agendamento_envio', 'desc']]);
    expect($payload['where'])->toContain(['cpf', '1']);
});
