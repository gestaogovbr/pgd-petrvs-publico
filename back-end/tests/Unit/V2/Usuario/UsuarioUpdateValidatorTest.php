<?php

use App\Enums\PerfilEnum;
use App\Exceptions\ValidateException;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\PerfilRepository;
use App\Repository\UnidadeRepository;
use App\V2\Usuario\Validators\UsuarioUpdateValidator;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->perfilRepo = Mockery::mock(PerfilRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->validator = new UsuarioUpdateValidator($this->perfilRepo, $this->unidadeRepo);
});

afterEach(fn () => Mockery::close());

function mockPerfil(int $nivel): Perfil
{
    $p = Mockery::mock(Perfil::class)->makePartial();
    $p->nivel = $nivel;
    return $p;
}

function mockUnidade(?string $inativacao = null): Unidade
{
    $u = Mockery::mock(Unidade::class)->makePartial();
    $u->data_inativacao = $inativacao;
    return $u;
}

function mockAlvoSimples(bool $externo = false): Usuario
{
    $u = Mockery::mock(Usuario::class)->makePartial();
    $u->usuario_externo = $externo;
    return $u;
}

describe('validarPerfil', function () {
    test('perfil inexistente lança exceção', function () {
        $this->perfilRepo->shouldReceive('find')->with('x')->andReturn(null);
        $this->validator->validarPerfil('x', mockAlvoSimples());
    })->throws(ValidateException::class, 'Perfil não encontrado.');

    test('externo não pode ter nível < 6', function () {
        $this->perfilRepo->shouldReceive('find')->andReturn(mockPerfil(PerfilEnum::PARTICIPANTE->value));
        $this->validator->validarPerfil('p1', mockAlvoSimples(externo: true));
    })->throws(ValidateException::class, 'Usuário externo não pode ter este nível de acesso.');

    test('interno não pode ter nível 6', function () {
        $this->perfilRepo->shouldReceive('find')->andReturn(mockPerfil(PerfilEnum::COLABORADOR->value));
        $this->validator->validarPerfil('p1', mockAlvoSimples(externo: false));
    })->throws(ValidateException::class, 'Usuário interno não pode ter o nível Colaborador.');

    test('perfil válido para interno não lança', function () {
        $this->perfilRepo->shouldReceive('find')->andReturn(mockPerfil(PerfilEnum::PARTICIPANTE->value));
        $this->validator->validarPerfil('p1', mockAlvoSimples(externo: false));
        expect(true)->toBeTrue();
    });
});

describe('validarAtribuicoes', function () {
    test('unidade inexistente lança exceção', function () {
        $this->unidadeRepo->shouldReceive('findById')->with('u1')->andReturn(null);
        $this->validator->validarAtribuicoes([['unidade_id' => 'u1', 'usuario_id' => 'usr1', 'atribuicoes' => ['LOTADO']]]);
    })->throws(ValidateException::class, 'Unidade não encontrada ou está inativada.');

    test('unidade inativada lança exceção', function () {
        $this->unidadeRepo->shouldReceive('findById')->with('u1')->andReturn(mockUnidade('2024-01-01'));
        $this->validator->validarAtribuicoes([['unidade_id' => 'u1', 'usuario_id' => 'usr1', 'atribuicoes' => ['LOTADO']]]);
    })->throws(ValidateException::class, 'Unidade não encontrada ou está inativada.');

    test('duas atribuições de gestor lança exceção', function () {
        $this->unidadeRepo->shouldReceive('findById')->with('u1')->andReturn(mockUnidade());
        $this->validator->validarAtribuicoes([['unidade_id' => 'u1', 'usuario_id' => 'usr1', 'atribuicoes' => ['GESTOR', 'GESTOR_SUBSTITUTO']]]);
    })->throws(ValidateException::class, 'Apenas uma atribuição de gestor por unidade.');

    test('integrantes válidos não lança', function () {
        $this->unidadeRepo->shouldReceive('findById')->andReturn(mockUnidade());
        $this->validator->validarAtribuicoes([
            ['unidade_id' => 'u1', 'usuario_id' => 'usr1', 'atribuicoes' => ['LOTADO', 'GESTOR']],
            ['unidade_id' => 'u2', 'usuario_id' => 'usr1', 'atribuicoes' => ['GESTOR_SUBSTITUTO']],
        ]);
        expect(true)->toBeTrue();
    });
});
