<?php

declare(strict_types=1);

use App\Repository\EnvioPlanoTrabalho\Contracts\EnvioPlanoTrabalhoReadRepositoryContract;
use App\Repository\EnvioPlanoTrabalhoRepository;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

test('EnvioPlanoTrabalhoRepository delega query ao read repository', function () {
    $data = ['where' => []];
    $result = ['count' => 0, 'rows' => collect()];

    $readRepository = Mockery::mock(EnvioPlanoTrabalhoReadRepositoryContract::class);
    $readRepository->shouldReceive('query')
        ->once()
        ->with($data)
        ->andReturn($result);

    $repository = new EnvioPlanoTrabalhoRepository($readRepository);

    expect($repository->query($data))->toBe($result);
});
