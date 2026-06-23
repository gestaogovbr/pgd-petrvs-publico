<?php

declare(strict_types=1);

use App\V2\EnvioPlanoEntrega\DTOs\EnvioPlanoEntregaIndexDTO;

uses(Tests\TestCase::class);

test('fromValidatedRequest aplica defaults de paginação', function () {
    $dto = EnvioPlanoEntregaIndexDTO::fromValidatedRequest([]);

    expect($dto->page)->toBe(1);
    expect(EnvioPlanoEntregaIndexDTO::PAGE_SIZE)->toBe(50);
    expect($dto->filters->toWhereArray())->toBe([]);
});

test('fromValidatedRequest ignora size na request e usa PAGE_SIZE fixo', function () {
    $dto = EnvioPlanoEntregaIndexDTO::fromValidatedRequest([
        'page' => 2,
        'size' => 10,
        'filters' => ['nome' => 'x'],
    ]);
    $payload = $dto->toEnvioPlanoEntregaQueryPayload();

    expect($dto->page)->toBe(2);
    expect($payload['page'])->toBe(2);
    expect($payload['limit'])->toBe(EnvioPlanoEntregaIndexDTO::PAGE_SIZE);
    expect($payload['where'])->toContain(['nome', 'like', '%x%']);
});
