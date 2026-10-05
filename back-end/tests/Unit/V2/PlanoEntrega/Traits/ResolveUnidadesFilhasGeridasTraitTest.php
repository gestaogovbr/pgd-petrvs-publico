<?php

use App\Cache\GestorHierarquiaCache;
use App\Repository\PlanoEntregaRepository;
use App\Repository\UnidadeRepository;
use App\V2\PlanoEntrega\DataProviders\AvaliacaoPendentePEDataProvider;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Tests\TestCase;

uses(TestCase::class);

const CACHE_USUARIO = 'user-cache-1';

/** Coleção mockada cujo pluck('id') retorna os ids informados. */
function unidadesCollection(array $ids): Collection
{
    $models = array_map(function (string $id) {
        $model = Mockery::mock(\App\Models\Unidade::class)->makePartial();
        $model->id = $id;

        return $model;
    }, $ids);

    return new Collection($models);
}

beforeEach(function () {
    Cache::flush();
    $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $this->planoEntregaRepository = Mockery::mock(PlanoEntregaRepository::class);

    $this->fazerProvider = fn () => new AvaliacaoPendentePEDataProvider(
        $this->unidadeRepository,
        $this->planoEntregaRepository,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('ResolveUnidadesFilhasGeridasTrait (cache)', function () {

    test('memoiza a hierarquia na mesma instância: count() + buscar() consultam uma vez só', function () {
        // Geridas e subordinadas devem ser consultadas EXATAMENTE uma vez, mesmo com 2 chamadas.
        $this->unidadeRepository->shouldReceive('getUnidadesGerenciadas')
            ->once()->with(CACHE_USUARIO)
            ->andReturn(unidadesCollection(['unidade-mae']));

        $this->unidadeRepository->shouldReceive('getSubordinadas')
            ->once()->with(['unidade-mae'])
            ->andReturn(unidadesCollection(['filha-1', 'filha-2']));

        $this->planoEntregaRepository->shouldReceive('countPlanosEntregaAvaliacao')
            ->once()->with(['filha-1', 'filha-2'], Mockery::any())
            ->andReturn(3);

        $this->planoEntregaRepository->shouldReceive('paginatePlanosEntregaAvaliacao')
            ->once()
            ->andReturn(new LengthAwarePaginator([], 3, 15, 1));

        $provider = ($this->fazerProvider)();

        expect($provider->count(CACHE_USUARIO))->toBe(3);
        expect($provider->buscar(CACHE_USUARIO)->total())->toBe(3);
    });

    test('cacheia as unidades geridas e as filhas diretas entre instâncias', function () {
        // getUnidadesGerenciadas é o loader do cache — deve rodar só na 1ª instância.
        $this->unidadeRepository->shouldReceive('getUnidadesGerenciadas')
            ->once()->with(CACHE_USUARIO)
            ->andReturn(unidadesCollection(['unidade-mae']));

        // getSubordinadas (filhas diretas) agora é cacheado por unidade — roda só 1x.
        $this->unidadeRepository->shouldReceive('getSubordinadas')
            ->once()->with(['unidade-mae'])
            ->andReturn(unidadesCollection(['filha-1']));

        $this->planoEntregaRepository->shouldReceive('countPlanosEntregaAvaliacao')
            ->twice()->with(['filha-1'], Mockery::any())->andReturn(1);

        ($this->fazerProvider)()->count(CACHE_USUARIO);
        ($this->fazerProvider)()->count(CACHE_USUARIO);

        // Confirma que ambos os caches foram populados corretamente.
        $geridas = GestorHierarquiaCache::getUnidadesGeridas(CACHE_USUARIO, fn () => ['NAO_DEVE_SER_CHAMADO']);
        expect($geridas)->toBe(['unidade-mae']);

        $filhas = GestorHierarquiaCache::getSubordinadasDiretas('unidade-mae', fn () => ['NAO_DEVE_SER_CHAMADO']);
        expect($filhas)->toBe(['filha-1']);
    });

    test('sem unidades geridas retorna vazio e não consulta subordinadas nem conta', function () {
        $this->unidadeRepository->shouldReceive('getUnidadesGerenciadas')
            ->once()->with(CACHE_USUARIO)
            ->andReturn(unidadesCollection([]));

        $this->unidadeRepository->shouldNotReceive('getSubordinadas');

        $this->planoEntregaRepository->shouldReceive('countPlanosEntregaAvaliacao')
            ->once()->with([], Mockery::any())
            ->andReturn(0);

        expect(($this->fazerProvider)()->count(CACHE_USUARIO))->toBe(0);
    });
});
