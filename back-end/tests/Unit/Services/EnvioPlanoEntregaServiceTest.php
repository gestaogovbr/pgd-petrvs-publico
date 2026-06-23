<?php

declare(strict_types=1);

use App\Repository\EnvioPlanoEntregaRepository;
use App\Services\EnvioPlanoEntregaService;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

test('EnvioPlanoEntregaService delega query ao repository', function () {
    $payload = [
        'where' => [['numero', 'like', '%1%']],
        'page' => 1,
        'limit' => 10,
    ];

    $expected = [
        'count' => 1,
        'rows' => collect([(object) ['id' => 'pe-1']]),
    ];

    $repository = Mockery::mock(EnvioPlanoEntregaRepository::class);
    $repository->shouldReceive('query')
        ->once()
        ->with($payload)
        ->andReturn($expected);

    app()->instance(EnvioPlanoEntregaRepository::class, $repository);

    $service = app(EnvioPlanoEntregaService::class);

    expect($service->query($payload))->toBe($expected);
});
