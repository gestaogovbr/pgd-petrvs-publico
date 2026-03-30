<?php

use App\V2\PlanoEntrega\PlanoEntregaService;
use App\V2\PlanoEntrega\DTOs\PlanoEntregaBuscaDTO;
use App\Repository\PlanoEntregaRepository;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoEntregaRepository = Mockery::mock(PlanoEntregaRepository::class);
    $this->service = new PlanoEntregaService($this->planoEntregaRepository);
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoEntregaService::buscarPorUnidade', function () {

    test('delega ao repository com DTO e retorna collection', function () {
        $dto = PlanoEntregaBuscaDTO::fromArray(['unidade_id' => 'unidade-1']);

        $collection = new Collection([
            (object) ['id' => 'pe-1', 'nome' => 'Plano A', 'numero' => 1, 'status' => 'ATIVO'],
        ]);

        $this->planoEntregaRepository
            ->shouldReceive('findByUnidadeId')
            ->once()
            ->with($dto->unidadeId)
            ->andReturn($collection);

        $result = $this->service->buscarPorUnidade($dto);

        expect($result)->toBe($collection)
            ->and($result)->toHaveCount(1);
    });

    test('retorna collection vazia quando unidade não tem planos', function () {
        $dto = PlanoEntregaBuscaDTO::fromArray(['unidade_id' => 'unidade-sem-plano']);

        $this->planoEntregaRepository
            ->shouldReceive('findByUnidadeId')
            ->once()
            ->with($dto->unidadeId)
            ->andReturn(new Collection());

        $result = $this->service->buscarPorUnidade($dto);

        expect($result)->toBeInstanceOf(Collection::class)
            ->and($result)->toHaveCount(0);
    });

    test('retorna múltiplos planos da unidade', function () {
        $dto = PlanoEntregaBuscaDTO::fromArray(['unidade_id' => 'unidade-1']);

        $collection = new Collection([
            (object) ['id' => 'pe-1', 'nome' => 'Plano A'],
            (object) ['id' => 'pe-2', 'nome' => 'Plano B'],
            (object) ['id' => 'pe-3', 'nome' => 'Plano C'],
        ]);

        $this->planoEntregaRepository
            ->shouldReceive('findByUnidadeId')
            ->once()
            ->andReturn($collection);

        $result = $this->service->buscarPorUnidade($dto);

        expect($result)->toHaveCount(3);
    });
});
