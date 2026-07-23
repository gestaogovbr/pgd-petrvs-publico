<?php

use App\Models\Unidade;
use App\Repository\Unidade\Eloquent\EloquentUnidadeReadRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

uses(TestCase::class);

afterEach(fn () => Mockery::close());

function criarRepository(): EloquentUnidadeReadRepository
{
    $model = Mockery::mock(Unidade::class)->makePartial();
    return Mockery::mock(EloquentUnidadeReadRepository::class, [$model])
        ->makePartial()
        ->shouldAllowMockingProtectedMethods();
}

function mockCollection(array $ids): Collection
{
    $models = array_map(function (string $id) {
        $model = Mockery::mock(Unidade::class)->makePartial();
        $model->id = $id;
        return $model;
    }, $ids);

    return new Collection($models);
}

describe('EloquentUnidadeReadRepository::isUsuarioGestorRecursivo', function () {

    test('retorna true quando unidade é diretamente gerida pelo usuário', function () {
        Cache::shouldReceive('remember')
            ->once()
            ->andReturn(['u-1', 'u-2']);

        $repo = criarRepository();

        expect($repo->isUsuarioGestorRecursivo('u-1', 'user-1'))->toBeTrue();
    });

    test('retorna true quando unidade é subordinada de uma unidade gerida', function () {
        Cache::shouldReceive('remember')
            ->once()
            ->andReturn(['u-pai']);

        Cache::shouldReceive('remember')
            ->once()
            ->andReturn(['u-filho', 'u-neto']);

        $repo = criarRepository();

        expect($repo->isUsuarioGestorRecursivo('u-neto', 'user-1'))->toBeTrue();
    });

    test('retorna false quando unidade não está em nenhuma árvore gerida', function () {
        Cache::shouldReceive('remember')
            ->once()
            ->andReturn(['u-pai']);

        Cache::shouldReceive('remember')
            ->once()
            ->andReturn(['u-filho', 'u-neto']);

        $repo = criarRepository();

        expect($repo->isUsuarioGestorRecursivo('u-outro', 'user-1'))->toBeFalse();
    });

    test('retorna false quando usuário não gerencia nenhuma unidade', function () {
        Cache::shouldReceive('remember')
            ->once()
            ->andReturn([]);

        $repo = criarRepository();

        expect($repo->isUsuarioGestorRecursivo('u-1', 'user-1'))->toBeFalse();
    });

    test('popula cache de unidades geridas no primeiro acesso', function () {
        Cache::shouldReceive('remember')
            ->once()
            ->withArgs(function (string $key, int $ttl, Closure $callback) {
                expect($key)->toBe('unidades-geridas:user-1');
                expect($ttl)->toBe(3600);
                return true;
            })
            ->andReturnUsing(fn ($key, $ttl, $cb) => $cb());

        $repo = criarRepository();
        $repo->shouldReceive('getUnidadesGerenciadas')
            ->once()
            ->with('user-1')
            ->andReturn(mockCollection(['u-1']));

        $repo->isUsuarioGestorRecursivo('u-1', 'user-1');
    });

    test('popula cache de hierarquia no primeiro acesso', function () {
        Cache::shouldReceive('remember')
            ->once()
            ->andReturn(['u-pai']);

        Cache::shouldReceive('remember')
            ->once()
            ->withArgs(function (string $key, int $ttl, Closure $callback) {
                expect($key)->toBe('unidade-hierarquia:u-pai');
                expect($ttl)->toBe(3600);
                return true;
            })
            ->andReturnUsing(fn ($key, $ttl, $cb) => $cb());

        $repo = criarRepository();
        $repo->shouldReceive('getSubordinadasRecursivas')
            ->once()
            ->with(['u-pai'])
            ->andReturn(mockCollection(['u-filho']));

        $repo->isUsuarioGestorRecursivo('u-filho', 'user-1');
    });
});
