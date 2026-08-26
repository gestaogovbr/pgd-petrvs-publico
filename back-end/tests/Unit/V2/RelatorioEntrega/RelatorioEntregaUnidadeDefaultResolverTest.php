<?php

declare(strict_types=1);

use App\Models\UnidadeIntegrante;
use App\Models\Usuario;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeRepository;
use App\V2\RelatorioEntrega\Support\RelatorioEntregaUnidadeDefaultResolver;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Session;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
    Session::forget('unidade_id');
});

function makeUsuarioRE(string $id = 'usuario-1'): Usuario
{
    $usuario = new Usuario();
    $usuario->id = $id;
    $usuario->exists = true;

    return $usuario;
}

function makeIntegrantes(array $unidadeIds): Collection
{
    return new Collection(array_map(
        fn (string $unidadeId) => new UnidadeIntegrante(['unidade_id' => $unidadeId]),
        $unidadeIds,
    ));
}

test('retorna unidade mais alta na hierarquia com atribuicao ativa', function () {
    $unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $unidadeRepository->shouldReceive('linhaAscendente')
        ->with('unidade-filha')
        ->andReturn(['unidade-raiz', 'unidade-pai', 'unidade-filha']);
    $unidadeRepository->shouldReceive('linhaAscendente')
        ->with('unidade-pai')
        ->andReturn(['unidade-raiz', 'unidade-pai']);

    $integranteRepository = Mockery::mock(UnidadeIntegranteRepository::class);
    $integranteRepository->shouldReceive('findAllComAtribuicoesAtivasByUsuario')
        ->with('usuario-1')
        ->andReturn(makeIntegrantes(['unidade-filha', 'unidade-pai']));

    $resolver = new RelatorioEntregaUnidadeDefaultResolver($unidadeRepository, $integranteRepository);

    expect($resolver->resolve(makeUsuarioRE()))->toBe('unidade-pai');
});

test('ignora unidades apenas com atribuicao removida', function () {
    $unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $unidadeRepository->shouldReceive('linhaAscendente')
        ->once()
        ->with('unidade-ativa')
        ->andReturn(['unidade-raiz', 'unidade-ativa']);

    $integranteRepository = Mockery::mock(UnidadeIntegranteRepository::class);
    $integranteRepository->shouldReceive('findAllComAtribuicoesAtivasByUsuario')
        ->with('usuario-1')
        ->andReturn(makeIntegrantes(['unidade-ativa']));

    $resolver = new RelatorioEntregaUnidadeDefaultResolver($unidadeRepository, $integranteRepository);

    expect($resolver->resolve(makeUsuarioRE()))->toBe('unidade-ativa');
});

test('em empate no mesmo nivel prioriza unidade atual do usuario', function () {
    Session::put('unidade_id', 'unidade-b');

    $unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $unidadeRepository->shouldReceive('linhaAscendente')
        ->with('unidade-a')
        ->andReturn(['unidade-raiz', 'unidade-a']);
    $unidadeRepository->shouldReceive('linhaAscendente')
        ->with('unidade-b')
        ->andReturn(['unidade-raiz', 'unidade-b']);

    $integranteRepository = Mockery::mock(UnidadeIntegranteRepository::class);
    $integranteRepository->shouldReceive('findAllComAtribuicoesAtivasByUsuario')
        ->with('usuario-1')
        ->andReturn(makeIntegrantes(['unidade-a', 'unidade-b']));

    $resolver = new RelatorioEntregaUnidadeDefaultResolver($unidadeRepository, $integranteRepository);

    expect($resolver->resolve(makeUsuarioRE()))->toBe('unidade-b');
});

test('nao usa unidade da sessao quando nao possui atribuicao ativa nela', function () {
    Session::put('unidade_id', 'unidade-seges');

    $unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $unidadeRepository->shouldReceive('linhaAscendente')
        ->with('unidade-coor-pi')
        ->andReturn(['unidade-raiz', 'unidade-seges', 'unidade-coor-pi']);
    $unidadeRepository->shouldReceive('linhaAscendente')
        ->with('unidade-cgm')
        ->andReturn(['unidade-raiz', 'unidade-seges', 'unidade-cgm']);

    $integranteRepository = Mockery::mock(UnidadeIntegranteRepository::class);
    $integranteRepository->shouldReceive('findAllComAtribuicoesAtivasByUsuario')
        ->with('usuario-1')
        ->andReturn(makeIntegrantes(['unidade-coor-pi', 'unidade-cgm']));

    $resolver = new RelatorioEntregaUnidadeDefaultResolver($unidadeRepository, $integranteRepository);

    expect($resolver->resolve(makeUsuarioRE()))->toBe('unidade-cgm');
});

test('retorna null quando usuario nao possui atribuicao ativa', function () {
    $unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $integranteRepository = Mockery::mock(UnidadeIntegranteRepository::class);
    $integranteRepository->shouldReceive('findAllComAtribuicoesAtivasByUsuario')
        ->with('usuario-1')
        ->andReturn(new Collection());

    $resolver = new RelatorioEntregaUnidadeDefaultResolver($unidadeRepository, $integranteRepository);

    expect($resolver->resolve(makeUsuarioRE()))->toBeNull();
});
