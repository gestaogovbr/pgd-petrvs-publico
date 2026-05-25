<?php

use App\Models\Usuario;
use App\Repository\Usuario\Eloquent\EloquentUsuarioReadRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UnidadeIntegranteRepository;
use Illuminate\Database\Eloquent\Builder;
use Tests\TestCase;

uses(TestCase::class);

afterAll(function () {
    \Mockery::close();
});

function makeUsuarioRepo($model): EloquentUsuarioReadRepository {
    $unidadeRepo = \Mockery::mock(UnidadeRepository::class);
    $integranteRepo = \Mockery::mock(UnidadeIntegranteRepository::class);
    return new EloquentUsuarioReadRepository($model, $unidadeRepo, $integranteRepo);
}

test('findByEmail retorna null quando email vazio sem consultar o banco', function () {
    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('where')->withAnyArgs()->andReturnSelf()->byDefault();
    $builder->shouldReceive('first')->andReturn(null)->byDefault();

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->never()->andReturn($builder);

    $repo = makeUsuarioRepo($model);

    expect($repo->findByEmail(''))->toBeNull();
});

test('findByEmail retorna null quando email nulo sem consultar o banco', function () {
    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('where')->withAnyArgs()->andReturnSelf()->byDefault();
    $builder->shouldReceive('first')->andReturn(null)->byDefault();

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->never()->andReturn($builder);

    $repo = makeUsuarioRepo($model);

    expect($repo->findByEmail(null))->toBeNull();
});

test('findByCpfOrEmail não adiciona filtro de email quando email vazio', function () {
    $cpf = '123.456.789-01';
    $email = '';

    $outerBuilder = \Mockery::mock(Builder::class);
    $outerBuilder->shouldReceive('where')
        ->once()
        ->with(\Mockery::on(function ($callback) {
            if (!is_callable($callback)) {
                return false;
            }

            $innerBuilder = \Mockery::mock(Builder::class);
            $innerBuilder->shouldReceive('where')->once()->with('cpf', \Mockery::any())->andReturnSelf();
            $innerBuilder->shouldNotReceive('orWhere');

            $callback($innerBuilder);

            return true;
        }))
        ->andReturnSelf();

    $outerBuilder->shouldReceive('first')->andReturn(null);

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->andReturn($outerBuilder);

    $repo = makeUsuarioRepo($model);

    expect($repo->findByCpfOrEmail($cpf, $email))->toBeNull();
});

test('findByCpfOrEmail não adiciona filtro de email quando email nulo', function () {
    $cpf = '123.456.789-01';
    $email = null;

    $outerBuilder = \Mockery::mock(Builder::class);
    $outerBuilder->shouldReceive('where')
        ->once()
        ->with(\Mockery::on(function ($callback) {
            if (!is_callable($callback)) {
                return false;
            }

            $innerBuilder = \Mockery::mock(Builder::class);
            $innerBuilder->shouldReceive('where')->once()->with('cpf', \Mockery::any())->andReturnSelf();
            $innerBuilder->shouldNotReceive('orWhere');

            $callback($innerBuilder);

            return true;
        }))
        ->andReturnSelf();

    $outerBuilder->shouldReceive('first')->andReturn(null);

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->andReturn($outerBuilder);

    $repo = makeUsuarioRepo($model);

    expect($repo->findByCpfOrEmail($cpf, $email))->toBeNull();
});

test('findByIdComAreasTrabalho aplica whereKey e eager load areasTrabalho.unidade', function () {
    $usuario = \Mockery::mock(Usuario::class);

    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('whereKey')->once()->with('user-1')->andReturnSelf();
    $builder->shouldReceive('with')->once()->with(['areasTrabalho.unidade'])->andReturnSelf();
    $builder->shouldReceive('first')->once()->andReturn($usuario);

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->andReturn($builder);

    $repo = makeUsuarioRepo($model);

    expect($repo->findByIdComAreasTrabalho('user-1'))->toBe($usuario);
});
