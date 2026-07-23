<?php

use App\Repository\Sipec\SipecServidorRepository;
use App\Repository\Sipec\SipecSyncCheckpointRepository;
use App\Repository\Sipec\SipecUnidadeRepository;
use App\Services\Sipec\Servidor\SipecServidorSincronizacaoService;
use App\Services\Sipec\SipecService;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function buildSincronizacaoService(
    ?SipecService $sipecService = null,
    ?SipecServidorRepository $servidorRepo = null,
    ?SipecSyncCheckpointRepository $checkpointRepo = null,
    ?SipecUnidadeRepository $sipecUnidadeRepo = null,
): SipecServidorSincronizacaoService {
    $sipecService ??= Mockery::mock(SipecService::class);
    $servidorRepo ??= Mockery::mock(SipecServidorRepository::class);
    $checkpointRepo ??= Mockery::mock(SipecSyncCheckpointRepository::class);
    $sipecUnidadeRepo ??= Mockery::mock(SipecUnidadeRepository::class);

    $service = new SipecServidorSincronizacaoService($sipecService);

    $reflection = new ReflectionClass($service);

    $prop = $reflection->getProperty('sipecServidorRepository');
    $prop->setValue($service, $servidorRepo);

    $prop = $reflection->getProperty('checkpointRepository');
    $prop->setValue($service, $checkpointRepo);

    $prop = $reflection->getProperty('sipecUnidadeRepository');
    $prop->setValue($service, $sipecUnidadeRepo);

    return $service;
}

describe('SipecServidorSincronizacaoService - buscarServidores', function () {

    test('deve montar path com codUorg do config quando não informado', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodUorg')->once()->andReturn('5555');
        $sipecService->shouldReceive('getToken')->once()->andReturn('token');
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->with(Mockery::on(fn(string $path) => str_contains($path, 'codOrgao=17500')), 2)
            ->andReturn(['content' => []]);

        $service = buildSincronizacaoService($sipecService);
        $resultado = $service->buscarServidores();

        expect($resultado)->toBe(['content' => []]);
    });

    test('deve usar codUorg informado como parâmetro', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodUorg')->never();
        $sipecService->shouldReceive('getToken')->once()->andReturn('token');
        $sipecService->shouldReceive('getCodOrgao')->andReturn('');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->with(Mockery::on(fn(string $path) => !str_contains($path, 'codOrgao')), 2)
            ->andReturn(['content' => [['cpf' => '11111111111']]]);

        $service = buildSincronizacaoService($sipecService);
        $resultado = $service->buscarServidores('9999');

        expect($resultado['content'])->toHaveCount(1);
    });
});

describe('SipecServidorSincronizacaoService - buscarServidorPorCpf', function () {

    test('deve retornar servidor quando CPF encontrado na resposta', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodUorg')->once()->andReturn('1234');
        $sipecService->shouldReceive('getCodOrgao')->once()->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn([
                'content' => [
                    ['cpf' => '99999999999', 'nome' => 'Outro'],
                    ['cpf' => '12345678901', 'nome' => 'João'],
                ],
            ]);

        $service = buildSincronizacaoService($sipecService);
        $resultado = $service->buscarServidorPorCpf('12345678901');

        expect($resultado)->not->toBeNull();
        expect($resultado['nome'])->toBe('João');
    });

    test('deve retornar null quando CPF não encontrado', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodUorg')->once()->andReturn('1234');
        $sipecService->shouldReceive('getCodOrgao')->once()->andReturn('');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn(['content' => [['cpf' => '99999999999', 'nome' => 'Outro']]]);

        $service = buildSincronizacaoService($sipecService);
        $resultado = $service->buscarServidorPorCpf('00000000000');

        expect($resultado)->toBeNull();
    });

    test('deve retornar null quando resposta não é array', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodUorg')->once()->andReturn('1234');
        $sipecService->shouldReceive('getCodOrgao')->once()->andReturn('');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn(['message' => 'not found']);

        $service = buildSincronizacaoService($sipecService);
        $resultado = $service->buscarServidorPorCpf('12345678901');

        expect($resultado)->toBeNull();
    });

    test('deve normalizar CPF com pontuação na resposta', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodUorg')->once()->andReturn('1234');
        $sipecService->shouldReceive('getCodOrgao')->once()->andReturn('');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn([['cpf' => '123.456.789-01', 'nome' => 'Maria']]);

        $service = buildSincronizacaoService($sipecService);
        $resultado = $service->buscarServidorPorCpf('12345678901');

        expect($resultado)->not->toBeNull();
        expect($resultado['nome'])->toBe('Maria');
    });
});

describe('SipecServidorSincronizacaoService - coletarServidoresPaginado', function () {

    test('deve persistir servidores e atualizar checkpoint por página', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn([
                'content' => [
                    ['cpf' => '11111111111', 'vinculos' => [['matriculaSiape' => '111', 'dataUltimaTransacao' => '2025-01-01']]],
                    ['cpf' => '22222222222', 'vinculos' => [['matriculaSiape' => '222', 'dataUltimaTransacao' => null]]],
                ],
                'totalPages' => 1,
            ]);

        $servidorRepo = Mockery::mock(SipecServidorRepository::class);
        $servidorRepo->shouldReceive('updateOrCreateByCpfAndMatricula')
            ->with('11111111111', '111', Mockery::type('string'), false, '2025-01-01')
            ->once();
        $servidorRepo->shouldReceive('updateOrCreateByCpfAndMatricula')
            ->with('22222222222', '222', Mockery::type('string'), false, null)
            ->once();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'servidores', 1, 1)
            ->once();

        $service = buildSincronizacaoService($sipecService, $servidorRepo, $checkpointRepo);
        $total = $service->coletarServidoresPaginado('tenant-1', 0, null, '1234');

        expect($total)->toBe(2);
    });

    test('deve iterar múltiplas páginas até totalPages', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');

        $sipecService->shouldReceive('executarGetComRetry')
            ->twice()
            ->andReturn(
                ['content' => [['cpf' => '11111111111', 'vinculos' => [['matriculaSiape' => '111', 'dataUltimaTransacao' => null]]]], 'totalPages' => 2],
                ['content' => [['cpf' => '22222222222', 'vinculos' => [['matriculaSiape' => '222', 'dataUltimaTransacao' => null]]]], 'totalPages' => 2],
            );

        $servidorRepo = Mockery::mock(SipecServidorRepository::class);
        $servidorRepo->shouldReceive('updateOrCreateByCpfAndMatricula')->twice();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'servidores', 1, 2)->once();
        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'servidores', 2, 2)->once();

        $service = buildSincronizacaoService($sipecService, $servidorRepo, $checkpointRepo);
        $total = $service->coletarServidoresPaginado('tenant-1', 0, null, '1234');

        expect($total)->toBe(2);
    });

    test('deve ignorar servidor sem CPF', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn([
                'content' => [['cpf' => null, 'vinculos' => [['matriculaSiape' => '999', 'dataUltimaTransacao' => null]]]],
                'totalPages' => 1,
            ]);

        $servidorRepo = Mockery::mock(SipecServidorRepository::class);
        $servidorRepo->shouldNotReceive('updateOrCreateByCpfAndMatricula');

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldReceive('updateByTenantId')->once();

        $service = buildSincronizacaoService($sipecService, $servidorRepo, $checkpointRepo);
        $total = $service->coletarServidoresPaginado('tenant-1', 0, null, '1234');

        expect($total)->toBe(0);
    });

    test('deve usar matricula do primeiro vínculo', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->andReturn([
                'content' => [[
                    'cpf' => '33333333333',
                    'vinculos' => [
                        ['matriculaSiape' => '777', 'dataUltimaTransacao' => '2025-03-01'],
                        ['matriculaSiape' => '888', 'dataUltimaTransacao' => '2025-04-01'],
                    ],
                ]],
                'totalPages' => 1,
            ]);

        $servidorRepo = Mockery::mock(SipecServidorRepository::class);
        $servidorRepo->shouldReceive('updateOrCreateByCpfAndMatricula')
            ->with('33333333333', '777', Mockery::type('string'), false, '2025-03-01')
            ->once();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldReceive('updateByTenantId')->once();

        $service = buildSincronizacaoService($sipecService, $servidorRepo, $checkpointRepo);
        $total = $service->coletarServidoresPaginado('tenant-1', 0, null, '1234');

        expect($total)->toBe(1);
    });

    test('deve buscar todos servidores sem codUorg no path quando codUorg não informado', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->once()
            ->with(Mockery::on(fn(string $path) => !str_contains($path, 'codUorg') && str_contains($path, 'codOrgao=17500')))
            ->andReturn([
                'content' => [['cpf' => '11111111111', 'vinculos' => [['matriculaSiape' => '111', 'dataUltimaTransacao' => null]]]],
                'totalPages' => 1,
            ]);

        $servidorRepo = Mockery::mock(SipecServidorRepository::class);
        $servidorRepo->shouldReceive('updateOrCreateByCpfAndMatricula')->once();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'servidores', 1, 1)
            ->once();

        $service = buildSincronizacaoService($sipecService, $servidorRepo, $checkpointRepo);
        $total = $service->coletarServidoresPaginado('tenant-1', 0);

        expect($total)->toBe(1);
    });

    test('deve registrar checkpoint por página global quando codUorg não informado', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');
        $sipecService->shouldReceive('executarGetComRetry')
            ->twice()
            ->andReturn(
                ['content' => [['cpf' => '11111111111', 'vinculos' => [['matriculaSiape' => '111', 'dataUltimaTransacao' => null]]]], 'totalPages' => 2],
                ['content' => [['cpf' => '22222222222', 'vinculos' => [['matriculaSiape' => '222', 'dataUltimaTransacao' => null]]]], 'totalPages' => 2],
            );

        $servidorRepo = Mockery::mock(SipecServidorRepository::class);
        $servidorRepo->shouldReceive('updateOrCreateByCpfAndMatricula')->twice();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'servidores', 1, 2)->once();
        $checkpointRepo->shouldReceive('updateByTenantId')
            ->with('tenant-1', 'servidores', 2, 2)->once();

        $service = buildSincronizacaoService($sipecService, $servidorRepo, $checkpointRepo);
        $total = $service->coletarServidoresPaginado('tenant-1', 0);

        expect($total)->toBe(2);
    });
});
