<?php

declare(strict_types=1);

use App\Models\Usuario;
use App\Repository\EnvioUsuario\Contracts\EnvioUsuarioReadRepositoryContract;
use App\Repository\EnvioUsuarioRepository;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

test('EnvioUsuarioRepository delega query ao read repository', function () {
    $requestUser = Mockery::mock(Usuario::class);
    $data = ['where' => []];
    $result = ['count' => 0, 'rows' => collect()];

    $readRepository = Mockery::mock(EnvioUsuarioReadRepositoryContract::class);
    $readRepository->shouldReceive('query')
        ->once()
        ->with($data, $requestUser)
        ->andReturn($result);

    $repository = new EnvioUsuarioRepository($readRepository);

    expect($repository->query($data, $requestUser))->toBe($result);
});
