<?php

use App\Models\PlanoEntregaEntregaProgresso;
use App\Repository\PlanoEntregaEntregaProgresso\Contracts\PlanoEntregaEntregaProgressoReadRepositoryContract;
use App\Repository\PlanoEntregaEntregaProgressoRepository;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('PlanoEntregaEntregaProgressoRepository', function () {
    test('delega busca do progresso mais recente da entrega', function () {
        $progresso = Mockery::mock(PlanoEntregaEntregaProgresso::class);
        $readRepository = Mockery::mock(PlanoEntregaEntregaProgressoReadRepositoryContract::class);
        $readRepository->shouldReceive('findLatestByEntregaId')
            ->once()
            ->with('entrega-uuid-123')
            ->andReturn($progresso);

        $repository = new PlanoEntregaEntregaProgressoRepository($readRepository);

        expect($repository->findLatestByEntregaId('entrega-uuid-123'))->toBe($progresso);
    });
});
