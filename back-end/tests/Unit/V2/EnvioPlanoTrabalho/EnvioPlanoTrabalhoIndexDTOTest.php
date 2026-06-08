<?php

declare(strict_types=1);

use App\V2\EnvioPlanoTrabalho\DTOs\EnvioPlanoTrabalhoIndexDTO;

uses(Tests\TestCase::class);

test('fromValidatedRequest aplica defaults de paginação', function () {
    $dto = EnvioPlanoTrabalhoIndexDTO::fromValidatedRequest([]);

    expect($dto->page)->toBe(1);
    expect(EnvioPlanoTrabalhoIndexDTO::PAGE_SIZE)->toBe(50);
    expect($dto->filters->toWhereArray())->toBe([]);
});

test('fromValidatedRequest ignora size na request e usa PAGE_SIZE fixo', function () {
    $dto = EnvioPlanoTrabalhoIndexDTO::fromValidatedRequest([
        'page' => 2,
        'size' => 10,
        'filters' => ['numero' => '1'],
    ]);
    $payload = $dto->toEnvioPlanoTrabalhoQueryPayload();

    expect($dto->page)->toBe(2);
    expect($payload['page'])->toBe(2);
    expect($payload['limit'])->toBe(EnvioPlanoTrabalhoIndexDTO::PAGE_SIZE);
    expect($payload['where'])->toContain(['numero', '1']);
});
