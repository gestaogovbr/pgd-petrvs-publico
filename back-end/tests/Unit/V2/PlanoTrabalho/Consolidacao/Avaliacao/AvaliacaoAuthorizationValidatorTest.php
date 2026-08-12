<?php

use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoAuthorizationValidator;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Models\PlanoTrabalho;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);

    $this->validator = new AvaliacaoAuthorizationValidator(
        $this->planoRepo,
        $this->unidadeRepo,
        $this->usuarioRepo,
    );
});

afterEach(fn () => Mockery::close());

function mockPlanoAvaliacao(string $participanteId = 'participante-1', string $unidadeId = 'unidade-1'): PlanoTrabalho
{
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->usuario_id = $participanteId;
    $plano->unidade_id = $unidadeId;

    return $plano;
}

function mockAuthDiferenteDoParticipante(object $context): void
{
    $participante = Mockery::mock(Usuario::class)->makePartial();
    $participante->cpf = '12345678901';
    $context->usuarioRepo->shouldReceive('findById')->with('participante-1')->andReturn($participante);

    $authUser = Mockery::mock(Usuario::class)->makePartial();
    $authUser->cpf = '99988877766';
    Auth::shouldReceive('user')->andReturn($authUser);
}

describe('AvaliacaoAuthorizationValidator', function () {

    test('lança NotFoundException quando plano não existe', function () {
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn(null);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('lança ForbiddenException quando usuário tenta avaliar próprio PT por CPF', function () {
        $plano = mockPlanoAvaliacao();
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $participante = Mockery::mock(Usuario::class)->makePartial();
        $participante->cpf = '12345678901';
        $this->usuarioRepo->shouldReceive('findById')->with('participante-1')->andReturn($participante);

        $authUser = Mockery::mock(Usuario::class)->makePartial();
        $authUser->cpf = '12345678901';
        Auth::shouldReceive('user')->andReturn($authUser);

        $this->unidadeRepo->shouldNotReceive('isUsuarioGestorTitularDaUnidade');

        $this->validator->validar('plano-1', 'avaliador-1');
    })->throws(ForbiddenException::class, 'Não é permitido avaliar o próprio Plano de Trabalho.');

    test('bloqueia delegado de avaliar PT de lotado', function () {
        $plano = mockPlanoAvaliacao();
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        mockAuthDiferenteDoParticipante($this);

        $this->unidadeRepo->shouldReceive('isUsuarioGestorTitularDaUnidade')->with('unidade-1', 'participante-1')->andReturn(false);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorSubstitutoDaUnidade')->with('unidade-1', 'participante-1')->andReturn(false);
        $this->unidadeRepo->shouldReceive('findById')->with('unidade-1')->andReturn(null);
        $this->unidadeRepo->shouldReceive('isUsuarioChefiaDaUnidade')->with('unidade-1', 'delegado-1')->andReturn(false);

        $this->validator->validar('plano-1', 'delegado-1');
    })->throws(ForbiddenException::class, 'Apenas a chefia da unidade pode avaliar períodos avaliativos.');

    test('permite chefia substituta avaliar PT de lotado', function () {
        $plano = mockPlanoAvaliacao();
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        mockAuthDiferenteDoParticipante($this);

        $this->unidadeRepo->shouldReceive('isUsuarioGestorTitularDaUnidade')->with('unidade-1', 'participante-1')->andReturn(false);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorSubstitutoDaUnidade')->with('unidade-1', 'participante-1')->andReturn(false);
        $this->unidadeRepo->shouldReceive('findById')->with('unidade-1')->andReturn(null);
        $this->unidadeRepo->shouldReceive('isUsuarioChefiaDaUnidade')->with('unidade-1', 'substituto-1')->andReturn(true);

        $result = $this->validator->validar('plano-1', 'substituto-1');

        expect($result)->toBe($plano);
    });

    test('permite chefia da unidade superior avaliar PT de chefe titular', function () {
        $plano = mockPlanoAvaliacao();
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        mockAuthDiferenteDoParticipante($this);

        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->unidade_pai_id = 'unidade-pai-1';

        $this->unidadeRepo->shouldReceive('isUsuarioGestorTitularDaUnidade')->with('unidade-1', 'participante-1')->andReturn(true);
        $this->unidadeRepo->shouldReceive('findById')->with('unidade-1')->andReturn($unidade);
        $this->unidadeRepo->shouldReceive('isUsuarioChefiaDaUnidade')->with('unidade-pai-1', 'chefia-superior-1')->andReturn(true);

        $result = $this->validator->validar('plano-1', 'chefia-superior-1');

        expect($result)->toBe($plano);
    });

    test('permite chefia titular avaliar PT de delegado', function () {
        $plano = mockPlanoAvaliacao();
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        mockAuthDiferenteDoParticipante($this);

        $this->unidadeRepo->shouldReceive('isUsuarioGestorTitularDaUnidade')->with('unidade-1', 'participante-1')->andReturn(false);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorSubstitutoDaUnidade')->with('unidade-1', 'participante-1')->andReturn(false);
        $this->unidadeRepo->shouldReceive('findById')->with('unidade-1')->andReturn(null);
        $this->unidadeRepo->shouldReceive('isUsuarioChefiaDaUnidade')->with('unidade-1', 'chefia-1')->andReturn(true);

        $result = $this->validator->validar('plano-1', 'chefia-1');

        expect($result)->toBe($plano);
    });

    test('permite avaliação quando participante não é encontrado', function () {
        $plano = mockPlanoAvaliacao('participante-inexistente');
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('participante-inexistente')->andReturn(null);

        $this->unidadeRepo->shouldReceive('isUsuarioGestorTitularDaUnidade')->andReturn(false);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorSubstitutoDaUnidade')->andReturn(false);
        $this->unidadeRepo->shouldReceive('findById')->andReturn(null);
        $this->unidadeRepo->shouldReceive('isUsuarioChefiaDaUnidade')->andReturn(true);

        $result = $this->validator->validar('plano-1', 'avaliador-1');

        expect($result)->toBe($plano);
    });

    test('bloqueia avaliação quando avaliador é usuario diferente mas com mesmo CPF do participante', function () {
        $plano = mockPlanoAvaliacao();
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $participante = Mockery::mock(Usuario::class)->makePartial();
        $participante->id = 'participante-1';
        $participante->cpf = '12345678901';
        $this->usuarioRepo->shouldReceive('findById')->with('participante-1')->andReturn($participante);

        $authUser = Mockery::mock(Usuario::class)->makePartial();
        $authUser->id = 'avaliador-outro-registro';
        $authUser->cpf = '12345678901';
        Auth::shouldReceive('user')->andReturn($authUser);

        $this->unidadeRepo->shouldNotReceive('isUsuarioGestorTitularDaUnidade');

        $this->validator->validar('plano-1', 'avaliador-outro-registro');
    })->throws(ForbiddenException::class, 'Não é permitido avaliar o próprio Plano de Trabalho.');
});
