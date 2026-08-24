<?php

use App\Exceptions\ForbiddenException;
use App\Repository\UnidadeRepository;
use App\V2\Traits\ValidaAutorizacaoTrait;
use Illuminate\Database\Eloquent\Model;
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

function criarModel(array $attrs): Model
{
    $model = Mockery::mock(Model::class)->makePartial();
    foreach ($attrs as $key => $value) {
        $model->{$key} = $value;
    }
    return $model;
}

describe('ValidaAutorizacaoTrait::isDonoOuChefia', function () {

    test('retorna true quando usuário é dono', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldNotReceive('isUsuarioGestorRecursivo');
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarModel(['usuario_id' => 'user-1', 'unidade_id' => 'u-1']);

        expect($trait->isDonoOuChefia($entity, 'user-1', 'u-1'))->toBeTrue();
    });

    test('retorna true quando usuário é chefia', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->with('u-1', 'chefia-1', true)->andReturn(true);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarModel(['usuario_id' => 'outro', 'unidade_id' => 'u-1']);

        expect($trait->isDonoOuChefia($entity, 'chefia-1', 'u-1'))->toBeTrue();
    });

    test('retorna false quando não é dono nem chefia', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->with('u-1', 'estranho', true)->andReturn(false);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarModel(['usuario_id' => 'outro', 'unidade_id' => 'u-1']);

        expect($trait->isDonoOuChefia($entity, 'estranho', 'u-1'))->toBeFalse();
    });

    test('aceita múltiplas colunas de owner', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldNotReceive('isUsuarioGestorRecursivo');
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarModel(['usuario_id' => 'outro', 'criacao_usuario_id' => 'criador-1', 'unidade_id' => 'u-1']);

        expect($trait->isDonoOuChefia($entity, 'criador-1', 'u-1', ['usuario_id', 'criacao_usuario_id']))->toBeTrue();
    });
});

describe('ValidaAutorizacaoTrait::autorizarDonoOuChefia', function () {

    test('não lança exceção quando autorizado', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarModel(['usuario_id' => 'user-1', 'unidade_id' => 'u-1']);

        $trait->autorizarDonoOuChefia($entity, 'user-1', 'u-1');
        expect(true)->toBeTrue(); // chegou aqui sem exceção
    });

    test('lança ForbiddenException quando não autorizado', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->andReturn(false);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarModel(['usuario_id' => 'outro', 'unidade_id' => 'u-1']);

        $trait->autorizarDonoOuChefia($entity, 'estranho', 'u-1', 'Sem permissão.');
    })->throws(ForbiddenException::class, 'Sem permissão.');

    test('usa mensagem customizada', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')->andReturn(false);
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarModel(['usuario_id' => 'outro', 'unidade_id' => 'u-1']);

        $trait->autorizarDonoOuChefia($entity, 'x', 'u-1', 'Não pode clonar.');
    })->throws(ForbiddenException::class, 'Não pode clonar.');

    test('incluirDelegado=false permite chefia titular da unidade', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);

        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('u-1', 'chefia-1', false)
            ->andReturn(true);

        $trait = criarClasseComTrait($unidadeRepo);
        $entity = criarModel(['usuario_id' => 'outro', 'unidade_id' => 'u-1']);

        $trait->autorizarDonoOuChefia($entity, 'chefia-1', 'u-1', 'Sem permissão.', incluirDelegado: false);
        expect(true)->toBeTrue();
    });

    test('incluirDelegado=false bloqueia delegado puro', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);

        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('u-1', 'delegado-1', false)
            ->andReturn(false);

        $trait = criarClasseComTrait($unidadeRepo);
        $entity = criarModel(['usuario_id' => 'outro', 'unidade_id' => 'u-1']);

        $trait->autorizarDonoOuChefia($entity, 'delegado-1', 'u-1', 'Sem permissão.', incluirDelegado: false);
    })->throws(ForbiddenException::class, 'Sem permissão.');

    test('incluirDelegado=false permite chefia de unidade superior via subordinadas', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);

        $unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('u-filha', 'chefia-1', false)
            ->andReturn(true);

        $trait = criarClasseComTrait($unidadeRepo);
        $entity = criarModel(['usuario_id' => 'outro', 'unidade_id' => 'u-filha']);

        $trait->autorizarDonoOuChefia($entity, 'chefia-1', 'u-filha', 'Sem permissão.', incluirDelegado: false);
        expect(true)->toBeTrue();
    });

    test('incluirDelegado=false permite dono do plano independentemente de atribuição', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldNotReceive('isUsuarioGestorRecursivo');
        $trait = criarClasseComTrait($unidadeRepo);

        $entity = criarModel(['usuario_id' => 'delegado-1', 'unidade_id' => 'u-1']);

        $trait->autorizarDonoOuChefia($entity, 'delegado-1', 'u-1', 'Sem permissão.', incluirDelegado: false);
        expect(true)->toBeTrue();
    });
});
