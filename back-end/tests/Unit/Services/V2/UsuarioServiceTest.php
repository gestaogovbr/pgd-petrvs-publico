<?php

namespace Tests\Unit\Services\V2;

use App\V2\Usuario\UsuarioService;
use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;
use Mockery;

afterEach(function () {
    Mockery::close();
});

test('buscarPorNomeOuMatricula delega ao repository e retorna collection', function () {
    $expected = new Collection([
        (object) ['id' => fake()->uuid(), 'nome' => 'João Silva', 'matricula' => '12345'],
    ]);

    $repo = Mockery::mock(UsuarioReadRepositoryContract::class);
    $repo->shouldReceive('findByNomeMatricula')
        ->once()
        ->with('João')
        ->andReturn($expected);

    $service = new UsuarioService($repo);
    $result = $service->buscarPorNomeOuMatricula('João');

    expect($result)->toBe($expected);
})->group('v2-usuario');

test('buscarPorNomeOuMatricula retorna collection vazia quando nenhum resultado', function () {
    $repo = Mockery::mock(UsuarioReadRepositoryContract::class);
    $repo->shouldReceive('findByNomeMatricula')
        ->once()
        ->with('inexistente')
        ->andReturn(new Collection());

    $service = new UsuarioService($repo);
    $result = $service->buscarPorNomeOuMatricula('inexistente');

    expect($result)->toBeInstanceOf(Collection::class)
        ->and($result)->toBeEmpty();
})->group('v2-usuario');

test('buscarPorNomeOuMatricula propaga exceção do repository', function () {
    $repo = Mockery::mock(UsuarioReadRepositoryContract::class);
    $repo->shouldReceive('findByNomeMatricula')
        ->once()
        ->andThrow(new \RuntimeException('Erro de conexão'));

    $service = new UsuarioService($repo);
    $service->buscarPorNomeOuMatricula('João');
})->throws(\RuntimeException::class, 'Erro de conexão')
  ->group('v2-usuario');
