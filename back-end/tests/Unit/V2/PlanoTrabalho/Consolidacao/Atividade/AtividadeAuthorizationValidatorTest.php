<?php

use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeAuthorizationValidator;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Models\PlanoTrabalho;
use App\Exceptions\NotFoundException;
use App\Exceptions\ForbiddenException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);

    $this->validator = new AtividadeAuthorizationValidator(
        $this->planoRepo,
        $this->unidadeRepo,
    );
});

afterEach(fn () => Mockery::close());

describe('AtividadeAuthorizationValidator', function () {

    test('retorna plano quando usuário é dono', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'usuario-1';
        $plano->unidade_id = 'unidade-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        $this->unidadeRepo->shouldNotReceive('isUsuarioGestorRecursivo');

        $result = $this->validator->validar('plano-1', 'usuario-1');

        expect($result)->toBe($plano);
    });

    test('retorna plano quando usuário é chefia', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'usuario-1';
        $plano->unidade_id = 'unidade-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'chefia-1')
            ->andReturn(true);

        $result = $this->validator->validar('plano-1', 'chefia-1');

        expect($result)->toBe($plano);
    });

    test('lança NotFoundException quando plano não existe', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(null);

        $this->validator->validar('plano-x', 'usuario-1');
    })->throws(NotFoundException::class);

    test('lança ForbiddenException quando usuário não é dono nem chefia', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'usuario-1';
        $plano->unidade_id = 'unidade-1';

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->andReturn(false);

        $this->validator->validar('plano-1', 'intruso');
    })->throws(ForbiddenException::class);
});
