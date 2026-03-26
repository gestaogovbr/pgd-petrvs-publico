<?php

use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoDestroyValidator;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Exceptions\ServerException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);

    $this->validator = new PlanoTrabalhoDestroyValidator(
        $this->planoRepo,
        $this->usuarioRepo,
    );
});

afterEach(function () {
    Mockery::close();
});

function fakePlano(string $status, string $usuarioId, string $criadorId): PlanoTrabalho
{
    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->status = $status;
    $plano->usuario_id = $usuarioId;
    $plano->criacao_usuario_id = $criadorId;
    $plano->unidade_id = 'unidade-1';
    return $plano;
}

function fakeUsuario(string $id, int $nivel): Usuario
{
    /** @var Usuario $usuario */
    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->id = $id;
    $perfil = Mockery::mock(Perfil::class)->makePartial();
    $perfil->nivel = $nivel;
    $usuario->setRelation('perfil', $perfil);
    return $usuario;
}

describe('PlanoTrabalhoDestroyValidator - guard', function () {

    test('lança exceção quando PT não encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn(null);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(ServerException::class, 'Plano de Trabalho não encontrado.');

    test('lança exceção quando PT tem assinatura (status != INCLUIDO)', function () {
        $plano = fakePlano('AGUARDANDO_ASSINATURA', 'user-1', 'user-1');
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(ServerException::class, 'Plano de Trabalho não pode ser excluído pois já possui assinatura.');
});

describe('PlanoTrabalhoDestroyValidator - autorização', function () {

    test('criador do PT pode excluir', function () {
        $plano = fakePlano('INCLUIDO', 'user-1', 'criador-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('criador-1')->andReturn(fakeUsuario('criador-1', 3));

        $this->validator->validar('plano-1', 'criador-1');

        expect(true)->toBeTrue();
    });

    test('participante dono do PT pode excluir', function () {
        $plano = fakePlano('INCLUIDO', 'user-1', 'criador-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn(fakeUsuario('user-1', 5));

        $this->validator->validar('plano-1', 'user-1');

        expect(true)->toBeTrue();
    });

    test('adm master pode excluir', function () {
        $plano = fakePlano('INCLUIDO', 'user-1', 'criador-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('outro-user')->andReturn(fakeUsuario('outro-user', 1));

        $this->validator->validar('plano-1', 'outro-user');

        expect(true)->toBeTrue();
    });

    test('usuário sem relação com o PT não pode excluir', function () {
        $plano = fakePlano('INCLUIDO', 'user-1', 'criador-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('intruso')->andReturn(fakeUsuario('intruso', 5));

        $this->validator->validar('plano-1', 'intruso');
    })->throws(ServerException::class, 'Usuário não tem permissão para excluir este plano de trabalho.');
});
