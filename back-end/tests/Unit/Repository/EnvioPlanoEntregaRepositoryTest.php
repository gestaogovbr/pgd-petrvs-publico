<?php

declare(strict_types=1);

use App\Repository\EnvioPlanoEntrega\Contracts\EnvioPlanoEntregaReadRepositoryContract;
use App\Repository\EnvioPlanoEntregaRepository;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

test('EnvioPlanoEntregaRepository delega query ao read repository', function () {
    $data = ['where' => []];
    $result = ['count' => 0, 'rows' => collect()];

    $readRepository = Mockery::mock(EnvioPlanoEntregaReadRepositoryContract::class);
    $readRepository->shouldReceive('query')
        ->once()
        ->with($data)
        ->andReturn($result);

    $repository = new EnvioPlanoEntregaRepository($readRepository);

    expect($repository->query($data))->toBe($result);
});
