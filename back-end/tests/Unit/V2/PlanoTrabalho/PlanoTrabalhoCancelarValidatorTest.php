<?php

use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoCancelarValidator;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);
    $this->validator = new PlanoTrabalhoCancelarValidator(
        $this->planoRepo,
        $this->unidadeRepo,
        $this->usuarioRepo,
    );
});

afterEach(fn () => Mockery::close());

function mockPlanoAtivo(string $usuarioId = 'user-1', bool $temConsolidacaoFinalizada = false): PlanoTrabalho
{
    $relation = Mockery::mock(HasMany::class);
    $relation->shouldReceive('whereIn->exists')->andReturn($temConsolidacaoFinalizada);

    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->status = 'ATIVO';
    $plano->usuario_id = $usuarioId;
    $plano->unidade_id = 'unidade-1';
    $plano->shouldReceive('consolidacoes')->andReturn($relation);

    return $plano;
}

describe('PlanoTrabalhoCancelarValidator', function () {

    test('retorna plano quando participante dono cancela', function () {
        $plano = mockPlanoAtivo('user-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        expect($this->validator->validar('plano-1', 'user-1'))->toBe($plano);
    });

    test('retorna plano quando chefia cancela', function () {
        $plano = mockPlanoAtivo('outro-user');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'chefia-1')->andReturn(true);

        expect($this->validator->validar('plano-1', 'chefia-1'))->toBe($plano);
    });

    test('retorna plano quando adm master cancela', function () {
        $plano = mockPlanoAtivo('outro-user');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->andReturn(false);

        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = 1;
        $usuario->setRelation('perfil', $perfil);
        $this->usuarioRepo->shouldReceive('findById')->andReturn($usuario);

        expect($this->validator->validar('plano-1', 'adm-1'))->toBe($plano);
    });

    test('lanca excecao quando plano nao encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(null);

        $this->validator->validar('plano-x', 'user-1');
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('lanca excecao quando plano nao esta ativo', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->status = 'INCLUIDO';
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(ValidateException::class, 'Apenas planos com status ATIVO podem ser cancelados.');

    test('lanca excecao quando possui consolidacao finalizada', function () {
        $plano = mockPlanoAtivo('user-1', true);
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(ValidateException::class, 'O plano não pode ser cancelado pois possui período avaliativo com registro finalizado.');

    test('lanca excecao quando usuario sem permissao', function () {
        $plano = mockPlanoAtivo('outro-user');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->andReturn(false);

        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = 5;
        $usuario->setRelation('perfil', $perfil);
        $this->usuarioRepo->shouldReceive('findById')->andReturn($usuario);

        $this->validator->validar('plano-1', 'participante-outro');
    })->throws(ForbiddenException::class, 'Usuário não tem permissão para cancelar este Plano de Trabalho.');
});
