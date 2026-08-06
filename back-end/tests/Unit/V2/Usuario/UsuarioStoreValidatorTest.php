<?php

use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\ValidateException;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\PerfilRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\Usuario\DTOs\UsuarioStoreDTO;
use App\V2\Usuario\Validators\UsuarioStoreValidator;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->perfilRepo = Mockery::mock(PerfilRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);

    $this->validator = new UsuarioStoreValidator(
        $this->perfilRepo,
        $this->unidadeRepo,
        $this->usuarioRepo,
    );
});

afterEach(fn () => Mockery::close());

function storeBaseDTO(array $overrides = []): UsuarioStoreDTO
{
    return UsuarioStoreDTO::fromArray(array_merge([
        'cpf' => '12345678901',
        'email' => 'teste@email.com',
        'nome' => 'Teste',
        'perfil_id' => 'perfil-colab',
        'atribuicoes' => [['unidade_id' => 'u1', 'atribuicoes' => ['COLABORADOR']]],
    ], $overrides));
}

function storeMockPerfil(int $nivel): Perfil
{
    $p = Mockery::mock(Perfil::class)->makePartial();
    $p->nivel = $nivel;
    return $p;
}

function storeMockUnidade(?string $inativacao = null): Unidade
{
    $u = Mockery::mock(Unidade::class)->makePartial();
    $u->data_inativacao = $inativacao;
    return $u;
}

describe('UsuarioStoreValidator', function () {

    test('perfil inexistente lança exceção', function () {
        $this->perfilRepo->shouldReceive('find')->with('perfil-colab')->andReturn(null);

        $this->validator->validar(storeBaseDTO());
    })->throws(ValidateException::class, 'Perfil não encontrado.');

    test('perfil com nível < 6 lança exceção (externo não pode)', function () {
        $this->perfilRepo->shouldReceive('find')->andReturn(storeMockPerfil(PerfilEnum::PARTICIPANTE->value));

        $this->validator->validar(storeBaseDTO());
    })->throws(ValidateException::class, 'Usuário externo não pode ter este nível de acesso.');

    test('unidade inativa lança exceção', function () {
        $this->perfilRepo->shouldReceive('find')->andReturn(storeMockPerfil(PerfilEnum::COLABORADOR->value));
        $this->unidadeRepo->shouldReceive('findById')->with('u1')->andReturn(storeMockUnidade('2024-01-01'));

        $this->validator->validar(storeBaseDTO());
    })->throws(ValidateException::class, 'Unidade não encontrada ou está inativada.');

    test('CPF/email duplicado com usuário ativo lança exceção', function () {
        $this->perfilRepo->shouldReceive('find')->andReturn(storeMockPerfil(PerfilEnum::COLABORADOR->value));
        $this->unidadeRepo->shouldReceive('findById')->with('u1')->andReturn(storeMockUnidade());

        $existente = Mockery::mock(Usuario::class)->makePartial();
        $existente->deleted_at = null;
        $this->usuarioRepo->shouldReceive('findByCpfOrEmail')->andReturn($existente);

        $this->validator->validar(storeBaseDTO());
    })->throws(ValidateException::class, 'Já existe um usuário com mesmo e-mail ou CPF no sistema.');

    test('CPF/email duplicado com soft-deleted retorna o usuário para restauração', function () {
        $this->perfilRepo->shouldReceive('find')->andReturn(storeMockPerfil(PerfilEnum::COLABORADOR->value));
        $this->unidadeRepo->shouldReceive('findById')->with('u1')->andReturn(storeMockUnidade());

        $existente = Mockery::mock(Usuario::class)->makePartial();
        $existente->deleted_at = '2024-01-01';
        $this->usuarioRepo->shouldReceive('findByCpfOrEmail')->andReturn($existente);

        $result = $this->validator->validar(storeBaseDTO());

        expect($result)->toBe($existente);
    });

    test('sem duplicidade retorna null (criação nova)', function () {
        $this->perfilRepo->shouldReceive('find')->andReturn(storeMockPerfil(PerfilEnum::COLABORADOR->value));
        $this->unidadeRepo->shouldReceive('findById')->with('u1')->andReturn(storeMockUnidade());
        $this->usuarioRepo->shouldReceive('findByCpfOrEmail')->andReturn(null);

        $result = $this->validator->validar(storeBaseDTO());

        expect($result)->toBeNull();
    });

    test('perfil Consulta (nível 7) é permitido para externo', function () {
        $this->perfilRepo->shouldReceive('find')->andReturn(storeMockPerfil(PerfilEnum::CONSULTA->value));
        $this->unidadeRepo->shouldReceive('findById')->with('u1')->andReturn(storeMockUnidade());
        $this->usuarioRepo->shouldReceive('findByCpfOrEmail')->andReturn(null);

        $result = $this->validator->validar(storeBaseDTO());

        expect($result)->toBeNull();
    });
});
