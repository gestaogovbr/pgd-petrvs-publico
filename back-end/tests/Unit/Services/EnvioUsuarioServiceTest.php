<?php

declare(strict_types=1);

use App\Models\Usuario;
use App\Repository\EnvioUsuarioRepository;
use App\Services\EnvioUsuarioService;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

test('EnvioUsuarioService delega query ao repository', function () {
    $requestUser = Mockery::mock(Usuario::class);

    $payload = [
        'where' => [['cpf', 'like', '%1%']],
        'page' => 1,
        'limit' => 10,
    ];

    $expected = [
        'count' => 1,
        'rows' => collect([(object) ['id' => 'u-1']]),
    ];

    $repository = Mockery::mock(EnvioUsuarioRepository::class);
    $repository->shouldReceive('query')
        ->once()
        ->with($payload, $requestUser)
        ->andReturn($expected);

    app()->instance(EnvioUsuarioRepository::class, $repository);

    $service = app(EnvioUsuarioService::class);

    expect($service->queryForEnvioList($payload, $requestUser))->toBe($expected);
});
