<?php

namespace Tests\IntegrationTenant\Services;

use App\Enums\StatusEnum;
use App\Jobs\Envio\ExportarParticipanteJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\Envio\AgendarEnvioPlanosTrabalhosService;
use Illuminate\Support\Facades\Bus;
use Mockery;

afterEach(function () {
    Mockery::close();
});

describe('AgendarEnvioPlanosTrabalhosService', function () {

    it('percorre os chunks, carrega planos e encadeia envio quando o PT é elegível', function () {
        Bus::fake();

        $plano = PlanoTrabalho::factory()->ativo()->create();
        $planoId = $plano->id;

        $planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
        $planoRepo->shouldReceive('findAllParaEnvio')
            ->once()
            ->with(AgendarEnvioPlanosTrabalhosService::CHUNK_SIZE, Mockery::type('callable'))
            ->andReturnUsing(function (int $chunkSize, callable $callback) use ($planoId): void {
                $callback(collect([(object) ['id' => $planoId]]));
            });

        $planoRepo->shouldReceive('findById')->with($planoId)->andReturn($plano->fresh(['usuario']));

        $service = new AgendarEnvioPlanosTrabalhosService($planoRepo);
        $service->executarAgendamentoNoTenant(tenant());

        Bus::assertChained([
            ExportarParticipanteJob::class,
            ExportarPlanoTrabalhoJob::class,
        ]);
    });

    it('invoca o callback do repositório uma vez por chunk emitido', function () {
        Bus::fake();

        $p1 = PlanoTrabalho::factory()->ativo()->create();
        $p2 = PlanoTrabalho::factory()->create(['status' => StatusEnum::CONCLUIDO->value]);

        $chunks = 0;
        $planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
        $planoRepo->shouldReceive('findAllParaEnvio')
            ->once()
            ->andReturnUsing(function (int $chunkSize, callable $callback) use (&$chunks, $p1, $p2): void {
                $callback(collect([(object) ['id' => $p1->id]]));
                $chunks++;
                $callback(collect([(object) ['id' => $p2->id]]));
                $chunks++;
            });

        $planoRepo->shouldReceive('findById')->with($p1->id)->andReturn($p1->fresh(['usuario']));
        $planoRepo->shouldReceive('findById')->with($p2->id)->andReturn($p2->fresh(['usuario']));

        $service = new AgendarEnvioPlanosTrabalhosService($planoRepo);
        $service->executarAgendamentoNoTenant(tenant());

        expect($chunks)->toBe(2);
    });

    it('ignora ids cujo findById retorna null', function () {
        Bus::fake();

        $planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
        $planoRepo->shouldReceive('findAllParaEnvio')
            ->once()
            ->andReturnUsing(function (int $chunkSize, callable $callback): void {
                $callback(collect([(object) ['id' => 'id-inexistente']]));
            });

        $planoRepo->shouldReceive('findById')->with('id-inexistente')->andReturn(null);

        $service = new AgendarEnvioPlanosTrabalhosService($planoRepo);
        $service->executarAgendamentoNoTenant(tenant());

        Bus::assertNothingDispatched();
    });
});
