<?php

namespace Tests\Unit\Services\Sipec;

use App\Exceptions\RequestConectaGovException;
use App\Exceptions\SipecApiRetryableException;
use App\Repository\SipecServidorRepository;
use App\Repository\SipecSyncCheckpointRepository;
use App\Repository\SipecUnidadeRepository;
use App\Services\Sipec\SipecService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

afterAll(function () {
    Mockery::close();
});

function buildSipecServiceMock(
    $sipecUnidadeRepo,
    $sipecServidorRepo,
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
        'sipecUnidadeRepository' => $sipecUnidadeRepo,
        'sipecServidorRepository' => $sipecServidorRepo,
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
    // Permitir acesso via propriedade mágica
    $model->etapa = $etapa;
    $model->ultima_pagina = $ultimaPagina;
    $model->total_paginas = null;
    return $model;
}

describe('SipecService - executarFase0', function () {

    test('execução completa coleta unidades e servidores atualizando checkpoint', function () {
        Log::shouldReceive('warning')->never();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $servidorRepo = Mockery::mock(SipecServidorRepository::class);

        $checkpointRepo->shouldReceive('firstOrCreateByTenantId')
            ->once()
            ->with('tenant-1', 'unidades', 0)
            ->andReturn(fakeCheckpoint('unidades', 0));

        // Após coletar unidades: avança checkpoint
        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'unidades', 1, 1)
            ->once()->andReturn(null);

        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'servidores', 0, null)
            ->once()->andReturn(null);

        // Após transição: findByTenantId retorna checkpoint na etapa servidores
        $checkpointRepo->shouldReceive('findByTenantId')
            ->with('tenant-1')
            ->once()
            ->andReturn(fakeCheckpoint('servidores', 0));

        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'servidores', 1, 1)
            ->once()->andReturn(null);

        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'completo', 0, null)
            ->once()->andReturn(null);

        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')
            ->once()
            ->with('9999', Mockery::type('string'), false, '2024-01-01')
            ->andReturn(Mockery::mock(\Illuminate\Database\Eloquent\Model::class));

        $servidorRepo->shouldReceive('updateOrCreateByCpfAndMatricula')
            ->once()
            ->with('11111111111', '12345', Mockery::type('string'), false, '2024-02-01')
            ->andReturn(Mockery::mock(\Illuminate\Database\Eloquent\Model::class));

        $service = buildSipecServiceMock($unidadeRepo, $servidorRepo, $checkpointRepo);

        // Mock executarGetComRetry (protegido) para retornar dados paginados
        $service->shouldReceive('executarGetComRetry')
            ->with('https://fake-sipec.test/api-sipec/v1/unidades?codOrgao=17500&page=0&size=100')
            ->once()
            ->andReturn([
                'content' => [['codUorg' => '9999', 'dataUltimaTransacao' => '2024-01-01']],
                'totalPages' => 1,
            ]);

        $service->shouldReceive('executarGetComRetry')
            ->with('https://fake-sipec.test/api-sipec/v1/servidores?codUorg=1234&codSitFuncional=1&codOrgao=17500&page=0&size=100')
            ->once()
            ->andReturn([
                'content' => [[
                    'cpf' => '11111111111',
                    'vinculos' => [['matriculaSiape' => '12345', 'dataUltimaTransacao' => '2024-02-01']],
                ]],
                'totalPages' => 1,
            ]);

        $lock = Mockery::mock(\Illuminate\Contracts\Cache\Lock::class);
        $lock->shouldReceive('get')->once()->andReturn(true);
        $lock->shouldReceive('release')->once();
        Cache::shouldReceive('lock')->with('sipec_fase0_tenant-1', 600)->once()->andReturn($lock);

        $resultado = $service->executarFase0('tenant-1');

        expect($resultado)->toBe(['status' => 'completo', 'unidades' => 1, 'servidores' => 1]);
    });

    test('retorna status locked quando lock já está adquirido', function () {
        Log::shouldReceive('warning')->once();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $servidorRepo = Mockery::mock(SipecServidorRepository::class);

        $service = buildSipecServiceMock($unidadeRepo, $servidorRepo, $checkpointRepo);

        $lock = Mockery::mock(\Illuminate\Contracts\Cache\Lock::class);
        $lock->shouldReceive('get')->once()->andReturn(false);
        Cache::shouldReceive('lock')->with('sipec_fase0_tenant-2', 600)->once()->andReturn($lock);

        $resultado = $service->executarFase0('tenant-2');

        expect($resultado)->toBe(['status' => 'locked', 'unidades' => 0, 'servidores' => 0]);
    });

    test('retoma da etapa servidores quando unidades já foram concluídas', function () {
        Log::shouldReceive('warning')->never();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $servidorRepo = Mockery::mock(SipecServidorRepository::class);

        $checkpointRepo->shouldReceive('firstOrCreateByTenantId')
            ->once()
            ->with('tenant-3', 'unidades', 0)
            ->andReturn(fakeCheckpoint('servidores', 3));

        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-3', 'servidores', 4, 4)
            ->once()->andReturn(null);

        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-3', 'completo', 0, null)
            ->once()->andReturn(null);

        $servidorRepo->shouldReceive('updateOrCreateByCpfAndMatricula')
            ->twice()
            ->andReturn(Mockery::mock(\Illuminate\Database\Eloquent\Model::class));

        // unidadeRepo NÃO deve ser chamado
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')->never();

        $service = buildSipecServiceMock($unidadeRepo, $servidorRepo, $checkpointRepo);

        $service->shouldReceive('executarGetComRetry')
            ->with('https://fake-sipec.test/api-sipec/v1/servidores?codUorg=1234&codSitFuncional=1&codOrgao=17500&page=3&size=100')
            ->once()
            ->andReturn([
                'content' => [
                    ['cpf' => '22222222222', 'vinculos' => [['matriculaSiape' => '111', 'dataUltimaTransacao' => null]]],
                    ['cpf' => '33333333333', 'vinculos' => [['matriculaSiape' => '222', 'dataUltimaTransacao' => null]]],
                ],
                'totalPages' => 4,
            ]);

        $lock = Mockery::mock(\Illuminate\Contracts\Cache\Lock::class);
        $lock->shouldReceive('get')->once()->andReturn(true);
        $lock->shouldReceive('release')->once();
        Cache::shouldReceive('lock')->with('sipec_fase0_tenant-3', 600)->once()->andReturn($lock);

        $resultado = $service->executarFase0('tenant-3');

        expect($resultado['status'])->toBe('completo');
        expect($resultado['unidades'])->toBe(0);
        expect($resultado['servidores'])->toBe(2);
    });

    test('ignora servidor sem CPF e não persiste no repository', function () {
        Log::shouldReceive('warning')->never();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $servidorRepo = Mockery::mock(SipecServidorRepository::class);

        $checkpointRepo->shouldReceive('firstOrCreateByTenantId')
            ->once()
            ->andReturn(fakeCheckpoint('servidores', 0));

        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-4', 'servidores', 1, 1)
            ->once()->andReturn(null);

        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-4', 'completo', 0, null)
            ->once()->andReturn(null);

        $servidorRepo->shouldReceive('updateOrCreateByCpfAndMatricula')->never();

        $service = buildSipecServiceMock($unidadeRepo, $servidorRepo, $checkpointRepo);

        $service->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn([
                'content' => [
                    ['cpf' => null, 'vinculos' => [['matriculaSiape' => '999', 'dataUltimaTransacao' => null]]],
                ],
                'totalPages' => 1,
            ]);

        $lock = Mockery::mock(\Illuminate\Contracts\Cache\Lock::class);
        $lock->shouldReceive('get')->once()->andReturn(true);
        $lock->shouldReceive('release')->once();
        Cache::shouldReceive('lock')->with('sipec_fase0_tenant-4', 600)->once()->andReturn($lock);

        $resultado = $service->executarFase0('tenant-4');

        expect($resultado['servidores'])->toBe(0);
    });

    test('checkpoint etapa completo não executa nenhuma coleta', function () {
        Log::shouldReceive('warning')->never();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $servidorRepo = Mockery::mock(SipecServidorRepository::class);

        $checkpointRepo->shouldReceive('firstOrCreateByTenantId')
            ->once()
            ->andReturn(fakeCheckpoint('completo', 0));

        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')->never();
        $servidorRepo->shouldReceive('updateOrCreateByCpfAndMatricula')->never();

        $service = buildSipecServiceMock($unidadeRepo, $servidorRepo, $checkpointRepo);

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
        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $servidorRepo = Mockery::mock(SipecServidorRepository::class);

        $checkpointRepo->shouldReceive('deleteByTenantId')
            ->once()
            ->with('tenant-reset')
            ->andReturn(true);

        $service = buildSipecServiceMock($unidadeRepo, $servidorRepo, $checkpointRepo);

        $service->resetarCheckpoint('tenant-reset');

        expect(true)->toBeTrue();
    });
});

describe('SipecService - retrySleep', function () {

    test('executa sleep com o valor informado', function () {
        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $servidorRepo = Mockery::mock(SipecServidorRepository::class);

        $service = buildSipecServiceMock($unidadeRepo, $servidorRepo, $checkpointRepo);

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
        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $servidorRepo = Mockery::mock(SipecServidorRepository::class);

        $service = buildSipecServiceMock($unidadeRepo, $servidorRepo, $checkpointRepo);

        $reflection = new \ReflectionMethod($service, 'retrySleep');
        $reflection->setAccessible(true);

        $start = microtime(true);
        $reflection->invoke($service, 0);
        $elapsed = microtime(true) - $start;

        expect($elapsed)->toBeLessThan(0.1);
    });
});

describe('SipecService - executarGetComRetry', function () {

    test('erro 4XX faz fail fast sem retry', function () {
        Log::shouldReceive('error')->andReturnNull();
        Log::shouldReceive('warning')->never();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $servidorRepo = Mockery::mock(SipecServidorRepository::class);

        $service = buildSipecServiceMock($unidadeRepo, $servidorRepo, $checkpointRepo);
        $service->shouldReceive('getToken')->andReturn('fake-token');
        $service->shouldReceive('retrySleep')->andReturnNull();

        $service->shouldReceive('executarGet')
            ->once()
            ->andThrow(new RequestConectaGovException('Forbidden', 403));

        $reflection = new \ReflectionMethod($service, 'executarGetComRetry');
        $reflection->setAccessible(true);

        expect(fn () => $reflection->invoke($service, 'https://fake.test/endpoint'))
            ->toThrow(RequestConectaGovException::class, 'Forbidden');
    });

    test('erro 5XX retenta até esgotar e lança SipecApiRetryableException', function () {
        Log::shouldReceive('error')->andReturnNull();
        Log::shouldReceive('warning')->andReturnNull();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $servidorRepo = Mockery::mock(SipecServidorRepository::class);

        $service = buildSipecServiceMock($unidadeRepo, $servidorRepo, $checkpointRepo);
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
        Log::shouldReceive('error')->andReturnNull();
        Log::shouldReceive('warning')->andReturnNull();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $servidorRepo = Mockery::mock(SipecServidorRepository::class);

        $service = buildSipecServiceMock($unidadeRepo, $servidorRepo, $checkpointRepo);
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
