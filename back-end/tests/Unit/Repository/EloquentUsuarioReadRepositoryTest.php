<?php

use App\Models\Usuario;
use App\Repository\Usuario\Eloquent\EloquentUsuarioReadRepository;
use Illuminate\Database\Eloquent\Builder;
use Tests\TestCase;

uses(TestCase::class);

afterAll(function () {
    \Mockery::close();
});

test('findByEmail retorna null quando email vazio sem consultar o banco', function () {
    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('where')->withAnyArgs()->andReturnSelf()->byDefault();
    $builder->shouldReceive('first')->andReturn(null)->byDefault();

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->never()->andReturn($builder);

    $repo = new EloquentUsuarioReadRepository($model);

    expect($repo->findByEmail(''))->toBeNull();
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

    $repo = new EloquentUsuarioReadRepository($model);

    expect($repo->findByCpfOrEmail($cpf, $email))->toBeNull();
});
