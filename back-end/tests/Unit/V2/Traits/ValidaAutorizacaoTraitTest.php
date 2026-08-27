<?php

use App\Contracts\HasOwnership;
use App\Exceptions\ForbiddenException;
use App\Repository\UnidadeRepository;
use App\V2\Traits\ValidaAutorizacaoTrait;
use Tests\TestCase;

uses(TestCase::class);

afterEach(fn () => Mockery::close());

function criarClasseComTrait(UnidadeRepository $unidadeRepo): object
{
    return new class($unidadeRepo) {
        use ValidaAutorizacaoTrait {
            isDonoOuChefia as public;
            autorizarDonoOuChefia as public;
        }

        public function __construct(protected readonly UnidadeRepository $unidadeRepository) {}
    };
}

function criarEntity(array $ownerIds): HasOwnership
{
    $entity = Mockery::mock(HasOwnership::class);
    $entity->shouldReceive('getOwnerIds')->andReturn($ownerIds);
    return $entity;
}

describe('ValidaAutorizacaoTrait::isDonoOuChefia', function () {

    test('retorna true quando usuário é dono', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldNotReceive('isUsuarioGestorRecursivo');
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarEntity(['user-1', 'criador-1']);

        expect($trait->isDonoOuChefia($entity, 'user-1', 'u-1'))->toBeTrue();
    });

    test('retorna true quando usuário é criador', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldNotReceive('isUsuarioGestorRecursivo');
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarEntity(['user-1', 'criador-1']);

        expect($trait->isDonoOuChefia($entity, 'criador-1', 'u-1'))->toBeTrue();
    });

    test('retorna true quando usuário é chefia', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->with('u-1', 'chefia-1')->andReturn(true);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarEntity(['user-1', 'criador-1']);

        expect($trait->isDonoOuChefia($entity, 'chefia-1', 'u-1'))->toBeTrue();
    });

    test('retorna false quando não é dono nem chefia', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->with('u-1', 'estranho')->andReturn(false);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarEntity(['user-1', 'criador-1']);

        expect($trait->isDonoOuChefia($entity, 'estranho', 'u-1'))->toBeFalse();
    });

    test('retorna false quando getOwnerIds é vazio e não é chefia', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->with('u-1', 'user-1')->andReturn(false);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarEntity([]);

        expect($trait->isDonoOuChefia($entity, 'user-1', 'u-1'))->toBeFalse();
    });
});

describe('ValidaAutorizacaoTrait::autorizarDonoOuChefia', function () {

    test('não lança exceção quando autorizado', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarEntity(['user-1']);

        $trait->autorizarDonoOuChefia($entity, 'user-1', 'u-1');
        expect(true)->toBeTrue();
    });

    test('lança ForbiddenException quando não autorizado', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->andReturn(false);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarEntity(['outro']);

        $trait->autorizarDonoOuChefia($entity, 'estranho', 'u-1', 'Sem permissão.');
    })->throws(ForbiddenException::class, 'Sem permissão.');

    test('usa mensagem customizada', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->andReturn(false);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarEntity(['outro']);

        $trait->autorizarDonoOuChefia($entity, 'x', 'u-1', 'Não pode clonar.');
    })->throws(ForbiddenException::class, 'Não pode clonar.');

    test('usa mensagem padrão quando não informada', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->andReturn(false);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarEntity(['outro']);

        $trait->autorizarDonoOuChefia($entity, 'x', 'u-1');
    })->throws(ForbiddenException::class, 'Usuário não tem permissão para realizar esta ação.');
});
