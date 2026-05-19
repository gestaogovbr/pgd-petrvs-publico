<?php

use App\Repository\TipoMotivoAfastamentoRepository;
use App\V2\TipoMotivoAfastamento\TipoMotivoAfastamentoService;
use Illuminate\Support\Collection;

afterAll(function () {
    Mockery::close();
});

describe('TipoMotivoAfastamentoService', function () {
    test('index retorna coleção do repository', function () {
        $expected = new Collection([
            (object) ['id' => 'uuid-1', 'codigo' => '001', 'nome' => 'Férias'],
            (object) ['id' => 'uuid-2', 'codigo' => '002', 'nome' => 'Licença médica'],
        ]);

        $repository = Mockery::mock(TipoMotivoAfastamentoRepository::class);
        $repository->shouldReceive('getAllForDropdown')->once()->andReturn($expected);

        $service = new TipoMotivoAfastamentoService($repository);

        $result = $service->index();

        expect($result)->toBe($expected);
        expect($result)->toHaveCount(2);
    });

    test('index retorna coleção vazia quando não há registros', function () {
        $repository = Mockery::mock(TipoMotivoAfastamentoRepository::class);
        $repository->shouldReceive('getAllForDropdown')->once()->andReturn(new Collection());

        $service = new TipoMotivoAfastamentoService($repository);

        expect($service->index())->toBeEmpty();
    });
});
