<?php

namespace Tests\IntegrationTenant\Services;

use App\Jobs\Envio\ExportarPlanoEntregaJob;
use App\Models\PlanoEntrega;
use App\Models\Programa;
use App\Models\Unidade;
use App\Repository\PlanoEntregaRepository;
use App\Services\Envio\AgendarEnvioPlanosEntregasService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Mockery;

afterEach(function () {
    Mockery::close();
});

describe('AgendarEnvioPlanosEntregasService', function () {
    beforeEach(function () {
        Log::spy();
    });

    /**
     * @return Mockery\MockInterface&PlanoEntrega
     */
    function planoEntregaValidoParaEnvio(string $id): Mockery\MockInterface
    {
        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->unidade = Mockery::mock(Unidade::class);

        $plano = Mockery::mock(PlanoEntrega::class);
        $plano->shouldReceive('getAttribute')->with('programa')->andReturn($programa);
        $plano->shouldReceive('getAttribute')->with('unidade')->andReturn(Mockery::mock(Unidade::class));
        $plano->shouldReceive('getAttribute')->with('id')->andReturn($id);
        $plano->shouldReceive('isEmStatusParaEnvio')->andReturnTrue();

        return $plano;
    }

    it('percorre os chunks, carrega planos e enfileira envio', function () {
        Queue::fake();

        $planoRepo = Mockery::mock(PlanoEntregaRepository::class);
        $planoRepo->shouldReceive('findAllParaEnvio')
            ->once()
            ->with(AgendarEnvioPlanosEntregasService::CHUNK_SIZE, Mockery::type('callable'))
            ->andReturnUsing(function (int $chunkSize, callable $callback): void {
                $callback(collect([(object) ['id' => 10], (object) ['id' => 20]]));
            });

        $p10 = planoEntregaValidoParaEnvio('10');
        $p20 = planoEntregaValidoParaEnvio('20');

        $planoRepo->shouldReceive('findById')->with('10')->andReturn($p10);
        $planoRepo->shouldReceive('findById')->with('20')->andReturn($p20);

        $service = new AgendarEnvioPlanosEntregasService($planoRepo);
        $service->executarAgendamentoNoTenant(tenant());

        Queue::assertPushed(ExportarPlanoEntregaJob::class, 2);
    });

    it('invoca o callback uma vez por chunk quando o repositório emite vários chunks', function () {
        Queue::fake();

        $planoRepo = Mockery::mock(PlanoEntregaRepository::class);
        $chunks = 0;
        $planoRepo->shouldReceive('findAllParaEnvio')
            ->once()
            ->andReturnUsing(function (int $chunkSize, callable $callback) use (&$chunks): void {
                $callback(collect([(object) ['id' => 1]]));
                $chunks++;
                $callback(collect([(object) ['id' => 2]]));
                $chunks++;
            });

        $p1 = planoEntregaValidoParaEnvio('1');
        $p2 = planoEntregaValidoParaEnvio('2');

        $planoRepo->shouldReceive('findById')->with('1')->andReturn($p1);
        $planoRepo->shouldReceive('findById')->with('2')->andReturn($p2);

        $service = new AgendarEnvioPlanosEntregasService($planoRepo);
        $service->executarAgendamentoNoTenant(tenant());

        expect($chunks)->toBe(2);
        Queue::assertPushed(ExportarPlanoEntregaJob::class, 2);
    });

    it('ignora ids cujo findById retorna null', function () {
        Queue::fake();

        $planoRepo = Mockery::mock(PlanoEntregaRepository::class);
        $planoRepo->shouldReceive('findAllParaEnvio')
            ->once()
            ->andReturnUsing(function (int $chunkSize, callable $callback): void {
                $callback(collect([(object) ['id' => 99]]));
            });

        $planoRepo->shouldReceive('findById')->with('99')->andReturn(null);

        $service = new AgendarEnvioPlanosEntregasService($planoRepo);
        $service->executarAgendamentoNoTenant(tenant());

        Queue::assertNothingPushed();
    });
});
