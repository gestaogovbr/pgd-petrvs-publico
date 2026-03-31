<?php

use App\Models\UnidadeIntegrante;
use App\Repository\UnidadeIntegrante\Eloquent\EloquentUnidadeIntegranteReadRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Tests\TestCase;

uses(TestCase::class);

afterAll(function () {
    \Mockery::close();
});

test('findGestorByUnidade retorna integrante quando eloquent retorna model correto', function () {
    $unidadeId = 'u-1';

    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('with')->with('gestor')->andReturnSelf();
    $builder->shouldReceive('where')->with('unidade_id', $unidadeId)->andReturnSelf();
    $builder->shouldReceive('has')->with('gestor')->andReturnSelf();

    $integrante = new UnidadeIntegrante();
    $integrante->id = 'ui-1';

    $builder->shouldReceive('first')->andReturn($integrante);

    $model = \Mockery::mock(UnidadeIntegrante::class);
    $model->shouldReceive('newQuery')->andReturn($builder);

    $repo = new EloquentUnidadeIntegranteReadRepository($model);

    $result = $repo->findGestorByUnidade($unidadeId);

    expect($result)->toBeInstanceOf(UnidadeIntegrante::class);
    expect($result->id)->toBe('ui-1');
});

test('findGestorByUnidade retorna null quando eloquent retorna outro model', function () {
    $unidadeId = 'u-2';

    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('with')->with('gestor')->andReturnSelf();
    $builder->shouldReceive('where')->with('unidade_id', $unidadeId)->andReturnSelf();
    $builder->shouldReceive('has')->with('gestor')->andReturnSelf();
    $builder->shouldReceive('first')->andReturn(\Mockery::mock(Model::class));

    $model = \Mockery::mock(UnidadeIntegrante::class);
    $model->shouldReceive('newQuery')->andReturn($builder);

    $repo = new EloquentUnidadeIntegranteReadRepository($model);

    expect($repo->findGestorByUnidade($unidadeId))->toBeNull();
});

test('findUnidadeIntegrante retorna integrante quando eloquent retorna model correto', function () {
    $unidadeId = 'u-3';
    $usuarioId = 'us-1';

    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('where')->with('usuario_id', $usuarioId)->andReturnSelf();
    $builder->shouldReceive('where')->with('unidade_id', $unidadeId)->andReturnSelf();

    $integrante = new UnidadeIntegrante();
    $integrante->id = 'ui-2';

    $builder->shouldReceive('first')->andReturn($integrante);

    $model = \Mockery::mock(UnidadeIntegrante::class);
    $model->shouldReceive('newQuery')->andReturn($builder);

    $repo = new EloquentUnidadeIntegranteReadRepository($model);

    $result = $repo->findUnidadeIntegrante($usuarioId, $unidadeId);

    expect($result)->toBeInstanceOf(UnidadeIntegrante::class);
    expect($result->id)->toBe('ui-2');
});

test('findUnidadeIntegrante retorna null quando eloquent retorna null', function () {
    $unidadeId = 'u-4';
    $usuarioId = 'us-2';

    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('where')->with('usuario_id', $usuarioId)->andReturnSelf();
    $builder->shouldReceive('where')->with('unidade_id', $unidadeId)->andReturnSelf();
    $builder->shouldReceive('first')->andReturn(null);

    $model = \Mockery::mock(UnidadeIntegrante::class);
    $model->shouldReceive('newQuery')->andReturn($builder);

    $repo = new EloquentUnidadeIntegranteReadRepository($model);

    expect($repo->findUnidadeIntegrante($usuarioId, $unidadeId))->toBeNull();
});
