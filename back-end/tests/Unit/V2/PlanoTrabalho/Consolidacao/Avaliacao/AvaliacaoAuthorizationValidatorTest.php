<?php

use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoAuthorizationValidator;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Models\PlanoTrabalho;
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

describe('AvaliacaoAuthorizationValidator', function () {

    test('lança NotFoundException quando plano não existe', function () {
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn(null);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('lança ForbiddenException quando usuário tenta avaliar próprio PT por CPF', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'participante-1';
        $plano->unidade_id = 'unidade-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $participante = Mockery::mock(Usuario::class)->makePartial();
        $participante->cpf = '12345678901';

        $this->usuarioRepo->shouldReceive('findById')->with('participante-1')->andReturn($participante);

        $authUser = Mockery::mock(Usuario::class)->makePartial();
        $authUser->cpf = '12345678901';
        Auth::shouldReceive('user')->andReturn($authUser);

        $this->unidadeRepo->shouldNotReceive('isUsuarioGestorRecursivo');

        $this->validator->validar('plano-1', 'avaliador-1');
    })->throws(ForbiddenException::class, 'Não é permitido avaliar o próprio Plano de Trabalho.');

    test('lança ForbiddenException quando usuário não é gestor da unidade', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'participante-1';
        $plano->unidade_id = 'unidade-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $participante = Mockery::mock(Usuario::class)->makePartial();
        $participante->cpf = '12345678901';

        $this->usuarioRepo->shouldReceive('findById')->with('participante-1')->andReturn($participante);

        $authUser = Mockery::mock(Usuario::class)->makePartial();
        $authUser->cpf = '99988877766';
        Auth::shouldReceive('user')->andReturn($authUser);

        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'avaliador-1')
            ->andReturn(false);

        $this->validator->validar('plano-1', 'avaliador-1');
    })->throws(ForbiddenException::class, 'Apenas a chefia da unidade pode avaliar períodos avaliativos.');

    test('retorna plano quando validações passam', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'participante-1';
        $plano->unidade_id = 'unidade-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $participante = Mockery::mock(Usuario::class)->makePartial();
        $participante->cpf = '12345678901';

        $this->usuarioRepo->shouldReceive('findById')->with('participante-1')->andReturn($participante);

        $authUser = Mockery::mock(Usuario::class)->makePartial();
        $authUser->cpf = '99988877766';
        Auth::shouldReceive('user')->andReturn($authUser);

        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'avaliador-1')
            ->andReturn(true);

        $result = $this->validator->validar('plano-1', 'avaliador-1');

        expect($result)->toBe($plano);
    });

    test('permite avaliação quando participante não é encontrado', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'participante-inexistente';
        $plano->unidade_id = 'unidade-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $this->usuarioRepo->shouldReceive('findById')->with('participante-inexistente')->andReturn(null);

        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'avaliador-1')
            ->andReturn(true);

        $result = $this->validator->validar('plano-1', 'avaliador-1');

        expect($result)->toBe($plano);
    });

    test('bloqueia avaliação quando avaliador é usuario diferente mas com mesmo CPF do participante', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'participante-1';
        $plano->unidade_id = 'unidade-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $participante = Mockery::mock(Usuario::class)->makePartial();
        $participante->id = 'participante-1';
        $participante->cpf = '12345678901';

        $this->usuarioRepo->shouldReceive('findById')->with('participante-1')->andReturn($participante);

        $authUser = Mockery::mock(Usuario::class)->makePartial();
        $authUser->id = 'avaliador-outro-registro';
        $authUser->cpf = '12345678901';
        Auth::shouldReceive('user')->andReturn($authUser);

        $this->unidadeRepo->shouldNotReceive('isUsuarioGestorRecursivo');

        $this->validator->validar('plano-1', 'avaliador-outro-registro');
    })->throws(ForbiddenException::class, 'Não é permitido avaliar o próprio Plano de Trabalho.');
});
