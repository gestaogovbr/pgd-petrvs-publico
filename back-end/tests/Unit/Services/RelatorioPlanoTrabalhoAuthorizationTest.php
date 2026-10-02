<?php

declare(strict_types=1);

use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Services\RelatorioPlanoTrabalhoAuthorization;
use App\Support\AuthenticatedUsuario;

beforeEach(function () {
    $this->authorization = new RelatorioPlanoTrabalhoAuthorization();
});

afterEach(function () {
    Mockery::close();
});

test('usuarioAutorizado devolve o usuário com capacidade MOD_RELATORIO_PT', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with(RelatorioPlanoTrabalhoAuthorization::CAPACIDADE)
        ->andReturn(true);

    Mockery::mock('alias:' . AuthenticatedUsuario::class)
        ->shouldReceive('withAreasDeTrabalho')
        ->once()
        ->andReturn($usuario);

    expect($this->authorization->usuarioAutorizado())->toBe($usuario);
});

test('usuarioAutorizado lança quando não há usuário autenticado', function () {
    Mockery::mock('alias:' . AuthenticatedUsuario::class)
        ->shouldReceive('withAreasDeTrabalho')
        ->once()
        ->andReturn(null);

    expect(fn () => $this->authorization->usuarioAutorizado())
        ->toThrow(ServerException::class, RelatorioPlanoTrabalhoAuthorization::MSG_ACESSO_NEGADO);
});

test('assertPodeConsultar libera usuário com capacidade MOD_RELATORIO_PT', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with(RelatorioPlanoTrabalhoAuthorization::CAPACIDADE)
        ->andReturn(true);

    $this->authorization->assertPodeConsultar($usuario);
});

test('assertPodeConsultar lança quando o usuário não possui a capacidade', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with(RelatorioPlanoTrabalhoAuthorization::CAPACIDADE)
        ->andReturn(false);

    expect(fn () => $this->authorization->assertPodeConsultar($usuario))
        ->toThrow(ServerException::class, RelatorioPlanoTrabalhoAuthorization::MSG_ACESSO_NEGADO);
});
