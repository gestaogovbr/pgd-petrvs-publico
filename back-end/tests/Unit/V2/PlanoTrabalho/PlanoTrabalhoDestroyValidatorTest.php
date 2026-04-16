<?php

use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoDestroyValidator;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Exceptions\ForbiddenException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);

    $this->validator = new PlanoTrabalhoDestroyValidator(
        $this->planoRepo,
        $this->unidadeRepo,
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

    test('lança exceção quando plano de trabalho não encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn(null);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('lança exceção quando status não é INCLUIDO', function () {
        $plano = fakePlano(StatusEnum::AGUARDANDO_ASSINATURA->value, 'user-1', 'user-1');
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $this->planoRepo->shouldNotReceive('possuiAssinatura');

        $this->validator->validar('plano-1', 'user-1');
    })->throws(ValidateException::class, 'Plano de Trabalho não pode ser excluído pois não é mais um rascunho.');

    test('lança exceção quando plano de trabalho possui assinatura', function () {
        $plano = fakePlano(StatusEnum::INCLUIDO->value, 'user-1', 'user-1');
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        $this->planoRepo->shouldReceive('possuiAssinatura')->with('plano-1')->andReturn(true);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(ValidateException::class, 'Plano de Trabalho não pode ser excluído pois já possui assinatura.');
});

describe('PlanoTrabalhoDestroyValidator - autorização', function () {

    test('criador do plano de trabalho pode excluir', function () {
        $plano = fakePlano(StatusEnum::INCLUIDO->value, 'user-1', 'criador-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->planoRepo->shouldReceive('possuiAssinatura')->andReturn(false);
        $this->usuarioRepo->shouldReceive('findById')->with('criador-1')->andReturn(fakeUsuario('criador-1', 3));

        $this->validator->validar('plano-1', 'criador-1');

        expect(true)->toBeTrue();
    });

    test('participante dono do plano de trabalho pode excluir', function () {
        $plano = fakePlano(StatusEnum::INCLUIDO->value, 'user-1', 'criador-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->planoRepo->shouldReceive('possuiAssinatura')->andReturn(false);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn(fakeUsuario('user-1', 5));

        $this->validator->validar('plano-1', 'user-1');

        expect(true)->toBeTrue();
    });

    test('adm master pode excluir', function () {
        $plano = fakePlano(StatusEnum::INCLUIDO->value, 'user-1', 'criador-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->planoRepo->shouldReceive('possuiAssinatura')->andReturn(false);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->with('unidade-1', 'outro-user')->andReturn(false);
        $this->usuarioRepo->shouldReceive('findById')->with('outro-user')->andReturn(fakeUsuario('outro-user', 1));

        $this->validator->validar('plano-1', 'outro-user');

        expect(true)->toBeTrue();
    });

    test('usuário sem relação com o plano de trabalho não pode excluir', function () {
        $plano = fakePlano(StatusEnum::INCLUIDO->value, 'user-1', 'criador-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->planoRepo->shouldReceive('possuiAssinatura')->andReturn(false);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->with('unidade-1', 'intruso')->andReturn(false);
        $this->usuarioRepo->shouldReceive('findById')->with('intruso')->andReturn(fakeUsuario('intruso', 5));

        $this->validator->validar('plano-1', 'intruso');
    })->throws(ForbiddenException::class, 'Usuário não tem permissão para excluir este plano de trabalho.');
});
