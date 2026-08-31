<?php

use App\Models\PlanoEntregaEntrega;
use App\Repository\PlanoEntregaEntrega\Contracts\PlanoEntregaEntregaReadRepositoryContract;
use App\Repository\PlanoEntregaEntrega\Contracts\PlanoEntregaEntregaWriteRepositoryContract;
use App\Repository\PlanoEntregaEntregaRepository;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('PlanoEntregaEntregaRepository', function () {
    test('delega busca e atualização da entrega', function () {
        $entrega = Mockery::mock(PlanoEntregaEntrega::class);
        $atributos = [
            'progresso_esperado' => 100,
            'data_inicio' => '2026-01-01',
            'data_fim' => '2026-12-31',
        ];

        $readRepository = Mockery::mock(PlanoEntregaEntregaReadRepositoryContract::class);
        $readRepository->shouldReceive('findById')->once()->with('entrega-uuid-123')->andReturn($entrega);

        $writeRepository = Mockery::mock(PlanoEntregaEntregaWriteRepositoryContract::class);
        $writeRepository->shouldReceive('update')->once()->with('entrega-uuid-123', $atributos)->andReturn($entrega);

        $repository = new PlanoEntregaEntregaRepository($readRepository, $writeRepository);

        expect($repository->findById('entrega-uuid-123'))->toBe($entrega);
        expect($repository->update('entrega-uuid-123', $atributos))->toBe($entrega);
    });
});
