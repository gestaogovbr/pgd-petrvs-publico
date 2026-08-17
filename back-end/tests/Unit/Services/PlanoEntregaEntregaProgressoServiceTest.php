<?php

use App\Enums\StatusEnum;
use App\Exceptions\ServerException;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Services\PlanoEntregaEntregaProgressoService;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarServiceComStatus(string $entregaId, ?string $status): PlanoEntregaEntregaProgressoService
{
    $service = Mockery::mock(PlanoEntregaEntregaProgressoService::class)->makePartial();
    $service->shouldAllowMockingProtectedMethods();

    if ($status === null) {
        $service->shouldReceive('findEntrega')->with($entregaId)->andReturn(null);
    } else {
        $mockPlanoEntrega = Mockery::mock(PlanoEntrega::class)->makePartial();
        $mockPlanoEntrega->status = $status;

        $mockEntrega = Mockery::mock(PlanoEntregaEntrega::class)->makePartial();
        $mockEntrega->shouldReceive('getAttribute')->with('planoEntrega')->andReturn($mockPlanoEntrega);

        $service->shouldReceive('findEntrega')->with($entregaId)->andReturn($mockEntrega);
    }

    return $service;
}

describe('PlanoEntregaEntregaProgressoService - validateStore', function () {
    test('permite store quando plano de entrega está ATIVO', function () {
        $entregaId = 'entrega-uuid-123';
        $service = criarServiceComStatus($entregaId, StatusEnum::ATIVO->value);

        $service->validateStore(['plano_entrega_entrega_id' => $entregaId], null, 'INSERT');

        expect(true)->toBeTrue();
    });

    test('bloqueia store quando plano de entrega está CONCLUIDO', function () {
        $entregaId = 'entrega-uuid-123';
        $service = criarServiceComStatus($entregaId, StatusEnum::CONCLUIDO->value);

        $service->validateStore(['plano_entrega_entrega_id' => $entregaId], null, 'INSERT');
    })->throws(ServerException::class);

    test('bloqueia store quando plano de entrega está SUSPENSO', function () {
        $entregaId = 'entrega-uuid-123';
        $service = criarServiceComStatus($entregaId, StatusEnum::SUSPENSO->value);

        $service->validateStore(['plano_entrega_entrega_id' => $entregaId], null, 'INSERT');
    })->throws(ServerException::class);

    test('bloqueia store quando plano de entrega está CANCELADO', function () {
        $entregaId = 'entrega-uuid-123';
        $service = criarServiceComStatus($entregaId, StatusEnum::CANCELADO->value);

        $service->validateStore(['plano_entrega_entrega_id' => $entregaId], null, 'INSERT');
    })->throws(ServerException::class);

    test('bloqueia store quando plano de entrega está INCLUIDO', function () {
        $entregaId = 'entrega-uuid-123';
        $service = criarServiceComStatus($entregaId, StatusEnum::INCLUIDO->value);

        $service->validateStore(['plano_entrega_entrega_id' => $entregaId], null, 'INSERT');
    })->throws(ServerException::class);

    test('bloqueia store quando entrega não é encontrada', function () {
        $entregaId = 'entrega-inexistente';
        $service = criarServiceComStatus($entregaId, null);

        $service->validateStore(['plano_entrega_entrega_id' => $entregaId], null, 'INSERT');
    })->throws(ServerException::class);

    test('bloqueia store quando plano de entrega está AVALIADO', function () {
        $entregaId = 'entrega-uuid-123';
        $service = criarServiceComStatus($entregaId, StatusEnum::AVALIADO->value);

        $service->validateStore(['plano_entrega_entrega_id' => $entregaId], null, 'INSERT');
    })->throws(ServerException::class);
});

describe('PlanoEntregaEntregaProgressoService - extraDestroy', function () {
    test('permite exclusão quando plano de entrega está ATIVO', function () {
        $entregaId = 'entrega-uuid-123';
        $data = ['plano_entrega_entrega_id' => $entregaId];
        $service = criarServiceComStatus($entregaId, StatusEnum::ATIVO->value);
        $service->shouldReceive('updateEntrega')->once()->with($data);

        $service->extraDestroy($data);

        expect(true)->toBeTrue();
    });

    test('bloqueia exclusão quando plano de entrega está CONCLUIDO', function () {
        $entregaId = 'entrega-uuid-123';
        $service = criarServiceComStatus($entregaId, StatusEnum::CONCLUIDO->value);
        $service->shouldReceive('updateEntrega')->never();

        $service->extraDestroy(['plano_entrega_entrega_id' => $entregaId]);
    })->throws(ServerException::class);

    test('bloqueia exclusão quando plano de entrega está AVALIADO', function () {
        $entregaId = 'entrega-uuid-123';
        $service = criarServiceComStatus($entregaId, StatusEnum::AVALIADO->value);
        $service->shouldReceive('updateEntrega')->never();

        $service->extraDestroy(['plano_entrega_entrega_id' => $entregaId]);
    })->throws(ServerException::class);
});
