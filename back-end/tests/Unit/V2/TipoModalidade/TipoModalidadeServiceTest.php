<?php

use App\V2\TipoModalidade\TipoModalidadeService;
use App\Repository\TipoModalidadeRepository;
use Illuminate\Support\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->repository = Mockery::mock(TipoModalidadeRepository::class);
    $this->service = new TipoModalidadeService($this->repository);
});

afterEach(function () {
    Mockery::close();
});

describe('TipoModalidadeService::index', function () {

    test('delega ao repository e retorna collection', function () {
        $collection = new Collection([
            (object) ['id' => 'mod-1', 'nome' => 'Presencial'],
            (object) ['id' => 'mod-2', 'nome' => 'Teletrabalho'],
        ]);

        $this->repository
            ->shouldReceive('getAll')
            ->once()
            ->andReturn($collection);

        $result = $this->service->index();

        expect($result)->toBe($collection)
            ->and($result)->toHaveCount(2);
    });

    test('retorna collection vazia quando não há registros', function () {
        $this->repository
            ->shouldReceive('getAll')
            ->once()
            ->andReturn(new Collection());

        $result = $this->service->index();

        expect($result)->toBeInstanceOf(Collection::class)
            ->and($result)->toHaveCount(0);
    });
});
