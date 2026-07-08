<?php

namespace Tests\Unit\Services\Sipec;

use App\Exceptions\RequestConectaGovException;
use App\Exceptions\SipecApiRetryableException;
use App\Facades\SipecLog;
use App\Repository\SipecSyncCheckpointRepository;
use App\Services\Sipec\Servidor\SipecServidorSincronizacaoService;
use App\Services\Sipec\SipecService;
use App\Services\Sipec\Unidade\SipecUnidadeSincronizacaoService;
use Illuminate\Support\Facades\Cache;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

afterAll(function () {
    Mockery::close();
});

function buildSipecServiceMock(
    $sipecUnidadesService,
    $sipecServidoresService,
    $checkpointRepo
): \Mockery\MockInterface {
    $config = [
        'url' => 'https://fake-sipec.test',
        'conectagov_chave' => 'client_id',
        'conectagov_senha' => 'client_secret',
        'cpf' => '00000000000',
        'codUorg' => '1234',
        'codOrgao' => '17500',
    ];

    $service = Mockery::mock(SipecService::class)->makePartial();
    $service->shouldAllowMockingProtectedMethods();

    $reflection = new \ReflectionClass(SipecService::class);

    $props = [
        'url' => $config['url'],
        'codUorg' => $config['codUorg'],
        'codOrgao' => $config['codOrgao'],
        'cpf' => $config['cpf'],
        'client' => $config['conectagov_chave'],
        'secret' => $config['conectagov_senha'],
        'authorizationHeader' => 'Basic ' . base64_encode($config['conectagov_chave'] . ':' . $config['conectagov_senha']),
        'sipecUnidadesService' => $sipecUnidadesService,
        'sipecServidoresService' => $sipecServidoresService,
        'checkpointRepository' => $checkpointRepo,
    ];

    foreach ($props as $name => $value) {
        $prop = $reflection->getProperty($name);
        $prop->setAccessible(true);
        $prop->setValue($service, $value);
    }

    return $service;
}

function fakeCheckpoint(string $etapa, int $ultimaPagina): \Illuminate\Database\Eloquent\Model
{
    $model = Mockery::mock(\App\Models\SipecSyncCheckpoint::class)->makePartial();
    $model->shouldReceive('getAttribute')->with('etapa')->andReturn($etapa);
    $model->shouldReceive('getAttribute')->with('ultima_pagina')->andReturn($ultimaPagina);
    $model->shouldReceive('getAttribute')->with('total_paginas')->andReturn(null);
    $model->etapa = $etapa;
    $model->ultima_pagina = $ultimaPagina;
    $model->total_paginas = null;
    return $model;
}

describe('SipecService - executarFase0', function () {

    test('execução completa coleta unidades e servidores atualizando checkpoint', function () {

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadesService = Mockery::mock(SipecUnidadeSincronizacaoService::class);
        $servidoresService = Mockery::mock(SipecServidorSincronizacaoService::class);

        $checkpointRepo->shouldReceive('firstOrCreateByTenantId')
            ->once()
            ->with('tenant-1', 'unidades', 0)
            ->andReturn(fakeCheckpoint('unidades', 0));

        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'servidores', 0, null)
            ->once()->andReturn(null);

        $checkpointRepo->shouldReceive('findByTenantId')
            ->with('tenant-1')
            ->once()
            ->andReturn(fakeCheckpoint('servidores', 0));

        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'completo', 0, null)
            ->once()->andReturn(null);

        $unidadesService->shouldReceive('coletarUnidadesPaginado')
            ->once()
            ->with('tenant-1', 0, null)
            ->andReturn(3);

        $servidoresService->shouldReceive('coletarServidoresPaginado')
            ->once()
            ->with('tenant-1', 0, null)
            ->andReturn(5);

        $service = buildSipecServiceMock($unidadesService, $servidoresService, $checkpointRepo);

        $lock = Mockery::mock(\Illuminate\Contracts\Cache\Lock::class);
        $lock->shouldReceive('get')->once()->andReturn(true);
        $lock->shouldReceive('release')->once();
        Cache::shouldReceive('lock')->with('sipec_fase0_tenant-1', 600)->once()->andReturn($lock);

        $resultado = $service->executarFase0('tenant-1');

        expect($resultado)->toBe(['status' => 'completo', 'unidades' => 3, 'servidores' => 5]);
    });

    test('retorna status locked quando lock já está adquirido', function () {

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadesService = Mockery::mock(SipecUnidadeSincronizacaoService::class);
        $servidoresService = Mockery::mock(SipecServidorSincronizacaoService::class);

        $service = buildSipecServiceMock($unidadesService, $servidoresService, $checkpointRepo);

        $lock = Mockery::mock(\Illuminate\Contracts\Cache\Lock::class);
        $lock->shouldReceive('get')->once()->andReturn(false);
        Cache::shouldReceive('lock')->with('sipec_fase0_tenant-2', 600)->once()->andReturn($lock);

        $resultado = $service->executarFase0('tenant-2');

        expect($resultado)->toBe(['status' => 'locked', 'unidades' => 0, 'servidores' => 0]);
    });

    test('retoma da etapa servidores quando unidades já foram concluídas', function () {

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadesService = Mockery::mock(SipecUnidadeSincronizacaoService::class);
        $servidoresService = Mockery::mock(SipecServidorSincronizacaoService::class);

        $checkpointRepo->shouldReceive('firstOrCreateByTenantId')
            ->once()
            ->with('tenant-3', 'unidades', 0)
            ->andReturn(fakeCheckpoint('servidores', 3));

        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-3', 'completo', 0, null)
            ->once()->andReturn(null);

        // Não deve chamar coletarUnidadesPaginado
        $unidadesService->shouldNotReceive('coletarUnidadesPaginado');

        $servidoresService->shouldReceive('coletarServidoresPaginado')
            ->once()
            ->with('tenant-3', 3, null)
            ->andReturn(2);

        $service = buildSipecServiceMock($unidadesService, $servidoresService, $checkpointRepo);

        $lock = Mockery::mock(\Illuminate\Contracts\Cache\Lock::class);
        $lock->shouldReceive('get')->once()->andReturn(true);
        $lock->shouldReceive('release')->once();
        Cache::shouldReceive('lock')->with('sipec_fase0_tenant-3', 600)->once()->andReturn($lock);

        $resultado = $service->executarFase0('tenant-3');

        expect($resultado['status'])->toBe('completo');
        expect($resultado['unidades'])->toBe(0);
        expect($resultado['servidores'])->toBe(2);
    });

    test('ignora servidor sem CPF delegando para sub-service que retorna 0', function () {

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadesService = Mockery::mock(SipecUnidadeSincronizacaoService::class);
        $servidoresService = Mockery::mock(SipecServidorSincronizacaoService::class);

        $checkpointRepo->shouldReceive('firstOrCreateByTenantId')
            ->once()
            ->andReturn(fakeCheckpoint('servidores', 0));

        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-4', 'completo', 0, null)
            ->once()->andReturn(null);

        $servidoresService->shouldReceive('coletarServidoresPaginado')
            ->once()
            ->with('tenant-4', 0, null)
            ->andReturn(0);

        $service = buildSipecServiceMock($unidadesService, $servidoresService, $checkpointRepo);

        $lock = Mockery::mock(\Illuminate\Contracts\Cache\Lock::class);
        $lock->shouldReceive('get')->once()->andReturn(true);
        $lock->shouldReceive('release')->once();
        Cache::shouldReceive('lock')->with('sipec_fase0_tenant-4', 600)->once()->andReturn($lock);

        $resultado = $service->executarFase0('tenant-4');

        expect($resultado['servidores'])->toBe(0);
    });

    test('checkpoint etapa completo não executa nenhuma coleta', function () {

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadesService = Mockery::mock(SipecUnidadeSincronizacaoService::class);
        $servidoresService = Mockery::mock(SipecServidorSincronizacaoService::class);

        $checkpointRepo->shouldReceive('firstOrCreateByTenantId')
            ->once()
            ->andReturn(fakeCheckpoint('completo', 0));

        $unidadesService->shouldNotReceive('coletarUnidadesPaginado');
        $servidoresService->shouldNotReceive('coletarServidoresPaginado');

        $service = buildSipecServiceMock($unidadesService, $servidoresService, $checkpointRepo);

        $lock = Mockery::mock(\Illuminate\Contracts\Cache\Lock::class);
        $lock->shouldReceive('get')->once()->andReturn(true);
        $lock->shouldReceive('release')->once();
        Cache::shouldReceive('lock')->with('sipec_fase0_tenant-5', 600)->once()->andReturn($lock);

        $resultado = $service->executarFase0('tenant-5');

        expect($resultado)->toBe(['status' => 'completo', 'unidades' => 0, 'servidores' => 0]);
    });
});

describe('SipecService - resetarCheckpoint', function () {

    test('deleta checkpoint pelo tenant_id via repository', function () {
        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadesService = Mockery::mock(SipecUnidadeSincronizacaoService::class);
        $servidoresService = Mockery::mock(SipecServidorSincronizacaoService::class);

        $checkpointRepo->shouldReceive('deleteByTenantId')
            ->once()
            ->with('tenant-reset')
            ->andReturn(true);

        $service = buildSipecServiceMock($unidadesService, $servidoresService, $checkpointRepo);

        $service->resetarCheckpoint('tenant-reset');

        expect(true)->toBeTrue();
    });
});

describe('SipecService - retrySleep', function () {

    test('executa sleep com o valor informado', function () {
        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadesService = Mockery::mock(SipecUnidadeSincronizacaoService::class);
        $servidoresService = Mockery::mock(SipecServidorSincronizacaoService::class);

        $service = buildSipecServiceMock($unidadesService, $servidoresService, $checkpointRepo);

        $reflection = new \ReflectionMethod($service, 'retrySleep');
        $reflection->setAccessible(true);

        $start = microtime(true);
        $reflection->invoke($service, 1);
        $elapsed = microtime(true) - $start;

        expect($elapsed)->toBeGreaterThanOrEqual(1.0);
        expect($elapsed)->toBeLessThan(1.5);
    })->skip(env('SKIP_SLOW_TESTS', true), 'Teste lento (sleep real) — execute com SKIP_SLOW_TESTS=false');

    test('sleep com 0 segundos retorna imediatamente', function () {
        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadesService = Mockery::mock(SipecUnidadeSincronizacaoService::class);
        $servidoresService = Mockery::mock(SipecServidorSincronizacaoService::class);

        $service = buildSipecServiceMock($unidadesService, $servidoresService, $checkpointRepo);

        $reflection = new \ReflectionMethod($service, 'retrySleep');
        $reflection->setAccessible(true);

        $start = microtime(true);
        $reflection->invoke($service, 0);
        $elapsed = microtime(true) - $start;

        expect($elapsed)->toBeLessThan(0.1);
    });
});

describe('SipecService - executarGetComRetry', function () {

    test('erro 4XX retenta com backoff curto e lança SipecApiRetryableException', function () {
        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadesService = Mockery::mock(SipecUnidadeSincronizacaoService::class);
        $servidoresService = Mockery::mock(SipecServidorSincronizacaoService::class);

        $service = buildSipecServiceMock($unidadesService, $servidoresService, $checkpointRepo);
        $service->shouldReceive('getToken')->andReturn('fake-token');
        $service->shouldReceive('retrySleep')->andReturnNull();

        $service->shouldReceive('executarGet')
            ->times(3)
            ->andThrow(new RequestConectaGovException('Forbidden', 403));

        $reflection = new \ReflectionMethod($service, 'executarGetComRetry');
        $reflection->setAccessible(true);

        expect(fn () => $reflection->invoke($service, 'https://fake.test/endpoint', 3))
            ->toThrow(SipecApiRetryableException::class);
    });

    test('erro 5XX retenta até esgotar e lança SipecApiRetryableException', function () {
        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadesService = Mockery::mock(SipecUnidadeSincronizacaoService::class);
        $servidoresService = Mockery::mock(SipecServidorSincronizacaoService::class);

        $service = buildSipecServiceMock($unidadesService, $servidoresService, $checkpointRepo);
        $service->shouldReceive('getToken')->andReturn('fake-token');
        $service->shouldReceive('retrySleep')->andReturnNull();

        $service->shouldReceive('executarGet')
            ->times(3)
            ->andThrow(new RequestConectaGovException('Internal Server Error', 500));

        $reflection = new \ReflectionMethod($service, 'executarGetComRetry');
        $reflection->setAccessible(true);

        expect(fn () => $reflection->invoke($service, 'https://fake.test/endpoint', 3))
            ->toThrow(SipecApiRetryableException::class);
    });

    test('erro de rede code 0 retenta e sucede na terceira tentativa', function () {
        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadesService = Mockery::mock(SipecUnidadeSincronizacaoService::class);
        $servidoresService = Mockery::mock(SipecServidorSincronizacaoService::class);

        $service = buildSipecServiceMock($unidadesService, $servidoresService, $checkpointRepo);
        $service->shouldReceive('getToken')->andReturn('fake-token');
        $service->shouldReceive('retrySleep')->andReturnNull();

        $callCount = 0;
        $service->shouldReceive('executarGet')
            ->times(3)
            ->andReturnUsing(function () use (&$callCount) {
                $callCount++;
                if ($callCount < 3) {
                    throw new RequestConectaGovException('cURL error: timeout', 0);
                }
                return ['content' => [], 'totalPages' => 1];
            });

        $reflection = new \ReflectionMethod($service, 'executarGetComRetry');
        $reflection->setAccessible(true);

        $result = $reflection->invoke($service, 'https://fake.test/endpoint', 3);

        expect($result)->toBe(['content' => [], 'totalPages' => 1]);
    });
});
