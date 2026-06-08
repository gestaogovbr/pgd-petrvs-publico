<?php

declare(strict_types=1);

use App\Models\Usuario;
use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;
use App\Repository\Usuario\Contracts\UsuarioWriteRepositoryContract;
use App\Repository\UsuarioRepository;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

test('UsuarioRepository delega findByIdComAreasTrabalho ao read repository', function () {
    $usuario = new Usuario;

    $read = Mockery::mock(UsuarioReadRepositoryContract::class);
    $read->shouldReceive('findByIdComAreasTrabalho')->once()->with('user-uuid')->andReturn($usuario);

    $write = Mockery::mock(UsuarioWriteRepositoryContract::class);

    $repo = new UsuarioRepository($read, $write);

    expect($repo->findByIdComAreasTrabalho('user-uuid'))->toBe($usuario);
});
