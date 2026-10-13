<?php

declare(strict_types=1);

use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Services\RelatorioLacunaPlanoTrabalhoAuthorization;
use App\Support\AuthenticatedUsuario;

beforeEach(function () {
    $this->authorization = new RelatorioLacunaPlanoTrabalhoAuthorization();
});

afterEach(function () {
    AuthenticatedUsuario::clearFakes();
    Mockery::close();
});

test('usuarioAutorizado devolve o usuário com capacidade MOD_RELATORIO_PT', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with(RelatorioLacunaPlanoTrabalhoAuthorization::CAPACIDADE)
        ->andReturn(true);

    AuthenticatedUsuario::fakeWithAreasDeTrabalho(fn () => $usuario);

    expect($this->authorization->usuarioAutorizado())->toBe($usuario);
});

test('usuarioAutorizado lança quando não há usuário autenticado', function () {
    AuthenticatedUsuario::fakeWithAreasDeTrabalho(fn () => null);

    expect(fn () => $this->authorization->usuarioAutorizado())
        ->toThrow(ServerException::class, RelatorioLacunaPlanoTrabalhoAuthorization::MSG_ACESSO_NEGADO);
});

test('assertPodeConsultar libera usuário com capacidade MOD_RELATORIO_PT', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with(RelatorioLacunaPlanoTrabalhoAuthorization::CAPACIDADE)
        ->andReturn(true);

    $this->authorization->assertPodeConsultar($usuario);
});

test('assertPodeConsultar lança quando o usuário não possui a capacidade', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with(RelatorioLacunaPlanoTrabalhoAuthorization::CAPACIDADE)
        ->andReturn(false);

    expect(fn () => $this->authorization->assertPodeConsultar($usuario))
        ->toThrow(ServerException::class, RelatorioLacunaPlanoTrabalhoAuthorization::MSG_ACESSO_NEGADO);
});
