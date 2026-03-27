<?php

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\Repository\UsuarioRepository;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Enums\PerfilEnum;
use App\Exceptions\ServerException;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoIndexValidator;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);
    $this->validacao = new PlanoTrabalhoIndexValidator($this->usuarioRepo);
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoIndexValidacao', function () {

    test('participante não pode filtrar por usuario_id diferente do logado', function () {
        /** @var Usuario $usuario */
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-participante';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = PerfilEnum::PARTICIPANTE->value;
        $usuario->setRelation('perfil', $perfil);

        $this->usuarioRepo->shouldReceive('findById')->with('user-participante')->andReturn($usuario);

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['usuario_id' => 'outro-user', 'vigentes' => true, 'usuarioLogadoId' => 'user-participante']);
        $this->validacao->validar($filtro);
    })->throws(ServerException::class, 'Usuário de perfil participante só pode consultar seus próprios planos de trabalho.');

    test('participante pode filtrar por seu próprio usuario_id', function () {
        /** @var Usuario $usuario */
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-participante';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = PerfilEnum::PARTICIPANTE->value;
        $usuario->setRelation('perfil', $perfil);

        $this->usuarioRepo->shouldReceive('findById')->with('user-participante')->andReturn($usuario);

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['usuario_id' => 'user-participante', 'vigentes' => true, 'usuarioLogadoId' => 'user-participante']);
        $this->validacao->validar($filtro);

        expect(true)->toBeTrue();
    });

    test('participante pode consultar sem informar usuario_id', function () {
        /** @var Usuario $usuario */
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-participante';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = PerfilEnum::PARTICIPANTE->value;
        $usuario->setRelation('perfil', $perfil);

        $this->usuarioRepo->shouldReceive('findById')->with('user-participante')->andReturn($usuario);

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['vigentes' => true, 'usuarioLogadoId' => 'user-participante']);
        $this->validacao->validar($filtro);

        expect(true)->toBeTrue();
    });

    test('não-participante pode filtrar por qualquer usuario_id', function () {
        /** @var Usuario $usuario */
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-gestor';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = PerfilEnum::UNIDADE->value;
        $usuario->setRelation('perfil', $perfil);

        $this->usuarioRepo->shouldReceive('findById')->with('user-gestor')->andReturn($usuario);

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['usuario_id' => 'outro-user', 'vigentes' => true, 'usuarioLogadoId' => 'user-gestor']);
        $this->validacao->validar($filtro);

        expect(true)->toBeTrue();
    });
});
