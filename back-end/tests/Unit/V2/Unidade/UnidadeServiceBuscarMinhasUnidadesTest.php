<?php

use App\Repository\UnidadeRepository;
use App\V2\Unidade\UnidadeService;
use App\V2\Unidade\DTOs\UnidadeResumoDTO;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

uses(Tests\TestCase::class);

beforeEach(function () {
    Cache::flush();
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->service = new UnidadeService($this->unidadeRepo);
    Auth::shouldReceive('id')->andReturn('user-1');
});

afterEach(fn () => Mockery::close());

describe('UnidadeService::buscarMinhasUnidades', function () {

    test('sem subordinadas retorna apenas unidades com atribuição', function () {
        $this->unidadeRepo->shouldReceive('getUnidadesComAtribuicaoIds')
            ->with('user-1')
            ->andReturn(['u-1', 'u-2']);

        $this->unidadeRepo->shouldNotReceive('getSubordinadasRecursivasIds');

        $this->unidadeRepo->shouldReceive('buscarResumoPorIds')
            ->with(['u-1', 'u-2'])
            ->andReturn(new EloquentCollection([
                (object) ['id' => 'u-1', 'sigla' => 'A', 'nome' => 'Unidade A'],
                (object) ['id' => 'u-2', 'sigla' => 'B', 'nome' => 'Unidade B'],
            ]));

        $result = $this->service->buscarMinhasUnidades(false);

        expect($result)->toHaveCount(2)
            ->and($result[0])->toBeInstanceOf(UnidadeResumoDTO::class)
            ->and($result[0]->sigla)->toBe('A');
    });

    test('com subordinadas adiciona as subordinadas recursivas ao escopo', function () {
        $this->unidadeRepo->shouldReceive('getUnidadesComAtribuicaoIds')
            ->with('user-1')
            ->andReturn(['u-1']);

        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivasIds')
            ->with(['u-1'])
            ->andReturn(['sub-1', 'sub-2']);

        $this->unidadeRepo->shouldReceive('buscarResumoPorIds')
            ->with(Mockery::on(fn ($ids) => count($ids) === 3
                && in_array('u-1', $ids) && in_array('sub-1', $ids) && in_array('sub-2', $ids)))
            ->andReturn(new EloquentCollection([
                (object) ['id' => 'u-1', 'sigla' => 'A', 'nome' => 'Unidade A'],
                (object) ['id' => 'sub-1', 'sigla' => 'S1', 'nome' => 'Sub 1'],
                (object) ['id' => 'sub-2', 'sigla' => 'S2', 'nome' => 'Sub 2'],
            ]));

        $result = $this->service->buscarMinhasUnidades(true);

        expect($result)->toHaveCount(3);
    });

    test('retorna vazio quando usuário não tem atribuição', function () {
        $this->unidadeRepo->shouldReceive('getUnidadesComAtribuicaoIds')
            ->with('user-1')
            ->andReturn([]);

        $this->unidadeRepo->shouldNotReceive('buscarResumoPorIds');

        $result = $this->service->buscarMinhasUnidades(false);

        expect($result)->toBe([]);
    });

    test('usa cache para as unidades com atribuição em chamadas repetidas', function () {
        $this->unidadeRepo->shouldReceive('getUnidadesComAtribuicaoIds')
            ->with('user-1')
            ->once()
            ->andReturn(['u-1']);

        $this->unidadeRepo->shouldReceive('buscarResumoPorIds')
            ->andReturn(new EloquentCollection([
                (object) ['id' => 'u-1', 'sigla' => 'A', 'nome' => 'Unidade A'],
            ]));

        $this->service->buscarMinhasUnidades(false);
        $this->service->buscarMinhasUnidades(false);

        expect(true)->toBeTrue();
    });
});
