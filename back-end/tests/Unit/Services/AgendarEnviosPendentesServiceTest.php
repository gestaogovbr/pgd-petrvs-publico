<?php

namespace Tests\Unit\Services;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\Envio\AgendarEnviosPendentesService;
use App\Services\TenantService;
use Illuminate\Support\Facades\Bus;
use Mockery;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('AgendarEnviosPendentesService', function () {

    it('percorre os chunks, carrega planos e encadeia envio quando o PT é elegível', function () {
        Bus::fake();

        $plano = PlanoTrabalho::factory()->ativo()->create();
        $planoId = $plano->id;

        $planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
        $planoRepo->shouldReceive('chunkEnviosPendentes')
            ->once()
            ->with(AgendarEnviosPendentesService::CHUNK_SIZE, Mockery::type('callable'))
            ->andReturnUsing(function (int $chunkSize, callable $callback) use ($planoId): void {
                $callback(collect([(object) ['id' => $planoId]]));
            });

        $planoRepo->shouldReceive('findById')->with((string) $planoId)->andReturn($plano->fresh(['usuario']));

        $tenantService = Mockery::mock(TenantService::class);
        $service = new AgendarEnviosPendentesService($planoRepo, $tenantService);
        $service->executarAgendamentoNoTenant(tenant()->id);

        Bus::assertChained([
            ExportarParticipanteJob::class,
            ExportarPlanoTrabalhoJob::class,
        ]);
    });

    it('invoca o callback do repositório uma vez por chunk emitido', function () {
        Bus::fake();

        $p1 = PlanoTrabalho::factory()->ativo()->create();
        $p2 = PlanoTrabalho::factory()->ativo()->create();

        $chunks = 0;
        $planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
        $planoRepo->shouldReceive('chunkEnviosPendentes')
            ->once()
            ->andReturnUsing(function (int $chunkSize, callable $callback) use (&$chunks, $p1, $p2): void {
                $callback(collect([(object) ['id' => $p1->id]]));
                $chunks++;
                $callback(collect([(object) ['id' => $p2->id]]));
                $chunks++;
            });

        $planoRepo->shouldReceive('findById')->with((string) $p1->id)->andReturn($p1->fresh(['usuario']));
        $planoRepo->shouldReceive('findById')->with((string) $p2->id)->andReturn($p2->fresh(['usuario']));

        $tenantService = Mockery::mock(TenantService::class);
        $service = new AgendarEnviosPendentesService($planoRepo, $tenantService);
        $service->executarAgendamentoNoTenant(tenant()->id);

        expect($chunks)->toBe(2);
    });

    it('ignora ids cujo findById retorna null', function () {
        Bus::fake();

        $planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
        $planoRepo->shouldReceive('chunkEnviosPendentes')
            ->once()
            ->andReturnUsing(function (int $chunkSize, callable $callback): void {
                $callback(collect([(object) ['id' => 'id-inexistente']]));
            });

        $planoRepo->shouldReceive('findById')->with('id-inexistente')->andReturn(null);

        $tenantService = Mockery::mock(TenantService::class);
        $service = new AgendarEnviosPendentesService($planoRepo, $tenantService);
        $service->executarAgendamentoNoTenant(tenant()->id);

        Bus::assertNothingDispatched();
    });
});
