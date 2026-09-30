<?php

use App\Enums\RelatorioGeracaoTipo;
use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Support\AuthenticatedUsuario;
use App\V2\RelatorioGeracao\RelatorioGeracaoAuthorization;

beforeEach(function () {
    $this->authorization = new RelatorioGeracaoAuthorization();
});

afterEach(function () {
    Mockery::close();
});

test('usuarioAutorizadoParaTipo devolve o usuário quando possui uma das capacidades do tipo', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with('MOD_RELATORIO_PE')
        ->andReturn(true);

    Mockery::mock('alias:' . AuthenticatedUsuario::class)
        ->shouldReceive('withAreasDeTrabalho')
        ->once()
        ->andReturn($usuario);

    $result = $this->authorization->usuarioAutorizadoParaTipo(
        RelatorioGeracaoTipo::ENTREGA,
        'Acesso negado à exportação deste relatório.',
    );

    expect($result)->toBe($usuario);
});

test('usuarioAutorizadoParaTipo aceita capacidade alternativa de entrega', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with('MOD_RELATORIO_PE')
        ->andReturn(false);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with('MOD_RELATORIO_ENTREGA')
        ->andReturn(true);

    Mockery::mock('alias:' . AuthenticatedUsuario::class)
        ->shouldReceive('withAreasDeTrabalho')
        ->once()
        ->andReturn($usuario);

    $result = $this->authorization->usuarioAutorizadoParaTipo(
        RelatorioGeracaoTipo::ENTREGA,
        'Acesso negado à exportação deste relatório.',
    );

    expect($result)->toBe($usuario);
});

test('usuarioAutorizadoParaTipo lança quando o usuário não possui nenhuma capacidade do tipo', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with('MOD_RELATORIO_PT')
        ->andReturn(false);

    Mockery::mock('alias:' . AuthenticatedUsuario::class)
        ->shouldReceive('withAreasDeTrabalho')
        ->once()
        ->andReturn($usuario);

    expect(fn () => $this->authorization->usuarioAutorizadoParaTipo(
        RelatorioGeracaoTipo::PLANO_TRABALHO,
        'Acesso negado à exportação deste relatório.',
    ))->toThrow(ServerException::class, 'Acesso negado à exportação deste relatório.');
});

test('usuarioAutorizadoParaTipo lança quando não há usuário autenticado', function () {
    Mockery::mock('alias:' . AuthenticatedUsuario::class)
        ->shouldReceive('withAreasDeTrabalho')
        ->once()
        ->andReturn(null);

    expect(fn () => $this->authorization->usuarioAutorizadoParaTipo(
        RelatorioGeracaoTipo::AGENTE,
        'Acesso negado à exportação deste relatório.',
    ))->toThrow(ServerException::class, 'Acesso negado à exportação deste relatório.');
});

test('usuarioAutorizado devolve o usuário com a capacidade requerida', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with('MOD_RELATORIOS')
        ->andReturn(true);

    Mockery::mock('alias:' . AuthenticatedUsuario::class)
        ->shouldReceive('withAreasDeTrabalho')
        ->once()
        ->andReturn($usuario);

    $result = $this->authorization->usuarioAutorizado('MOD_RELATORIOS', 'Acesso negado.');

    expect($result)->toBe($usuario);
});

test('usuarioAutorizado lança quando o usuário não possui a capacidade', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with('MOD_RELATORIOS')
        ->andReturn(false);

    Mockery::mock('alias:' . AuthenticatedUsuario::class)
        ->shouldReceive('withAreasDeTrabalho')
        ->once()
        ->andReturn($usuario);

    expect(fn () => $this->authorization->usuarioAutorizado('MOD_RELATORIOS', 'Acesso negado.'))
        ->toThrow(ServerException::class, 'Acesso negado.');
});
