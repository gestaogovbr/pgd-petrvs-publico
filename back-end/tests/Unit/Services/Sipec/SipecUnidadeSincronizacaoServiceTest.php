<?php

use App\Repository\Sipec\SipecSyncCheckpointRepository;
use App\Repository\Sipec\SipecUnidadeRepository;
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
    $prop->setValue($service, $unidadeRepo);

    $prop = $reflection->getProperty('checkpointRepository');
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

    test('deve coletar hierarquia via BFS quando codUorg informado', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');

        // 1ª chamada: busca a própria unidade raiz (codUorg=100)
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorg=100') && !str_contains($p, 'codUorgPai')), 2)
            ->once()
            ->andReturn(['content' => [['codUorg' => '100', 'dataUltimaTransacao' => null]], 'totalPages' => 1]);

        // 2ª chamada: filhos de 100 (codUorgPai=100) → retorna 200, 300
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorgPai=100')), 2)
            ->once()
            ->andReturn(['content' => [
                ['codUorg' => '200', 'dataUltimaTransacao' => null],
                ['codUorg' => '300', 'dataUltimaTransacao' => null],
            ], 'totalPages' => 1]);

        // 3ª chamada: filhos de 200 (codUorgPai=200) → vazio (folha)
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorgPai=200')), 2)
            ->once()
            ->andReturn(['content' => [], 'totalPages' => 1]);

        // 4ª chamada: filhos de 300 (codUorgPai=300) → vazio (folha)
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorgPai=300')), 2)
            ->once()
            ->andReturn(['content' => [], 'totalPages' => 1]);

        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')->times(3);

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldNotReceive('updateByTenantId');

        $service = buildUnidadeSincronizacaoService($sipecService, $unidadeRepo, $checkpointRepo);
        $total = $service->coletarUnidadesPaginado('tenant-1', 0, null, '100');

        expect($total)->toBe(3); // raiz + 2 filhos
    });
});

describe('SipecUnidadeSincronizacaoService - coletarFilhosERetornarCodigos (via hierarquia)', function () {

    test('deve usar codUorgPai como filtro e incluir codOrgao na query', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('26000');

        // Raiz
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorg=500') && !str_contains($p, 'codUorgPai')), 2)
            ->once()
            ->andReturn(['content' => [['codUorg' => '500', 'dataUltimaTransacao' => null]], 'totalPages' => 1]);

        // Filhos: valida que path contém codUorgPai=500 E codOrgao=26000
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) =>
                str_contains($p, 'codUorgPai=500') &&
                str_contains($p, 'codOrgao=26000') &&
                str_contains($p, 'page=0') &&
                str_contains($p, 'size=' . SipecService::SIPEC_PAGE_SIZE)
            ), 2)
            ->once()
            ->andReturn(['content' => [], 'totalPages' => 1]);

        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')->once();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldNotReceive('updateByTenantId');

        $service = buildUnidadeSincronizacaoService($sipecService, $unidadeRepo, $checkpointRepo);
        $total = $service->coletarUnidadesPaginado('tenant-1', 0, null, '500');

        expect($total)->toBe(1);
    });

    test('deve incluir dataUltimaTransacao no filtro de filhos quando informado', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');

        // Raiz
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) =>
                str_contains($p, 'codUorg=800') &&
                str_contains($p, 'dataUltimaTransacao=2025-06-01')
            ), 2)
            ->once()
            ->andReturn(['content' => [['codUorg' => '800', 'dataUltimaTransacao' => '2025-06-01']], 'totalPages' => 1]);

        // Filhos: valida dataUltimaTransacao presente
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) =>
                str_contains($p, 'codUorgPai=800') &&
                str_contains($p, 'dataUltimaTransacao=2025-06-01')
            ), 2)
            ->once()
            ->andReturn(['content' => [['codUorg' => '801', 'dataUltimaTransacao' => null]], 'totalPages' => 1]);

        // Filhos de 801
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) =>
                str_contains($p, 'codUorgPai=801') &&
                str_contains($p, 'dataUltimaTransacao=2025-06-01')
            ), 2)
            ->once()
            ->andReturn(['content' => [], 'totalPages' => 1]);

        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')->twice();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldNotReceive('updateByTenantId');

        $service = buildUnidadeSincronizacaoService($sipecService, $unidadeRepo, $checkpointRepo);
        $total = $service->coletarUnidadesPaginado('tenant-1', 0, '2025-06-01', '800');

        expect($total)->toBe(2);
    });

    test('deve retornar codigos dos filhos encontrados e persistir cada um', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');

        // Raiz
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorg=10') && !str_contains($p, 'codUorgPai')), 2)
            ->once()
            ->andReturn(['content' => [['codUorg' => '10', 'dataUltimaTransacao' => null]], 'totalPages' => 1]);

        // Filhos de 10 → 20, 30, 40
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorgPai=10')), 2)
            ->once()
            ->andReturn(['content' => [
                ['codUorg' => '20', 'dataUltimaTransacao' => null],
                ['codUorg' => '30', 'dataUltimaTransacao' => null],
                ['codUorg' => '40', 'dataUltimaTransacao' => null],
            ], 'totalPages' => 1]);

        // Folhas (sem filhos)
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorgPai=20')), 2)
            ->once()->andReturn(['content' => [], 'totalPages' => 1]);
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorgPai=30')), 2)
            ->once()->andReturn(['content' => [], 'totalPages' => 1]);
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorgPai=40')), 2)
            ->once()->andReturn(['content' => [], 'totalPages' => 1]);

        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')
            ->with('10', Mockery::type('string'), false, null)->once();
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')
            ->with('20', Mockery::type('string'), false, null)->once();
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')
            ->with('30', Mockery::type('string'), false, null)->once();
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')
            ->with('40', Mockery::type('string'), false, null)->once();

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldNotReceive('updateByTenantId');

        $service = buildUnidadeSincronizacaoService($sipecService, $unidadeRepo, $checkpointRepo);
        $total = $service->coletarUnidadesPaginado('tenant-1', 0, null, '10');

        expect($total)->toBe(4); // raiz + 3 filhos
    });

    test('deve paginar filhos quando totalPages maior que 1', function () {
        $sipecService = Mockery::mock(SipecService::class);
        $sipecService->shouldReceive('getCodOrgao')->andReturn('17500');

        // Raiz
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorg=50') && !str_contains($p, 'codUorgPai')), 2)
            ->once()
            ->andReturn(['content' => [['codUorg' => '50', 'dataUltimaTransacao' => null]], 'totalPages' => 1]);

        // Filhos de 50: 2 páginas
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorgPai=50') && str_contains($p, 'page=0')), 2)
            ->once()
            ->andReturn(['content' => [['codUorg' => '51', 'dataUltimaTransacao' => null]], 'totalPages' => 2]);
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorgPai=50') && str_contains($p, 'page=1')), 2)
            ->once()
            ->andReturn(['content' => [['codUorg' => '52', 'dataUltimaTransacao' => null]], 'totalPages' => 2]);

        // Folhas
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorgPai=51')), 2)
            ->once()->andReturn(['content' => [], 'totalPages' => 1]);
        $sipecService->shouldReceive('executarGetComRetry')
            ->with(Mockery::on(fn(string $p) => str_contains($p, 'codUorgPai=52')), 2)
            ->once()->andReturn(['content' => [], 'totalPages' => 1]);

        $unidadeRepo = Mockery::mock(SipecUnidadeRepository::class);
        $unidadeRepo->shouldReceive('updateOrCreateByCodigo')->times(3);

        $checkpointRepo = Mockery::mock(SipecSyncCheckpointRepository::class);
        $checkpointRepo->shouldNotReceive('updateByTenantId');

        $service = buildUnidadeSincronizacaoService($sipecService, $unidadeRepo, $checkpointRepo);
        $total = $service->coletarUnidadesPaginado('tenant-1', 0, null, '50');

        expect($total)->toBe(3);
    });
});
