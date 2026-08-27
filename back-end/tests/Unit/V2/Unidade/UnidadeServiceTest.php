<?php

use App\V2\Unidade\UnidadeService;
use App\V2\Unidade\DTOs\UnidadeIndexDTO;
use App\Repository\UnidadeRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $this->service = new UnidadeService($this->unidadeRepository);
});

afterEach(function () {
    Mockery::close();
});

describe('UnidadeService::index', function () {

    test('delega ao repository com DTO e retorna paginator', function () {
        $dto = UnidadeIndexDTO::fromRequest(['filters' => ['termo' => 'Financ'], 'page' => 1, 'size' => 20]);

        $paginator = new LengthAwarePaginator(
            [(object) ['id' => 'u-1', 'nome' => 'Financeiro', 'codigo' => '001', 'sigla' => 'FIN']],
            1,
            20,
        );

        $this->unidadeRepository
            ->shouldReceive('index')
            ->once()
            ->with($dto)
            ->andReturn($paginator);

        $result = $this->service->index($dto);

        expect($result)->toBe($paginator)
            ->and($result->total())->toBe(1);
    });

    test('retorna paginator vazio quando nenhuma unidade corresponde', function () {
        $dto = UnidadeIndexDTO::fromRequest(['filters' => ['termo' => 'XYZ']]);

        $paginator = new LengthAwarePaginator([], 0, 20);

        $this->unidadeRepository
            ->shouldReceive('index')
            ->once()
            ->andReturn($paginator);

        $result = $this->service->index($dto);

        expect($result)->toBeInstanceOf(LengthAwarePaginator::class)
            ->and($result->total())->toBe(0);
    });

    test('retorna unidades quando termo é null', function () {
        $dto = UnidadeIndexDTO::fromRequest([]);

        $paginator = new LengthAwarePaginator(
            [(object) ['id' => 'u-1', 'nome' => 'Financeiro', 'codigo' => '001', 'sigla' => 'FIN']],
            1,
            20,
        );

        $this->unidadeRepository
            ->shouldReceive('index')
            ->once()
            ->andReturn($paginator);

        $result = $this->service->index($dto);

        expect($result->total())->toBe(1);
    });

    test('passa DTO com page e perPage corretos ao repository', function () {
        $dto = UnidadeIndexDTO::fromRequest(['page' => 3, 'size' => 10]);

        $paginator = new LengthAwarePaginator([], 0, 10, 3);

        $this->unidadeRepository
            ->shouldReceive('index')
            ->once()
            ->withArgs(fn ($d) => $d->page === 3 && $d->perPage === 10)
            ->andReturn($paginator);

        $result = $this->service->index($dto);

        expect($result->total())->toBe(0);
    });
});
