<?php

use App\V2\Unidade\UnidadeService;
use App\V2\Unidade\DTOs\UnidadeBuscaDTO;
use App\Repository\UnidadeRepository;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $this->service = new UnidadeService($this->unidadeRepository);
});

afterEach(function () {
    Mockery::close();
});

describe('UnidadeService::buscarPorNomeOuCodigo', function () {

    test('delega ao repository com DTO e retorna collection', function () {
        $dto = UnidadeBuscaDTO::fromArray(['nome_codigo' => 'Financ']);

        $collection = new Collection([
            (object) ['id' => 'u-1', 'nome' => 'Financeiro', 'codigo' => '001', 'sigla' => 'FIN'],
        ]);

        $this->unidadeRepository
            ->shouldReceive('buscarPorNomeOuCodigo')
            ->once()
            ->with($dto)
            ->andReturn($collection);

        $result = $this->service->buscarPorNomeOuCodigo($dto);

        expect($result)->toBe($collection)
            ->and($result)->toHaveCount(1);
    });

    test('retorna collection vazia quando nenhuma unidade corresponde', function () {
        $dto = UnidadeBuscaDTO::fromArray(['nome_codigo' => 'XYZ']);

        $this->unidadeRepository
            ->shouldReceive('buscarPorNomeOuCodigo')
            ->once()
            ->andReturn(new Collection());

        $result = $this->service->buscarPorNomeOuCodigo($dto);

        expect($result)->toBeInstanceOf(Collection::class)
            ->and($result)->toHaveCount(0);
    });

    test('retorna unidades quando termo é null', function () {
        $dto = UnidadeBuscaDTO::fromArray([]);

        $collection = new Collection([
            (object) ['id' => 'u-1', 'nome' => 'Financeiro', 'codigo' => '001', 'sigla' => 'FIN'],
        ]);

        $this->unidadeRepository
            ->shouldReceive('buscarPorNomeOuCodigo')
            ->once()
            ->andReturn($collection);

        $result = $this->service->buscarPorNomeOuCodigo($dto);

        expect($result)->toHaveCount(1);
    });

    test('passa DTO com todos true ao repository', function () {
        $dto = UnidadeBuscaDTO::fromArray(['todos' => true]);

        $this->unidadeRepository
            ->shouldReceive('buscarPorNomeOuCodigo')
            ->once()
            ->withArgs(fn ($d) => $d->todos === true)
            ->andReturn(new Collection());

        $result = $this->service->buscarPorNomeOuCodigo($dto);

        expect($result)->toHaveCount(0);
    });
});
