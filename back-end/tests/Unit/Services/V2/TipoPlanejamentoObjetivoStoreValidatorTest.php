<?php

namespace Tests\Unit\Services\V2;

use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\TipoPlanejamentoObjetivo;
use App\Models\Usuario;
use App\Repository\TipoPlanejamentoObjetivoRepository;
use App\Repository\UsuarioRepository;
use App\V2\TipoPlanejamentoObjetivo\Validators\TipoPlanejamentoObjetivoStoreValidator;
use Mockery;

afterEach(function () {
    Mockery::close();
});

describe('TipoPlanejamentoObjetivoStoreValidator::validarExistencia', function () {
    test('retorna TipoPlanejamentoObjetivo quando encontrado', function () {
        $tipoObjetivo = Mockery::mock(TipoPlanejamentoObjetivo::class)->makePartial();

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $repo->shouldReceive('findById')->once()->with('tipo-1')->andReturn($tipoObjetivo);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);

        $validator = new TipoPlanejamentoObjetivoStoreValidator($repo, $usuarioRepo);

        expect($validator->validarExistencia('tipo-1'))->toBe($tipoObjetivo);
    });

    test('lança NotFoundException quando não encontrado', function () {
        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $repo->shouldReceive('findById')->once()->with('inexistente')->andReturn(null);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);

        $validator = new TipoPlanejamentoObjetivoStoreValidator($repo, $usuarioRepo);
        $validator->validarExistencia('inexistente');
    })->throws(NotFoundException::class, 'Tipo de objetivo não encontrado.');
});

describe('TipoPlanejamentoObjetivoStoreValidator::validar', function () {
    test('não lança exceção quando usuário é ADM_MASTER', function () {
        $perfil = (object) ['nivel' => PerfilEnum::ADMINISTRADOR_MASTER->value];

        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->shouldReceive('getAttribute')->with('perfil')->andReturn($perfil);

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findById')->once()->with('user-adm')->andReturn($usuario);

        $validator = new TipoPlanejamentoObjetivoStoreValidator($repo, $usuarioRepo);
        $validator->validar('user-adm');

        expect(true)->toBeTrue();
    });

    test('não lança exceção quando usuário é DESENVOLVEDOR', function () {
        $perfil = (object) ['nivel' => PerfilEnum::DESENVOLVEDOR->value];

        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->shouldReceive('getAttribute')->with('perfil')->andReturn($perfil);

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findById')->once()->with('user-dev')->andReturn($usuario);

        $validator = new TipoPlanejamentoObjetivoStoreValidator($repo, $usuarioRepo);
        $validator->validar('user-dev');

        expect(true)->toBeTrue();
    });

    test('lança ForbiddenException quando usuário é PARTICIPANTE', function () {
        $perfil = (object) ['nivel' => PerfilEnum::PARTICIPANTE->value];

        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->shouldReceive('getAttribute')->with('perfil')->andReturn($perfil);

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findById')->once()->with('user-part')->andReturn($usuario);

        $validator = new TipoPlanejamentoObjetivoStoreValidator($repo, $usuarioRepo);
        $validator->validar('user-part');
    })->throws(ForbiddenException::class, 'Apenas administradores master podem gerenciar tipos de objetivo.');

    test('lança ForbiddenException quando usuário é ADM_NEGOCIAL', function () {
        $perfil = (object) ['nivel' => PerfilEnum::ADMINISTRADOR_NEGOCIAL->value];

        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->shouldReceive('getAttribute')->with('perfil')->andReturn($perfil);

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findById')->once()->with('user-neg')->andReturn($usuario);

        $validator = new TipoPlanejamentoObjetivoStoreValidator($repo, $usuarioRepo);
        $validator->validar('user-neg');
    })->throws(ForbiddenException::class, 'Apenas administradores master podem gerenciar tipos de objetivo.');
});
