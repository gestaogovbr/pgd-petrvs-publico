<?php

namespace Tests\Unit\Services;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Models\Tenant;
use App\Models\Usuario;
use App\Repository\EnvioParticipanteRepository;
use App\Repository\UsuarioRepository;
use App\Services\Envio\AgendarEnvioParticipantesService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Mockery;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('AgendarEnvioParticipantesService', function () {
    beforeEach(function () {
        Log::spy();
    });

    it('percorre os chunks, carrega usuários e enfileira envio', function () {
        Queue::fake();

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findAllParaEnvio')
            ->once()
            ->with(AgendarEnvioParticipantesService::CHUNK_SIZE, Mockery::type('callable'))
            ->andReturnUsing(function (int $chunkSize, callable $callback): void {
                $callback(collect([(object) ['id' => 10], (object) ['id' => 20]]));
            });

        $usuario = Mockery::mock(Usuario::class);
        $usuario->shouldReceive('getAttribute')->with('id')->andReturn(99);

        $usuarioRepo->shouldReceive('findById')->with('10')->andReturn($usuario);
        $usuarioRepo->shouldReceive('findById')->with('20')->andReturn($usuario);

        $service = new AgendarEnvioParticipantesService($usuarioRepo);
        $service->executarAgendamentoNoTenant(tenant());

        Queue::assertPushed(ExportarParticipanteJob::class, 2);
    });

    it('invoca o callback uma vez por chunk quando o repositório emite vários chunks', function () {
        Queue::fake();

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $chunks = 0;
        $usuarioRepo->shouldReceive('findAllParaEnvio')
            ->once()
            ->andReturnUsing(function (int $chunkSize, callable $callback) use (&$chunks): void {
                $callback(collect([(object) ['id' => 1]]));
                $chunks++;
                $callback(collect([(object) ['id' => 2]]));
                $chunks++;
            });

        $usuario = Mockery::mock(Usuario::class);
        $usuario->shouldReceive('getAttribute')->with('id')->andReturn(1);

        $usuarioRepo->shouldReceive('findById')->with('1')->andReturn($usuario);
        $usuarioRepo->shouldReceive('findById')->with('2')->andReturn($usuario);

        $tenant =  tenant();

        $service = new AgendarEnvioParticipantesService($usuarioRepo);
        $service->executarAgendamentoNoTenant($tenant);

        expect($chunks)->toBe(2);
        Queue::assertPushed(ExportarParticipanteJob::class, 2);
    });
});
