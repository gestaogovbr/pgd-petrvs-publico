<?php

declare(strict_types=1);

use App\Repository\EnvioPlanoTrabalhoRepository;
use App\Services\EnvioPlanoTrabalhoService;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

test('EnvioPlanoTrabalhoService delega query ao repository', function () {
    $payload = [
        'where' => [['numero', 'like', '%1%']],
        'page' => 1,
        'limit' => 10,
    ];

    $expected = [
        'count' => 1,
        'rows' => collect([(object) ['id' => 'pt-1']]),
    ];

    $repository = Mockery::mock(EnvioPlanoTrabalhoRepository::class);
    $repository->shouldReceive('query')
        ->once()
        ->with($payload)
        ->andReturn($expected);

    app()->instance(EnvioPlanoTrabalhoRepository::class, $repository);

    $service = app(EnvioPlanoTrabalhoService::class);

    expect($service->query($payload))->toBe($expected);
});
