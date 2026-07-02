<?php

use App\Repository\SipecSyncCheckpointRepository;
use App\Repository\SipecUnidadeRepository;
use App\Services\Sipec\SipecService;
use App\Services\Sipec\Unidade\SipecUnidadeSincronizacaoService;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function buildUnidadeSincronizacaoService(
    ?SipecService $sipecService = null,
    ?SipecUnidadeRepository $unidadeRepo = null,
    ?SipecSyncCheckpointRepository $checkpointRepo = null,
): SipecUnidadeSincronizacaoService {
    $sipecService ??= Mockery::mock(SipecService::class);
    $unidadeRepo ??= Mockery::mock(SipecUnidadeRepository::class);
    $checkpointRepo ??= Mockery::mock(SipecSyncCheckpointRepository::class);

    $service = new SipecUnidadeSincronizacaoService($sipecService);

    $reflection = new ReflectionClass($service);

    $prop = $reflection->getProperty('sipecUnidadeRepository');
    $prop->setAccessible(true);
    $prop->setValue($service, $unidadeRepo);

    $prop = $reflection->getProperty('checkpointRepository');
    $prop->setAccessible(true);
    $prop->setValue($service, $checkpointRepo);

    return $service;
}

describe('SipecUnidadeSincronizacaoService - buscarUnidade', function () {

    test('deve retornar unidade quando codUorg encontrado na resposta', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodUorg')->once()->andReturn('1234');
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn([
                'content' => [
                    ['codUorg' => '1234', 'nome' => 'Unidade Principal'],
                    ['codUorg' => '5678', 'nome' => 'Outra Unidade'],
                ],
            ]);

        $service = buildUnidadeSincronizacaoService($sipecService);
        $resultado = $service->buscarUnidade();

        expect($resultado)->not->toBeNull();
        expect($resultado['nome'])->toBe('Unidade Principal');
    });

    test('deve usar codUorg informado como parâmetro', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodUorg')->never();
        $sipecService->shouldReceive('getCodOrgao')->once()->andReturn('');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn(['content' => [['codUorg' => '9999', 'nome' => 'Específica']]]);

        $service = buildUnidadeSincronizacaoService($sipecService);
        $resultado = $service->buscarUnidade('9999');

        expect($resultado['nome'])->toBe('Específica');
    });

    test('deve retornar null quando resposta vazia', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodUorg')->once()->andReturn('1234');
        $sipecService->shouldReceive('getCodOrgao')->once()->andReturn('');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn(['content' => []]);

        $service = buildUnidadeSincronizacaoService($sipecService);
        $resultado = $service->buscarUnidade();

        expect($resultado)->toBeNull();
    });

    test('deve retornar null e logar warning quando exceção ocorre', function () {
        Log::shouldReceive('warning')->once();

        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodUorg')->once()->andReturn('1234');
        $sipecService->shouldReceive('getCodOrgao')->once()->andReturn('');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andThrow(new \Exception('Timeout'));

        $service = buildUnidadeSincronizacaoService($sipecService);
        $resultado = $service->buscarUnidade();

        expect($resultado)->toBeNull();
    });

    test('deve retornar primeiro item quando codUorg não bate com nenhum', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodUorg')->once()->andReturn('0000');
        $sipecService->shouldReceive('getCodOrgao')->once()->andReturn('');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn(['content' => [['codUorg' => '1111', 'nome' => 'Fallback']]]);

        $service = buildUnidadeSincronizacaoService($sipecService);
        $resultado = $service->buscarUnidade();

        expect($resultado['nome'])->toBe('Fallback');
    });
});

describe('SipecUnidadeSincronizacaoService - coletarUnidadesPaginado', function () {

    test('deve persistir unidades e atualizar checkpoint', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn([
                'content' => [
                    ['codUorg' => '1000', 'dataUltimaTransacao' => '2025-01-01'],
                    ['codUorg' => '2000', 'dataUltimaTransacao' => null],
                ],
                'totalPages' => 1,
            ]);

        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')
            ->with('1000', Mockery::type('string'), false, '2025-01-01')
            ->once();
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')
            ->with('2000', Mockery::type('string'), false, null)
            ->once();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'unidades', 1, 1)
            ->once();

        $service = buildUnidadeSincronizacaoService($sipecService, $unidadeRepo, $checkpointRepo);
        $total = $service->coletarUnidadesPaginado('tenant-1', 0);

        expect($total)->toBe(2);
    });

    test('deve iterar múltiplas páginas', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->twice()
            ->andReturn(
                ['content' => [['codUorg' => '1000', 'dataUltimaTransacao' => null]], 'totalPages' => 2],
                ['content' => [['codUorg' => '2000', 'dataUltimaTransacao' => null]], 'totalPages' => 2],
            );

        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')->twice();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'unidades', 1, 2)->once();
        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'unidades', 2, 2)->once();

        $service = buildUnidadeSincronizacaoService($sipecService, $unidadeRepo, $checkpointRepo);
        $total = $service->coletarUnidadesPaginado('tenant-1', 0);

        expect($total)->toBe(2);
    });

    test('deve retomar da página informada em startPage', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->with(Mockery::on(fn(string $path) => str_contains($path, 'page=3')), 2)
            ->andReturn([
                'content' => [['codUorg' => '5000', 'dataUltimaTransacao' => null]],
                'totalPages' => 4,
            ]);

        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')->once();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'unidades', 4, 4)->once();

        $service = buildUnidadeSincronizacaoService($sipecService, $unidadeRepo, $checkpointRepo);
        $total = $service->coletarUnidadesPaginado('tenant-1', 3);

        expect($total)->toBe(1);
    });

    test('deve retornar zero quando content vazio', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn(['content' => [], 'totalPages' => 1]);

        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $unidadeRepo->shouldNotReceive('updateOrCreateByCodigo');

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldReceive('updateByTenantId')->once();

        $service = buildUnidadeSincronizacaoService($sipecService, $unidadeRepo, $checkpointRepo);
        $total = $service->coletarUnidadesPaginado('tenant-1', 0);

        expect($total)->toBe(0);
    });
});
